import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogoIcon } from "./homePage/Icons";
import { Search } from "lucide-react";
import "./TopNavBar.css";
import "./ThemeToggle.css";

interface TopNavBarProps {
  selectedType: "Movie" | "TV Show";
  onTypeChange: (type: "Movie" | "TV Show") => void;
}

// Helper function to insert spaces between capital letters in genre labels.
const formatGenreLabel = (raw: string) => {
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
};

const TopNavBar: React.FC<TopNavBarProps> = ({ selectedType, onTypeChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const [genres, setGenres] = useState<string[]>([]);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const genreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide navbar on scroll (if needed)
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsHidden(currentY > lastScrollY && currentY > 60);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Fetch genres from the API
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

  // Debounce search query for search functionality.
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/SearchTitles?query=${encodeURIComponent(
            searchTerm
          )}`
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

  // Filter genres: For Movies, filter out any genre containing "tv"
  // For TV Shows, only include genres that contain "tv" (case-insensitive).
  const filteredGenres = genres.filter((genre) =>
    selectedType === "Movie"
      ? !genre.toLowerCase().includes("tv")
      : genre.toLowerCase().includes("tv")
  );

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
              if (genreTimeoutRef.current) clearTimeout(genreTimeoutRef.current);
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
                  if (genreTimeoutRef.current) clearTimeout(genreTimeoutRef.current);
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

          {/* Search */}
          <div className="nav-search-container">
            <button
              className="nav-search-icon"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              <Search size={24} color="gray" />
            </button>
            {showSearch && (
              <div className="nav-search-box">
                <input
                  type="text"
                  className="nav-search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchResults.length > 0 && (
                  <ul className="search-dropdown">
                    {searchResults.map((title) => (
                      <li key={title}>
                        <Link
                          to={`/movies/${encodeURIComponent(title)}`}
                          className="search-result"
                          onClick={() => setShowSearch(false)}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default TopNavBar;
