import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogoIcon } from "./homePage/Icons";
import "./TopNavBar.css";
import "./ThemeToggle.css";
import SearchBar from "./SearchBar";
import Logout from "./Logout";

interface TopNavBarProps {
  selectedType: "Movie" | "TV Show";
  onTypeChange: (_type: "Movie" | "TV Show") => void;
}

const TopNavBar: React.FC<TopNavBarProps> = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  // const [genres, setGenres] = useState<string[]>([]);
  // const [isGenreOpen, setIsGenreOpen] = useState(false);
  // const genreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);



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
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      console.log(searchResults);
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
                <div className="nav-button-group pretty-buttons">
          <Logout>
            <span className="logout">Log out</span>
          </Logout>
          <Link to="/movies" className="movieButton">
            Movies
          </Link>
        </div>


      <div className="nav-center">
        <div className="nav-search-container">
          <div className="nav-search-field">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-right-left">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};


export default TopNavBar;
