import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css"; // or import from a dedicated MovieCard module if preferred

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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.show_id}`);
  };

  return (
    <div className={styles.movieCard} onClick={handleClick}>
      <img
        className={styles.poster}
        src={movie.image}
        alt={movie.title}
        onError={() => onImageError(movie.show_id)}
      />
      <div className={styles.movieCardOverlay}>
        <p>{movie.title}</p>
      </div>
    </div>
  );
};

export default MovieCard;
