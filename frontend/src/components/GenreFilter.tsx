// src/components/GenreFilter.tsx
import React from "react";
import styles from "./GenreFilter.module.css";
import { GENRE_KEYS, GENRE_LABELS } from "../types/genres";

interface GenreFilterProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenres,
  setSelectedGenres
}) => {
  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <aside className={styles.genreFilterSidebar}>
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
  );
};

export default GenreFilter;
