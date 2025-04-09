import React from "react";
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
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onImageError }) => {
  return (
    <a href={`/movie/${movie.show_id}`} className={styles.card}>
      <img
        src={movie.image}
        alt={movie.title}
        onError={() => onImageError(movie.show_id)}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.duration}>{movie.duration}</p>
      </div>
    </a>
  );
};

export default MovieCard;
