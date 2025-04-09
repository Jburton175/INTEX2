import React, { useState, useEffect } from "react";
import styles from "./MovieCategorySection.module.css";
import MovieCard from "./MovieCard"; // Ensure import is correct

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
  onMovieClick: (movieId: string) => void; // Add this prop for movie click handling
}

const BASE_SECTION_SIZE = 14; // Initial section size
const MovieCategorySection: React.FC<MovieCategorySectionProps> = ({
  title,
  movies,
  type,
  onImageError,
  onMovieClick,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sectionSize, setSectionSize] = useState(BASE_SECTION_SIZE); // Dynamic section size

  // Pad the movies array so it fits the current section size
  const paddedMovies =
    movies.length % sectionSize === 0
      ? movies
      : [
          ...movies,
          ...Array(sectionSize - (movies.length % sectionSize)).fill(null),
        ];

  const totalPages = Math.ceil(paddedMovies.length / sectionSize);

  useEffect(() => {
    console.log(
      `[${title}] Movies length: ${movies.length} (padded to ${paddedMovies.length}) | SECTION_SIZE: ${sectionSize} | Total Pages: ${totalPages}`
    );
    console.log(`[${title}] Current Page: ${currentPage}`);
  }, [movies.length, paddedMovies.length, currentPage, totalPages, title, sectionSize]);

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
      // Increase the section size by 7 when the user clicks next
      setSectionSize(prevSize => prevSize + 7);
    }
  };

  const startIndex = currentPage * sectionSize;
  const visibleMovies = paddedMovies.slice(startIndex, startIndex + sectionSize);

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
            {visibleMovies.map((movie, index) => (
              <div key={movie ? movie.id : `placeholder-${index}`} className={styles.cardWrapper}>
                {movie ? (
                  <MovieCard
                    movie={movie}
                    onImageError={onImageError}
                    onClick={() => onMovieClick(movie.id)} // Make sure to pass onClick here
                  />
                ) : (
                  <div className={styles.cardPlaceholder}>
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
