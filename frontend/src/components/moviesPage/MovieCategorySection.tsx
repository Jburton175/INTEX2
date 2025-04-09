import React from "react";
import styles from "./MovieCategorySection.module.css";
import MovieCard from "./MovieCard"; // Adjust the import path as needed

interface Movie {
  id: string;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

interface MovieCategorySectionProps {
  title: string;
  movies: (Movie | null)[];
  type: string;
  onImageError: (movieId: string) => void;
}

const MovieCategorySection: React.FC<MovieCategorySectionProps> = ({
  title,
  movies,
  type,
  onImageError,
}) => {
  return (
    <div className={styles.categorySection}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <div className={styles.cardsContainer}>
        {movies.map((movie, index) =>
          movie ? (
            <MovieCard key={movie.id} movie={movie} onImageError={onImageError} />
          ) : (
            // Placeholder card for missing movies
            <div key={index} className={styles.cardPlaceholder}>
              <div className={styles.placeholder}>
                <div className={styles.spinner}></div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MovieCategorySection;
