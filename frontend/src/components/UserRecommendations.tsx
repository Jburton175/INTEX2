import React, { useEffect, useState } from "react";
import styles from "./UserRecommendations.module.css";
import MovieCard from "../components/moviesPage/MovieCard";

const API_URL =
  "https://localhost:5000/INTEX/GetOneHomeRecommendation?user_id=1";

interface RecommendationItem {
  user_id: number;
  section: string;
  title: string;
  show_id: string;
}

const UserRecommendations: React.FC = () => {
  const [groupedRecommendations, setGroupedRecommendations] = useState<{
    [section: string]: RecommendationItem[];
  }>({});

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(API_URL);
        const data: RecommendationItem[] = await res.json();

        // Group by section
        const grouped = data.reduce(
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
      } catch (error) {
        console.error("Failed to fetch user recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className={styles.recommendationsWrapper}>
      {Object.entries(groupedRecommendations).map(([section, movies]) => (
        <div key={section} className={styles.sectionBlock}>
          <h3 className={styles.sectionTitle}>
            Recommended for you in{" "}
            <span className={styles.genreName}>{section}</span>
          </h3>
          <div className={styles.carouselContainer}>
            {movies.map((movie) => (
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
