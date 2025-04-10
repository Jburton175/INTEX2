import React, { useEffect, useState } from "react";
import styles from "./UserRecommendations.module.css";
import MovieCard from "../components/moviesPage/MovieCard";
import Slider from "react-slick"; // Make sure you have react-slick and slick-carousel installed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/intex/GetOneHomeRecommendation?user_id=1";

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
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.section]) {
            acc[item.section] = [];
          }
          acc[item.section].push(item);
          return acc;
        }, {} as { [section: string]: RecommendationItem[] });

        setGroupedRecommendations(grouped);
      } catch (error) {
        console.error("Failed to fetch user recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7, // ⬅️ Show up to 7
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  

  return (
    <div className={styles.recommendationsWrapper}>
      {Object.entries(groupedRecommendations).map(([section, movies]) => (
        <div key={section} className={styles.sectionBlock}>
          <h3 className={styles.sectionTitle}>
  Recommended for you in <span className={styles.genreName}>{section}</span>
</h3>

          <Slider {...sliderSettings}>
            {movies.map((movie) => (
              <div key={movie.show_id} className={styles.movieSlide}>
                <MovieCard
                  movie={{
                    id: movie.show_id,
                    show_id: movie.show_id,
                    title: movie.title,
                    image: `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(movie.title)}.jpg`,
                    duration: "",
                    rating: 4.0,
                    releaseDate: "",
                    genres: [],
                  }}
                  onImageError={() => {}}
                />
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default UserRecommendations;
