import React, { useState, useEffect } from "react";
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

const SECTION_SIZE = 7; // Number of cards per page

const MovieCategorySection: React.FC<MovieCategorySectionProps> = ({
  title,
  movies,
  type,
  onImageError,
}) => {
  // Carousel state: which page of SECTION_SIZE cards is visible.
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(movies.length / SECTION_SIZE);

  // Logging to help you debug arrow appearance.
  useEffect(() => {
    console.log(
      `[${title}] Movies length: ${movies.length} | SECTION_SIZE: ${SECTION_SIZE} | Total Pages: ${totalPages}`
    );
    console.log(`[${title}] Current Page: ${currentPage}`);
  }, [movies.length, currentPage, totalPages, title]);

  const canGoLeft = currentPage > 0;
  const canGoRight = currentPage < totalPages - 1;

  const handlePrev = () => {
    if (canGoLeft) {
      const newPage = currentPage - 1;
      console.log(`[${title}] Going left: Changing page from ${currentPage} to ${newPage}`);
      setCurrentPage(newPage);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      const newPage = currentPage + 1;
      console.log(`[${title}] Going right: Changing page from ${currentPage} to ${newPage}`);
      setCurrentPage(newPage);
    }
  };

  // Instead of rendering as a grid, we place all items in one flex container.
  // The container slides according to the current page.
  const startIndex = currentPage * SECTION_SIZE;
  // Note: We render the full list so that the container's width remains accurate.
  return (
    <div className={styles.categorySection}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <div className={styles.carouselContainer}>
        {canGoLeft && (
          <div className={styles.arrowLeft} onClick={handlePrev}>
            <span className={styles.arrowIcon}>‹</span>
          </div>
        )}
        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselInner}
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {movies.map((movie, index) => (
              <div
                key={movie ? movie.id : `placeholder-${index}`}
                className={styles.cardWrapper}
              >
                {movie ? (
                  <MovieCard movie={movie} onImageError={onImageError} />
                ) : (
                  <div className={styles.cardPlaceholder}>
                    {/* A placeholder with spinner if desired */}
                    <div className={styles.placeholder}>
                      <div className={styles.spinner}></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
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
