import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogoIcon } from "./homePage/Icons";
import { Search } from "lucide-react";
import "./TopNavBar.css";
import "./ThemeToggle.css";
import SearchBar from "./SearchBar";

interface TopNavBarProps {
  selectedType: "Movie" | "TV Show";
  onTypeChange: (_type: "Movie" | "TV Show") => void;
}

const formatGenreLabel = (raw: string) => {
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
};

const TopNavBar: React.FC<TopNavBarProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const genreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsHidden(currentY > lastScrollY && currentY > 60);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

      <div className="nav-right">
        <div className="nav-right-left">
          <div className="nav-search-container">
            <div className="nav-search-field">
              <Search
                size={20}
                color="gray"
                className="nav-search-icon-inside"
              />
              <SearchBar
                onSearch={function (query: string): void {
                  throw new Error("Function not implemented.");
                }}
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
