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
  const [debug, setDebug] = useState<string>("");

  useEffect(() => {
    if (recommendations) {
      if (recommendations.length === 0) {
        setDebug(
          "✅ API call succeeded, but no recommendations were returned."
        );
        console.log(debug);
      } else {
        setDebug(`✅ API returned ${recommendations.length} recommendations.`);
      }

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
    } else {
      setDebug("⚠️ No recommendations data yet.");
    }
  }, [recommendations]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error loading recommendations: {error}</p>;

  const isEmpty = Object.keys(groupedRecommendations).length === 0;

  return (
    <div className={styles.recommendationsWrapper}>
      {isEmpty ? (
        <div className={styles.emptyMessage}>
          <p>No grouped recommendations available.</p>
        </div>
      ) : (
        Object.entries(groupedRecommendations).map(([section, movies]) => (
          <div key={section} className={styles.sectionBlock}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.genreName}>{section}</span>
            </h3>
            <div className={styles.carouselContainer}>
              {movies.slice(0, 6).map((movie) => (
                <div key={movie.show_id} className={styles.movieSlide}>
                  <MovieCard
                    movie={{
                      id: movie.show_id,
                      show_id: movie.show_id,
                      title: movie.title,
                      image: `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(
                        (movie.title || "default-title").replace(
                          /['’:\-.!?–&()]/g,
                          ""
                        )
                      )}.jpg`,
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
        ))
      )}
    </div>
  );
};

export default UserRecommendations;
