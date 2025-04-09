import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  onImageError: (movieId: string) => void;
}

const ITEMS_PER_PAGE = 7; // How many movies to show per “page” in the carousel

const MovieCategorySection: React.FC<MovieCategorySectionProps> = ({
  title,
  movies,
  onImageError,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Filter out null placeholders if any
  const validMovies = movies.filter((m) => m !== null) as Movie[];
  const totalPages = Math.ceil(validMovies.length / ITEMS_PER_PAGE);

  // Bound currentPage so it never goes out of range
  const safeCurrentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

  // Calculate the slice of movies to display
  const startIndex = safeCurrentPage * ITEMS_PER_PAGE;
  const visibleMovies = validMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Check if we can go left or right
  const canGoLeft = safeCurrentPage > 0;
  const canGoRight = safeCurrentPage < totalPages - 1;

  const handlePrev = () => {
    if (canGoLeft) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.categorySection}>
      <h2 className={styles.categoryTitle}>{title}</h2>

      <div className={styles.carouselContainer}>
        {/* Left Arrow */}
        {canGoLeft && (
          <div className={styles.arrowLeft} onClick={handlePrev}>
            <span className={styles.arrowIcon}>‹</span>
          </div>
        )}

        <div className={styles.carouselViewport}>
          {/* A single row that slides horizontally based on currentPage */}
          <div
            className={styles.carouselInner}
            style={{
              // shift the entire row by currentPage “pages”
              transform: `translateX(-${safeCurrentPage * 100}%)`,
              transition: "transform 0.5s ease-in-out",
              display: "flex",
            }}
          >
            {validMovies.map((movie) => (
              <div key={movie.id} className={styles.cardWrapper}>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {canGoRight && (
          <div className={styles.arrowRight} onClick={handleNext}>
            <span className={styles.arrowIcon}>›</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCategorySection;
