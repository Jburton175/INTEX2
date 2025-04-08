import React from "react";
import styles from "./MovieCard.module.css";
import { Clock } from "lucide-react";

interface MovieCardProps {
  image: string;
  duration?: string;
  rating?: number;
  releaseDate?: string;
  type: "duration" | "release";
}

const MovieCard: React.FC<MovieCardProps> = ({
  image,
  duration,
  rating,
  releaseDate,
  type,
}) => {
  return (
    <div className={styles.movieCard}>
      <img src={image} alt="" className={styles.movieImage} />
      <div className={styles.movieDetails}>
        {type === "duration" && duration && (
          <div className={styles.durationBadge}>
            <Clock size={20} className={styles.clockIcon} />
            <span className={styles.durationText}>{duration}</span>
          </div>
        )}
        {type === "release" && releaseDate && (
          <div className={styles.releaseBadge}>
            <div className={styles.releaseLabel}>Released</div>
            <div className={styles.releaseDate}>{releaseDate}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
