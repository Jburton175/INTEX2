import React from "react";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  image: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ image }) => {
  return (
    <div className={styles.movieCard}>
      <img src={image} alt="Movie" className={styles.movieImage} />
    </div>
  );
};

export default MovieCard;
