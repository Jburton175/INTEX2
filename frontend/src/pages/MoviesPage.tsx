import React, { useEffect, useState } from "react";
import styles from "./MoviesPage.module.css";
import TopNavBar from "../components/TopNavBar";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
import { Clock } from "lucide-react";

interface MovieFromApi {
  show_id: string;
  title: string;
  duration_minutes_movies: number | null;
  release_year: number;
  rating: string;
  [key: string]: any;
}

interface Movie {
  id: number;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

const generateImageURL = (title: string) =>
  `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;

const convertToMovie = (data: MovieFromApi[], startId = 0): Movie[] => {
  return data.map((movie, idx) => {
    const durationMin = movie.duration_minutes_movies ?? 90;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    return {
      id: startId + idx,
      show_id: movie.show_id,
      title: movie.title,
      duration: `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`,
      rating: parseFloat(rating),
      image: generateImageURL(movie.title),
      releaseDate: `April ${movie.release_year}`,
    };
  });
};

const MoviesPage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [mustWatchMovies, setMustWatchMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<"movies" | "shows">("movies");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetAllMovies"
        );
        const data = await res.json();
        console.log("Raw movie response:", data);
  
        const movieArray = data.movies ?? []; // ✅ Access the actual array
        const movieOnly = movieArray.filter((m: any) => m.type === "Movie");
  
        const movies = convertToMovie(movieOnly, 0);
        setAllMovies(movies);
        setRecommendedMovies(movies.slice(0, 7));
        setMustWatchMovies(movies.slice(7, 11));
      } catch (err) {
        console.error("Error loading movies:", err);
      }
    };
  
    fetchMovies();
  }, []);
  
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 200;

      if (scrollPosition >= threshold) {
        const nextMovies = allMovies.slice(
          recommendedMovies.length,
          recommendedMovies.length + 7
        );
        setRecommendedMovies((prev) => [...prev, ...nextMovies]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allMovies, recommendedMovies]);

  return (
    <div className={styles.moviesPage}>
      <TopNavBar />

      <div className={styles.mainContent}>
        <div className={styles.heroSection}>
          <img
            src={`https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent("The Interview")}.jpg`}
            alt="Featured Movie"
            className={styles.heroImage}
          />
          <div className={styles.heroContent}></div>
        </div>

        <div className={styles.tabContainer}>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "movies" ? styles.activeTab : styles.inactiveTab
              }`}
              onClick={() => setActiveTab("movies")}
            >
              Movies
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "shows" ? styles.activeTab : styles.inactiveTab
              }`}
              onClick={() => setActiveTab("shows")}
            >
              Shows
            </button>
          </div>

          <div className={styles.categoriesContainer}>
            {activeTab === "movies" && (
              <>
                <MovieCategorySection
                  title="Recommended For You"
                  movies={recommendedMovies}
                  type="duration"
                />
                <div className={styles.categorySection}>
                  <div className={styles.categoryHeader}>
                    <h2 className={styles.categoryTitle}>Must - Watch Movies</h2>
                  </div>
                  <div className={styles.mustWatchGrid}>
                    {mustWatchMovies.map((movie) => (
                      <div key={movie.id} className={styles.mustWatchCard}>
                        <img
                          src={movie.image}
                          alt={movie.title}
                          className={styles.mustWatchImage}
                        />
                        <div className={styles.mustWatchDetails}>
                          <div className={styles.durationBadge}>
                            <Clock size={20} className={styles.clockIcon} />
                            <span>{movie.duration}</span>
                          </div>
                          <div className={styles.ratingBadge}>
                            <div className={styles.starRating}>
                              {[...Array(5)].map((_, i) => (
                                <img
                                  key={i}
                                  src={
                                    i < Math.floor(movie.rating)
                                      ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a87d05c6f465996e2e45e3cae25a746e0c10574e"
                                      : "https://cdn.builder.io/api/v1/image/assets/TEMP/925fae185bd3c66b21f3bd0c8f0bb3fa49efdaa9"
                                  }
                                  alt="Star"
                                  className={styles.starIcon}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {activeTab === "shows" && (
              <div className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>Shows Coming Soon!</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerDivider} />
          <div className={styles.footerContent}>
            <div className={styles.footerCopyright}>
              @2023 streamvib, All Rights Reserved
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerDividerVertical} />
              <div className={styles.footerLink}>Privacy Policy</div>
              <div className={styles.footerDividerVertical} />
              <div className={styles.footerLink}>Cookie Policy</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MoviesPage;
