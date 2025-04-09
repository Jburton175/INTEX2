import React, { useState } from "react";
import styles from "./MovieCard.module.css";

interface Movie {
  id: string;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

interface MovieCardProps {
  movie: Movie;
  onImageError: (movieId: string) => void;
  onClick: () => void; // Add onClick prop
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onImageError, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.card} onClick={onClick}> {/* Make the whole card clickable */}
      {/* Show a placeholder with spinner until image loads */}
      {!loaded && (
        <div className={styles.placeholder}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <img
        src={movie.image}
        alt={movie.title}
        className={styles.image}
        onLoad={() => setLoaded(true)}
        onError={() => {
          onImageError(movie.id);
          setLoaded(true);
        }}
        style={{ display: loaded ? "block" : "none" }}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.duration}>{movie.duration}</p>
      </div>
    </div>
  );
};

export default MovieCard;
