import React from "react";
import styles from "./ShowCard.module.css";
import { Clock, Tv } from "lucide-react";

interface ShowCardProps {
  image: string;
  duration?: string;
  rating?: number;
  seasons?: string;
  type: "duration" | "rating";
}

const ShowCard: React.FC<ShowCardProps> = ({
  image,
  duration,
  rating,
  seasons,
  type,
}) => {
  return (
    <div className={styles.showCard}>
      <img src={image} alt="" className={styles.showImage} />
      <div className={styles.showDetails}>
        {type === "duration" && duration && (
          <div className={styles.durationBadge}>
            <Clock size={20} className={styles.clockIcon} />
            <span className={styles.durationText}>{duration}</span>
          </div>
        )}
        {seasons && (
          <div className={styles.seasonsBadge}>
            <Tv size={20} className={styles.tvIcon} />
            <span className={styles.seasonsText}>{seasons}</span>
          </div>
        )}
        {type === "rating" && rating !== undefined && (
          <div className={styles.ratingBadge}>
            <div className={styles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`${styles.star} ${
                    i < Math.floor(rating) ? styles.starFilled : ""
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={styles.ratingCount}>{`${rating}K`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
