



// src/pages/MoviesPage.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./MoviesPage.module.css";
import Header from "../components/TopNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import MovieCard, { Movie } from "../components/moviesPage/MovieCard";
import PageDetails from "./PageDetails";
import GenreFilter from "../components/GenreFilter";

const PAGE_SIZE = 20;
const API_BASE = "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net";

// --- Utility: Build image URL from movie title ---
const getImageUrl = (title: string | undefined): string => {
  const safeTitle = (title && title.trim() ? title : "default-title")
    .replace(/['’:\-.!?–&()]/g, "");
  return `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(safeTitle)}.jpg`;
};

// --- API movie shape ---
interface MovieFromApi {
  show_id: string;
  title: string;
  duration: string;
  release_year: number;
  // Other properties (such as genre flags) are present.
  [key: string]: any;
}

// --- Mapping from genre key to route ---
// Modify these routes if necessary to match your API.
const API_ROUTES: { [key: string]: string } = {
  action: "/INTEX/GetActionMovies",
  adventure: "/INTEX/GetAdventureMovies",
  animeSeriesInternationalTVShows: "/INTEX/GetAnimeSeriesInternationalTVShows",
  britishTVShowsDocuseriesInternationalTVShows: "/INTEX/GetBritishTVShowsDocuseriesInternationalTVShows",
  children: "/INTEX/GetChildrenMovies",
  comedies: "/INTEX/GetComediesMovies",
  comediesDramasInternationalMovies: "/INTEX/GetComediesDramasInternationalMovies",
  comediesInternationalMovies: "/INTEX/GetComediesInternationalMovies",
  comediesRomanticMovies: "/INTEX/GetComediesRomanticMovies",
  crimeTVShowsDocuseries: "/INTEX/GetCrimeTVShowsDocuseries",
  documentaries: "/INTEX/GetDocumentariesMovies",
  dramas: "/INTEX/GetDramasMovies",
  familyMovies: "/INTEX/GetFamilyMovies",
  fantasy: "/INTEX/GetFantasyMovies",
  horrorMovies: "/INTEX/GetHorrorMovies",
  spirituality: "/INTEX/GetSpiritualityMovies",
  internationalMoviesThrillers: "/INTEX/GetInternationalMoviesThrillers",
  internationalTVShowsRomanticTVShowsTVDramas: "/INTEX/GetInternationalTVShowsRomanticTVShowsTVDramas",
  kidsTV: "/INTEX/GetKidsTV",
  languageTVShows: "/INTEX/GetLanguageTVShows",
  musicals: "/INTEX/GetMusicalsMovies",
  natureTV: "/INTEX/GetNatureTV",
  realityTV: "/INTEX/GetRealityTV",
  tvAction: "/INTEX/GetTVActionMovies",
  tvComedies: "/INTEX/GetTVComediesMovies",
  tvDramas: "/INTEX/GetTVDramasMovies",
  talkShowsTVComedies: "/INTEX/GetTalkShowsTVComedies",
  thrillers: "/INTEX/GetThrillersMovies",
};

// --- Convert API movie into our Movie object, extracting genres if available ---
const GENRE_KEYS = Object.keys(API_ROUTES); // use the keys from our mapping

const convertToMovie = (data: MovieFromApi): Movie => {
  // For the "all movies" endpoint, extract genres from flags:
  const movieGenres = GENRE_KEYS.filter((key) => data[key] && data[key] > 0);
  return {
    id: data.show_id,
    show_id: data.show_id,
    title: data.title,
    image: getImageUrl(data.title),
    duration: data.duration,
    rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
    releaseDate: `April ${data.release_year}`,
    genres: movieGenres,
  };
};

// --- Helper: Get selected genres from URL query (if any) ---
const getGenresFromQuery = (): string[] => {
  const params = new URLSearchParams(window.location.search);
  const genresParam = params.get("genres");
  return genresParam ? genresParam.split(",") : [];
};

const MoviesPage: React.FC = () => {
  // Avoid redeclaration by using the URL-provided genres as the initial state.
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => getGenresFromQuery());
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [replacementQueue, setReplacementQueue] = useState<string[]>([]);
  const replacementTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  // Sentinel for infinite scrolling.
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // --- Validate movie image (optional) ---
  const validateMovieImage = async (movie: Movie): Promise<boolean> => {
    try {
      const response = await fetch(movie.image, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error(`Error validating image for ${movie.title}:`, error);
      return false;
    }
  };

  // --- Fetch movies: if exactly one genre is selected, use its route (non-paginated)
  // Otherwise, use the "GetAllMovies" endpoint with pagination.
  const fetchMovies = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        let url = "";
        // If exactly one genre is selected, use the genre-specific API.
        if (selectedGenres.length === 1) {
          // For lazy loading in this mode, only fetch once (page 1).
          if (page === 1) {
            const genre = selectedGenres[0];
            url = `${API_BASE}${API_ROUTES[genre]}`;
          } else {
            // Do not re-fetch since we have all movies.
            setLoading(false);
            return;
          }
        } else {
          // If no filter (or multiple filters), use the AllMovies endpoint.
          // Optionally pass any filter query if your API supports it.
          const genreParams = selectedGenres.length > 0 ? `&genres=${selectedGenres.join(",")}` : "";
          url = `${API_BASE}/INTEX/GetAllMovies?page=${page}&pageSize=${PAGE_SIZE}${genreParams}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        let moviesArray: MovieFromApi[];
        if (selectedGenres.length === 1) {
          // Assume the genre-specific API returns an array.
          moviesArray = Array.isArray(data) ? data : data?.movies || [];
        } else {
          moviesArray = Array.isArray(data) ? data : data?.movies || [];
        }
        const newMovies = moviesArray.map(convertToMovie);

        if (selectedGenres.length === 1) {
          // In filtered mode, store the full list.
          setMovies(newMovies);
          // Determine if there are more items to show on the client.
          setHasMore(newMovies.length > currentPage * PAGE_SIZE);
        } else {
          // For all movies mode, append new movies while deduplicating.
          setMovies((prev) => {
            const combined = [...prev, ...newMovies];
            return Array.from(new Map(combined.map((m) => [m.id, m])).values());
          });
          setHasMore(moviesArray.length === PAGE_SIZE);
        }
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    },
    [selectedGenres, currentPage]
  );

  // --- Infinite scroll: if more movies exist, increment currentPage when the sentinel is visible.
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

  // --- When selectedGenres changes, reset movies and page.
  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
  }, [selectedGenres]);

  // --- Fetch movies when currentPage changes.
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  // --- Validate images and trigger replacement mechanism if needed.
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
  }, [movies]);

  // --- Replacement mechanism for broken images.
  const handleImageError = useCallback(
    (failedMovieId: string) => {
      setReplacementQueue((prev) => [...prev, failedMovieId]);

      if (!replacementTimeout.current) {
        replacementTimeout.current = setTimeout(async () => {
          const idsToReplace = [...replacementQueue];
          setReplacementQueue([]);

          try {
            // Fetch a larger batch from page 1 as replacement candidates.
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
    },
    [replacementQueue, movies]
  );

  // --- If exactly one genre is selected, use client-side slicing for lazy display.
  const displayedMovies =
    selectedGenres.length === 1 ? movies.slice(0, currentPage * PAGE_SIZE) : movies;

  // --- When a movie card is clicked, open the PageDetails modal.
  const handleCardClick = (movieId: string) => {
    setSelectedMovieId(movieId);
  };

  return (
    <div className={styles.moviesPage}>
      <Header selectedType="Movie" onTypeChange={() => {}} />
      <CookieConsentBanner />
      {/* Render GenreFilter and pass the selected state */}
      <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <div className={styles.mainContent}>
        <h2 className={styles.pageTitle}>All Movies</h2>
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
        <PageDetails showId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
      )}
    </div>
  );
};

export default MoviesPage;



