import React from "react";
import styles from "./ShowCategorySection.module.css";
import ShowCard from "./ShowCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Show {
  id: number;
  title: string;
  image: string;
  duration?: string;
  rating?: number;
  seasons?: string;
}

interface ShowCategorySectionProps {
  title: string;
  shows: Show[];
  type: "duration" | "rating";
}

const ShowCategorySection: React.FC<ShowCategorySectionProps> = ({
  title,
  shows,
  type,
}) => {
  // State to track active indicator
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === 3 ? 3 : prev + 1));
  };

  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <h2 className={styles.categoryTitle}>{title}</h2>
        <div className={styles.navigationControls}>
          <button className={styles.navButton} onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
          <div className={styles.indicators}>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`${styles.indicator} ${
                  index === activeIndex ? styles.indicatorActive : ""
                }`}
              />
            ))}
          </div>
          <button className={styles.navButton} onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className={styles.showsGrid}>
        {shows.map((show) => (
          <ShowCard
            key={show.id}
            image={show.image}
            duration={show.duration}
            rating={show.rating}
            seasons={show.seasons}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowCategorySection;
