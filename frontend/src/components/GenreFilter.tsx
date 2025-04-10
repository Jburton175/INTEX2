import React, { useState, useRef, useEffect } from "react";
import styles from "./GenreFilter.module.css";
import { GENRE_KEYS, GENRE_LABELS } from "../types/genres";

type GenreFilterProps = {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenres,
  setSelectedGenres,
}) => {
  const [expanded, setExpanded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When the mouse enters, clear any timeout and show the sidebar.
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setExpanded(true);
  };

  // When the mouse leaves, collapse after 3 seconds.
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 3000);
  };

  // Clear the timeout when the component unmounts.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Toggle the genre selection then update the URL (so that the filter persists on reload)
  const toggleGenre = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);

    const searchParams = new URLSearchParams(window.location.search);
    if (updatedGenres.length > 0) {
      searchParams.set("genres", updatedGenres.join(","));
    } else {
      searchParams.delete("genres");
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
    window.location.href = `${window.location.pathname}${query}`;
  };

  // Handle the search tab click to toggle search bar visibility

  return (
    <div className={styles.container}>
      {/* When the sidebar is collapsed, show the tab */}
      {!expanded && (
        <div className={styles.tab} onClick={() => setExpanded(true)}>
          Filters
        </div>
      )}

      <aside
        className={`${styles.genreFilterSidebar} ${!expanded ? styles.collapsed : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
    </div>
  );
};

export default GenreFilter;
