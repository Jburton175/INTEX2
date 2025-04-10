// src/components/SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";

// Use the same API_BASE as in MoviesPage (change this if needed)
const API_BASE = "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net";

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = "", onSearch }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Handle form submission for search.
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("[SearchBar] Submitting search with query:", query);
    onSearch(query);
    setShowDropdown(false);
  };

  // Fetch suggestions when the query changes.
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const url = `${API_BASE}/INTEX/SearchMovieTitles?query=${encodeURIComponent(query.trim())}`;
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

    fetchSuggestions();
  }, [query]);

  // Hide dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // When a suggestion is clicked.
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    console.log("[SearchBar] Suggestion clicked:", suggestion);
    onSearch(suggestion);
    setShowDropdown(false);
  };

  return (
    <div className={styles.navSearchContainer}>
      <form className={styles.navSearchForm} onSubmit={handleSearchSubmit}>
        {/* Search icon – replace with your icon library if desired */}
        <span className={styles.navSearchIcon}>&#128269;</span>
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
