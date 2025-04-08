import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogoIcon } from "./homePage/Icons";
import { Search } from "lucide-react";
import "./TopNavBar.css";
import "./ThemeToggle.css";

const TopNavBar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
        const response = await fetch("https://localhost:5000/INTEX/GetGenres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreSelect = (genre: string) => {
    console.log("Selected genre:", genre);
  };

  return (
    <nav className={`top-navbar ${isHidden ? "hide" : ""}`}>
      <div className="nav-left">
        <Link to="/" className="brand-logo">
          <LogoIcon />
        </Link>
      </div>

      <button
        className="mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`nav-center ${isMobileOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li className="nav-search-container">
            <button
              className="nav-search-icon"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              <Search size={24} color="gray" />
            </button>
            {showSearch && (
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
          </li>

          <li
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
                    <button
                      className="genre-option"
                      onClick={() => handleGenreSelect(genre)}
                    >
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="nav-right">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default TopNavBar;
