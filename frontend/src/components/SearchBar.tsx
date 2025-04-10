// src/components/SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";

// If you maintain a global base URL constant, you can import it,
// otherwise define it here:
const API_BASE = "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net";

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = "", onSearch }) => {
  // Local state for input, suggestions, and whether to show the suggestions dropdown.
  const [query, setQuery] = useState<string>(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Handler for form submission (search button or ENTER)
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
    setShowDropdown(false);
  };

  // Fetch suggestions whenever the query changes.
  useEffect(() => {
    // If the query is empty, clear suggestions.
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    
    // Fetch the search suggestions using your backend endpoint.
    fetch(`${API_BASE}/INTEX/SearchTitles?query=${encodeURIComponent(query.trim())}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data: string[]) => {
        setSuggestions(data);
        setShowDropdown(data.length > 0);
      })
      .catch((err) => {
        console.error("Error fetching search suggestions:", err);
        setSuggestions([]);
        setShowDropdown(false);
      });
  }, [query]);

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When a suggestion is clicked.
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowDropdown(false);
  };

  return (
    <div className={styles.searchBarContainer}>
      <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
        {/* Search icon – you can use any icon or an SVG */}
        <span className={styles.searchIcon}>&#128269;</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
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
