import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

const API_BASE = "https://localhost:5000";



interface SearchBarProps {
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = "" }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Handle form submission when the user clicks the button or presses Enter.
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("[SearchBar] Submitting search with query:", query);
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    setShowDropdown(false);
  };

  // Fetch search suggestions with debouncing.
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }
      try {
        const url = `${API_BASE}/INTEX/SearchSuggestions?query=${encodeURIComponent(query.trim())}`;
        console.log("[SearchBar] Fetching suggestions from:", url);
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const data: string[] = await res.json();
        console.log("[SearchBar] Suggestions received:", data);
        setSuggestions(data);
        setShowDropdown(data.length > 0);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  // Hide suggestions dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When a suggestion is clicked, update the query and navigate.
  const handleSuggestionClick = (suggestion: string) => {
    console.log("[SearchBar] Suggestion clicked:", suggestion);
    setQuery(suggestion);
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
    setShowDropdown(false);
  };

  return (
    <div className={styles.navSearchContainer}>
      <form className={styles.navSearchForm} onSubmit={handleSearchSubmit}>
        {/* Search icon – you may replace this with an SVG or an icon library if desired */}

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className={styles.navSearchInput}
        />
        <button type="submit" className={styles.navSearchButton}>
            
          Search
        </button>
      </form>
      {showDropdown && (
        <ul className={styles.searchDropdown} ref={dropdownRef}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={styles.searchResult}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
