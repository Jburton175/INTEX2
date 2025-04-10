// MovieCategorySection.tsx
import React, { useRef, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import styles from "./MovieCategorySection.module.css";

interface Movie {
  id: string;
  show_id: string;
  title: string;
  image: string;
  duration: string;
  rating: number;
  releaseDate: string;
  genres: string[]; // Added genres field
}


interface MovieCategorySectionProps {
  title: string;
  movies: Movie[];
  onImageError: (movieId: string) => void;
  onLoadMore: () => Promise<void>;
  categoryKey: string;
}

const MovieCategorySection: React.FC<MovieCategorySectionProps> = ({
  title,
  movies,
  onImageError,
  onLoadMore,
  categoryKey,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoading) {
          setIsLoading(true);
          await onLoadMore();
          setIsLoading(false);
        }
      },
      { root: carouselRef.current, rootMargin: "100px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [isLoading, onLoadMore]);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -1000, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 1000, behavior: "smooth" });
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.carouselWrapper}>
        <button className={styles.carouselButton} onClick={scrollLeft}>
          &#9664;
        </button>
        <div className={styles.carousel} ref={carouselRef}>
          {movies.map((movie) => (
            <div key={`${categoryKey}-${movie.id}`} className={styles.movieCardWrapper}>
              <MovieCard movie={movie} onImageError={onImageError} />
            </div>
          ))}
          <div ref={sentinelRef} className={styles.sentinel} />
        </div>
        <button className={styles.carouselButton} onClick={scrollRight}>
          &#9654;
        </button>
      </div>
      {isLoading && <div className={styles.loadingText}>Loading more movies...</div>}
    </div>
  );
};

export default MovieCategorySection;