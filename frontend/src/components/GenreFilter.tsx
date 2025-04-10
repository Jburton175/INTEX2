// src/components/GenreFilter.tsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./GenreFilter.module.css";
import { GENRE_KEYS, GENRE_LABELS } from "../types/genres";

interface GenreFilterProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

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

  // Toggle genre selection, update the URL query parameters, and reload the page.
  const toggleGenre = (genre: string) => {
    let updatedGenres: string[];
    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter((g) => g !== genre);
    } else {
      updatedGenres = [...selectedGenres, genre];
    }

    // Update the filter state.
    setSelectedGenres(updatedGenres);

    // Build query parameters.
    const searchParams = new URLSearchParams(window.location.search);
    if (updatedGenres.length > 0) {
      searchParams.set("genres", updatedGenres.join(","));
    } else {
      searchParams.delete("genres");
    }

    // If there are any query parameters, prepend with '?'; otherwise, set query to empty.
    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";

    // Reload the page with the updated query parameters.
    window.location.href = `${window.location.pathname}${query}`;
  };

  return (
    <>
      {/* When the sidebar is collapsed, show a tab to allow the user to expand it */}
      {!expanded && (
        <div className={styles.tab} onClick={() => setExpanded(true)}>
          Genres
        </div>
      )}
      <aside
        className={`${styles.genreFilterSidebar} ${!expanded ? styles.collapsed : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h5 className={styles.sidebarTitle}>Genres</h5>
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
