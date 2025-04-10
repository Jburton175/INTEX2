import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css";

export interface Movie {
  id: string;
  show_id: string;
  title: string;
  image: string;
  duration: string;
  rating: number;
  releaseDate: string;
  genres: string[];
}

interface MovieCardProps {
  movie: Movie;
  onImageError: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onImageError }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
    onImageError(movie.show_id);
  };

  return (
    <div className={styles.movieCard} onClick={() => navigate(`/movie/${movie.show_id}`)}>
      {!imageError ? (
        <img
          className={styles.poster}
          src={movie.image}
          alt={movie.title}
          onError={handleError}
        />
      ) : (
        <div className={styles.imageFallback}>
          <span className={styles.fallbackTitle}>{movie.title}</span>
        </div>
      )}
      <div className={styles.movieCardOverlay}>
        <p className={styles.movieTitle}>{movie.title}</p>
      </div>
    </div>
  );
};

export default MovieCard;
