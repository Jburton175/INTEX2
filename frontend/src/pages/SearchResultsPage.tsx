// src/pages/SearchResultsPage.tsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import Header from "../components/TopNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import MovieCard, { Movie } from "../components/moviesPage/MovieCard";

const API_BASE =
  "https://https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net:5000";

// ("https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net"); // Update to your localhost

interface ApiMovieResult {
  title: string;
  show_id: string;
}

const convertToMovie = (data: ApiMovieResult): Movie => ({
  id: data.show_id,
  show_id: data.show_id, // ✅ FIXED: set the correct show_id
  title: data.title,
  image: `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(data.title)}.jpg`,
  duration: "",
  rating: "4.0",
  releaseDate: "",
  genres: [],
});

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${API_BASE}/INTEX/SearchMovieTitles?query=${encodeURIComponent(query)}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiMovieResult[] = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setMovies(data.map(convertToMovie));
      } catch (err) {
        console.error("Search failed:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load search results"
        );
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchSearchResults();
    } else {
      setLoading(false);
      setMovies([]);
    }
  }, [query]);

  const handleImageError = (movieId: string) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const displayedMovies = movies; // For both search and non-search modes

  const handleCardClick = (movieId: string) => {
    setSelectedMovieId(movieId);
    console.log(selectedMovieId);
  };

  return (
    <div className={styles.moviesPage}>
      <Header selectedType="Movie" onTypeChange={() => {}} />
      <CookieConsentBanner />

      <div className={styles.mainContent}>
        <h2 className={styles.pageTitle}>
          {query ? `Search results for "${query}"` : "Search Movies"}
        </h2>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            Searching for "{query}"...
          </div>
        ) : error ? (
          <div className={styles.error}>Error: {error}</div>
        ) : movies.length === 0 ? (
          <div className={styles.emptyState}>
            No results found for "{query}"
          </div>
        ) : (
          <div className={styles.moviesGrid}>
            {displayedMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleCardClick(movie.id)}
                className={styles.movieCardWrapper}
              >
                <MovieCard movie={movie} onImageError={handleImageError} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
