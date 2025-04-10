import React, { useState } from "react";
import styles from "./MovieCategorySection.module.css";
import MovieCard from "./MovieCard";

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
  type: string; // for any custom logic or styling
  onImageError: (movieId: string) => void;
  onMovieClick: (show_id: string) => void;
}

const ITEMS_PER_PAGE = 7;

const MovieCategorySection: React.FC<MovieCategorySectionProps> = ({
  title,
  movies,
  type,
  onImageError,
  onMovieClick,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Filter out null movies
  const validMovies = movies.filter((m) => m !== null) as Movie[];
  const totalPages = Math.ceil(validMovies.length / ITEMS_PER_PAGE);

  // Compute the slice of movies to display on the current page
  const visibleMovies = validMovies.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.categorySection}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <div className={styles.carouselContainer}>
        {/* Left Arrow */}
        {currentPage > 0 && (
          <button onClick={handlePrev} className={styles.arrowLeft}>
            ‹
          </button>
        )}

        <div className={styles.carouselViewport}>
          <div className={styles.carouselInner}>
            {visibleMovies.map((movie, index) => (
              <div key={movie.id} className={styles.cardWrapper}>
                {/* Wrap the MovieCard in a clickable container */}
                <div
                  onClick={() => onMovieClick(movie.show_id)}
                  className={styles.cardContainer}
                >
                  <MovieCard movie={movie} onImageError={onImageError} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {currentPage < totalPages - 1 && (
          <button onClick={handleNext} className={styles.arrowRight}>
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCategorySection;
