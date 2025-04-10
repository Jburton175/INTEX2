// src/components/GenreFilter.tsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./GenreFilter.module.css";
import { GENRE_KEYS, GENRE_LABELS } from "../types/genres";
import SearchBar from "./SearchBar";

type GenreFilterProps = {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  onSearch: (query: string) => void; // Add this line
};

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenres,
  setSelectedGenres,
}) => {
  const [expanded, setExpanded] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When mouse enters the sidebar, cancel the auto-retract timer and expand
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setExpanded(true);
  };

  // When mouse leaves, schedule a collapse after 3 seconds
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 3000);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Toggle genre selection and then update the query parameter and reload the page.
  const toggleGenre = (genre: string) => {
    let updatedGenres: string[];
    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter((g) => g !== genre);
    } else {
      updatedGenres = [...selectedGenres, genre];
    }
    // Update the filter state (this could also be stored elsewhere if needed)
    setSelectedGenres(updatedGenres);

    // Build query parameters. If there are selected genres, join them by comma.
    const searchParams = new URLSearchParams(window.location.search);
    if (updatedGenres.length > 0) {
      searchParams.set("genres", updatedGenres.join(","));
    } else {
      searchParams.delete("genres");
    }

    // Reload the page with the updated query parameters.
    window.location.href = `${window.location.pathname}?${searchParams.toString()}`;
  };

  return (
    <>
      {/* When the sidebar is collapsed, show a tab so user can click to expand */}
      {!expanded && (
        <div className={styles.tab} onClick={() => setExpanded(true)}></div>
      )}
      <aside
        className={`${styles.genreFilterSidebar} ${!expanded ? styles.collapsed : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SearchBar
          onSearch={function (_query: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className={styles.genreList}>
          {GENRE_KEYS.map((key) => (
            <label key={key} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={key}
                checked={selectedGenres.includes(key)}
                onChange={() => toggleGenre(key)}
              />
              {GENRE_LABELS[key] || key}
            </label>
          ))}
        </div>
      </aside>
    </>
  );
};

export default GenreFilter;
