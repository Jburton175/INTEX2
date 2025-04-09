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

  // Pad the movies array so that its length is a multiple of SECTION_SIZE.
  const paddedMovies =
    movies.length % SECTION_SIZE === 0
      ? movies
      : [
          ...movies,
          ...Array(SECTION_SIZE - (movies.length % SECTION_SIZE)).fill(null),
        ];

  const totalPages = Math.ceil(paddedMovies.length / SECTION_SIZE);

  // Debug logging.
  useEffect(() => {
    console.log(
      `[${title}] Movies length: ${movies.length} (padded to ${paddedMovies.length}) | SECTION_SIZE: ${SECTION_SIZE} | Total Pages: ${totalPages}`
    );
    console.log(`[${title}] Current Page: ${currentPage}`);
  }, [movies.length, paddedMovies.length, currentPage, totalPages, title]);

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

  // Calculate the visible items based on currentPage.
  const startIndex = currentPage * SECTION_SIZE;
  const visibleMovies = paddedMovies.slice(startIndex, startIndex + SECTION_SIZE);

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
            {paddedMovies.map((movie, index) => (
              <div key={movie ? movie.id : `placeholder-${index}`} className={styles.cardWrapper}>
                {movie ? (
                  <MovieCard movie={movie} onImageError={onImageError} />
                ) : (
                  <div className={styles.cardPlaceholder}>
                    {/* Render an empty placeholder */}
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
