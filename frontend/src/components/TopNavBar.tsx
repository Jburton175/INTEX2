import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogoIcon } from "./homePage/Icons";
import { Search } from "lucide-react";
import "./TopNavBar.css";
import "./ThemeToggle.css";

interface TopNavBarProps {
  selectedType: "Movie" | "TV Show";
  onTypeChange: (_type: "Movie" | "TV Show") => void;
}

// Helper: Insert spaces between capital letters for genre labels.
const formatGenreLabel = (raw: string) => {
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
};

const TopNavBar: React.FC<TopNavBarProps> = ({
  selectedType,
  onTypeChange,
}) => {
  // State for scroll behavior.
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // State for search functionality.
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // State for genres.
  const [genres, setGenres] = useState<string[]>([]);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const genreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide navbar on scroll.
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsHidden(currentY > lastScrollY && currentY > 60);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Fetch genres on component mount.
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetGenres"
        );
        if (!response.ok) throw new Error("Failed to fetch genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenres(["Action", "Comedy", "Drama"]);
      }
    };
    fetchGenres();
  }, []);

  // Debounce search query and call the backend SearchTitles endpoint.
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/SearchTitles?query=${encodeURIComponent(searchTerm)}`
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <nav className={`top-navbar ${isHidden ? "hide" : ""}`}>
      <div className="nav-left">
        <Link to="/" className="brand-logo">
          <LogoIcon />
        </Link>
      </div>

      <div className="nav-center">
        <button
          className={`type-toggle ${selectedType === "Movie" ? "active" : ""}`}
          onClick={() => onTypeChange("Movie")}
        >
          Movies
        </button>
        <button
          className={`type-toggle ${selectedType === "TV Show" ? "active" : ""}`}
          onClick={() => onTypeChange("TV Show")}
        >
          TV Shows
        </button>
      </div>

      <div className="nav-right">
        <div className="nav-right-left">
          {/* Genre Dropdown */}
          <div
            className="nav-genre-dropdown-container"
            onMouseEnter={() => {
              if (genreTimeoutRef.current)
                clearTimeout(genreTimeoutRef.current);
              setIsGenreOpen(true);
            }}
            onMouseLeave={() => {
              genreTimeoutRef.current = setTimeout(() => {
                setIsGenreOpen(false);
              }, 600);
            }}
          >
            <button className="nav-genre-button">Genres</button>
            {isGenreOpen && (
              <ul
                className="nav-genre-dropdown"
                onMouseEnter={() => {
                  if (genreTimeoutRef.current)
                    clearTimeout(genreTimeoutRef.current);
                  setIsGenreOpen(true);
                }}
                onMouseLeave={() => {
                  genreTimeoutRef.current = setTimeout(() => {
                    setIsGenreOpen(false);
                  }, 600);
                }}
              >
                {genres.map((genre) => (
                  <li key={genre}>
                    <button className="genre-option">
                      {formatGenreLabel(genre)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Always Expanded Search Bar */}
          <div className="nav-search-container">
            <div className="nav-search-field">
              <Search
                size={20}
                color="gray"
                className="nav-search-icon-inside"
              />
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchResults.length > 0 && (
              <ul className="search-dropdown">
                {searchResults.map((title) => (
                  <li key={title}>
                    <Link
                      to={`/movies/${encodeURIComponent(title)}`}
                      className="search-result"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default TopNavBar;
