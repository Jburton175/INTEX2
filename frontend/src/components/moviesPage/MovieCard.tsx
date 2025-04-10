// src/components/MovieCard.tsx
import React from "react";
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
  genres: string[]; // Added genres field
}


interface MovieCardProps {
  movie: Movie;
  onImageError: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onImageError }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={styles.movieCard} 
      onClick={() => navigate(`/movie/${movie.show_id}`)}
    >
      <img
        className={styles.poster}
        src={movie.image}
        alt={movie.title}
        onError={() => onImageError(movie.show_id)}
      />
      <div className={styles.movieCardOverlay}>
        <p className={styles.movieTitle}>{movie.title}</p>
      </div>
    </div>
  );
};

export default MovieCard;