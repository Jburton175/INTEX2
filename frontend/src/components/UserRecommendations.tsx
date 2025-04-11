import React, { useEffect, useState } from "react";
import styles from "./UserRecommendations.module.css";
import MovieCard from "../components/moviesPage/MovieCard";
import { useRecommendations } from "../api/API";

interface RecommendationItem {
  user_id: number;
  section: string;
  title: string;
  show_id: string;
}

const UserRecommendations: React.FC = () => {
  const { recommendations, loading, error } = useRecommendations();
  const [groupedRecommendations, setGroupedRecommendations] = useState<{
    [section: string]: RecommendationItem[];
  }>({});

  useEffect(() => {
    if (recommendations) {
      const grouped = recommendations.reduce(
        (acc, item) => {
          if (!acc[item.section]) {
            acc[item.section] = [];
          }
          acc[item.section].push(item);
          return acc;
        },
        {} as { [section: string]: RecommendationItem[] }
      );
      setGroupedRecommendations(grouped);
    }
  }, [recommendations]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error loading recommendations: {error}</p>;

  return (
    <div className={styles.recommendationsWrapper}>
      {Object.entries(groupedRecommendations).map(([section, movies]) => (
        <div key={section} className={styles.sectionBlock}>
          <h3 className={styles.sectionTitle}>
            Recommended for you in{" "}
            <span className={styles.genreName}>{section}</span>
          </h3>
          <div className={styles.carouselContainer}>
            {movies.slice(0, 5).map((movie) => (
              <div key={movie.show_id} className={styles.movieSlide}>
                <MovieCard
                  movie={{
                    id: movie.show_id,
                    show_id: movie.show_id,
                    title: movie.title,
                    image: `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(movie.title)}.jpg`,
                    duration: "",
                    rating: "4.0",
                    releaseDate: "",
                    genres: [],
                  }}
                  onImageError={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserRecommendations;
