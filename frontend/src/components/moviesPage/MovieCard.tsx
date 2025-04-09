import React from "react";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  image: string;
  title: string;
  onImageError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, onImageError }) => {
  return (
    <div className={styles.movieCard}>
      <img
        src={image}
        alt={title}
        className={styles.movieImage}
        onError={onImageError}
      />
      <div className={styles.overlay}>
        <p className={styles.movieTitle}>{title}</p>
      </div>
    </div>
  );
};

export default MovieCard;
