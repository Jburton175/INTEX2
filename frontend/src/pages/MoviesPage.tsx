// src/pages/MoviesPage.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./MoviesPage.module.css";
import Header from "../components/TopNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import MovieCard, { Movie } from "../components/moviesPage/MovieCard";
import PageDetails from "./PageDetails";
import GenreFilter from "../components/GenreFilter";  // Import your genre filter

const PAGE_SIZE = 20;
const API_BASE =
  "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net";

// Function to safely build an image URL from movie title.
const getImageUrl = (title: string | undefined): string => {
  const safeTitle = (title && title.trim() ? title : "default-title")
    .replace(/['’:\-.!?–&()]/g, "");
  return `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(
    safeTitle
  )}.jpg`;
};

// Define API movie shape.
interface MovieFromApi {
  show_id: string;
  title: string;
  duration: string;
  release_year: number;
  // Other properties including genre flags...
  [key: string]: any;
}

// List of keys that represent genres.
const GENRE_KEYS = [
  "action",
  "adventure",
  "animeSeriesInternationalTVShows",
  "britishTVShowsDocuseriesInternationalTVShows",
  "children",
  "comedies",
  "comediesDramasInternationalMovies",
  "comediesInternationalMovies",
  "comediesRomanticMovies",
  "crimeTVShowsDocuseries",
  "documentaries",
  "documentariesInternationalMovies",
  "docuseries",
  "dramas",
  "dramasInternationalMovies",
  "dramasRomanticMovies",
  "familyMovies",
  "fantasy",
  "horrorMovies",
  "internationalMoviesThrillers",
  "internationalTVShowsRomanticTVShowsTVDramas",
  "kidsTV",
  "languageTVShows",
  "musicals",
  "natureTV",
  "realityTV",
  "spirituality",
  "tvAction",
  "tvComedies",
  "tvDramas",
  "talkShowsTVComedies",
  "thrillers"
];

// Convert API movie into our Movie object, extracting genres.
const convertToMovie = (data: MovieFromApi): Movie => {
  // Filter out genre keys where the value is truthy and greater than 0.
  const movieGenres = GENRE_KEYS.filter((key) => data[key] && data[key] > 0);

  return {
    id: data.show_id,
    show_id: data.show_id,
    title: data.title,
    image: getImageUrl(data.title),
    duration: data.duration,
    rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
    releaseDate: `April ${data.release_year}`,
    genres: movieGenres
  };
};

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [replacementQueue, setReplacementQueue] = useState<string[]>([]);
  const replacementTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  // Added state for genres.
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Sentinel for infinite scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Validate an image URL by sending a HEAD request.
  const validateMovieImage = async (movie: Movie): Promise<boolean> => {
    try {
      const response = await fetch(movie.image, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error(`Error validating image for ${movie.title}:`, error);
      return false;
    }
  };

  // Fetch movies from the API and add them to our state.
  const fetchMovies = useCallback(async (page: number) => {
    try {
      setLoading(true);
      // Option 1: If your backend supports filtering by genres, add a query parameter:
      const genreParams = selectedGenres.length > 0 ? `&genres=${selectedGenres.join(",")}` : "";
      
      const res = await fetch(
        `${API_BASE}/INTEX/GetAllMovies?page=${page}&pageSize=${PAGE_SIZE}${genreParams}`
      );
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      const moviesArray: MovieFromApi[] = Array.isArray(data)
        ? data
        : data?.movies || [];
      const newMovies = moviesArray.map(convertToMovie);

      // Append new movies and deduplicate by movie ID.
      setMovies((prev) => {
        const combined = [...prev, ...newMovies];
        return Array.from(new Map(combined.map((m) => [m.id, m])).values());
      });
      setHasMore(moviesArray.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedGenres]);

  // Infinite scroll setup.
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { rootMargin: "500px" }
    );
    observer.current.observe(sentinelRef.current);
    return () => observer.current?.disconnect();
  }, [loading, hasMore]);

  // Fetch movies whenever currentPage or selectedGenres changes.
  useEffect(() => {
    // Reset page and movies if the filter changes (if you want to perform server filtering).
    setMovies([]);
    setCurrentPage(1);
  }, [selectedGenres]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  // Image replacement mechanism.
  const handleImageError = useCallback((failedMovieId: string) => {
    setReplacementQueue((prev) => [...prev, failedMovieId]);

    if (!replacementTimeout.current) {
      replacementTimeout.current = setTimeout(async () => {
        const idsToReplace = [...replacementQueue];
        setReplacementQueue([]);

        try {
          // Fetch a larger batch from page 1 as potential replacement candidates.
          const res = await fetch(
            `${API_BASE}/INTEX/GetAllMovies?page=1&pageSize=${idsToReplace.length * 5}`
          );
          const data = await res.json();
          const candidates: MovieFromApi[] = Array.isArray(data)
            ? data
            : data?.movies || [];
          const replacements = candidates
            .map(convertToMovie)
            // Exclude movies already in our list.
            .filter((m) => !movies.some((existing) => existing.id === m.id))
            .slice(0, idsToReplace.length);

          setMovies((prev) => {
            const filtered = prev.filter((m) => !idsToReplace.includes(m.id));
            return [...filtered, ...replacements];
          });
        } catch (error) {
          console.error("Error fetching replacements:", error);
        }
        replacementTimeout.current = null;
      }, 2000);
    }
  }, [replacementQueue, movies]);

  // Validate images of all movies (and trigger replacements if needed).
  useEffect(() => {
    const validateAllMovies = async () => {
      const results = await Promise.all(
        movies.map(async (movie) => {
          const valid = await validateMovieImage(movie);
          return { id: movie.id, valid };
        })
      );
      const failedIds = results.filter((r) => !r.valid).map((r) => r.id);
      failedIds.forEach((id) => handleImageError(id));
    };
    if (movies.length > 0) {
      validateAllMovies();
    }
  }, [movies, handleImageError]);

  // Option 2 (client-side filtering):  
  // If your API does not support genre filtering, you can filter the movies here.
  const filteredMovies = selectedGenres.length > 0
    ? movies.filter(movie => movie.genres && selectedGenres.every(g => movie.genres.includes(g)))
    : movies;

  // When a movie card is clicked, show the PageDetails modal.
  const handleCardClick = (movieId: string) => {
    setSelectedMovieId(movieId);
  };

  return (
    <div className={styles.moviesPage}>
      <Header selectedType="Movie" onTypeChange={() => {}} />
      <CookieConsentBanner />

      <div className={styles.mainContent}>
        <h2 className={styles.pageTitle}>All Movies</h2>
        
        {/* Render the GenreFilter */}
        <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />

        {/* Display filtered movies */}
        <div className={styles.moviesGrid}>
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleCardClick(movie.id)}
              className={styles.movieCardWrapper}
            >
              <MovieCard movie={movie} onImageError={handleImageError} />
            </div>
          ))}
        </div>
        <div ref={sentinelRef} className={styles.sentinel} />
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            Loading more movies...
          </div>
        )}
      </div>
      <Footer />
      {selectedMovieId && (
        <PageDetails
          showId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default MoviesPage;
