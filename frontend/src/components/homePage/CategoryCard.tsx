import React from "react";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  name: string;
  images: string[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, images }) => {
  return (
    <article className={styles.categoryCard}>
      <div className={styles.imageContainer}>
        <div className={styles.imageRow}>
          <img src={images[0]} alt="" className={styles.categoryImage} />
          <img src={images[1]} alt="" className={styles.categoryImage} />
        </div>
        <div className={styles.imageRow}>
          <img src={images[2]} alt="" className={styles.categoryImage} />
          <img src={images[3]} alt="" className={styles.categoryImage} />
        </div>
        <div className={styles.gradient} />
        <h3 className={styles.categoryName}>{name}</h3>
      </div>
    </article>
  );
};

export default CategoryCard;
    
