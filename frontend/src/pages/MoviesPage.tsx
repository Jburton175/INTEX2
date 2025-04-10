// src/pages/MoviesPage.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./MoviesPage.module.css";
import Header from "../components/TopNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import MovieCard, { Movie } from "../components/moviesPage/MovieCard";
import PageDetails from "./PageDetails";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";  // New search bar component

const PAGE_SIZE = 20;
const API_BASE =
  "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net";

// --- Utility: Build image URL from movie title ---
const getImageUrl = (title: string | undefined): string => {
  const safeTitle = (title && title.trim() ? title : "default-title")
    .replace(/['’:\-.!?–&()]/g, "");
  return `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(
    safeTitle
  )}.jpg`;
};

// --- API movie shape ---
interface MovieFromApi {
  show_id: string;
  title: string;
  duration: string;
  release_year: number;
  [key: string]: any;
}

// --- Mapping from genre key to route ---
// Modify these if needed
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

// --- Convert API movie into our Movie object ---
const GENRE_KEYS = Object.keys(API_ROUTES);
const convertToMovie = (data: MovieFromApi): Movie => {
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

// --- Helpers to extract query parameters from the URL ---
const getGenresFromQuery = (): string[] => {
  const params = new URLSearchParams(window.location.search);
  const genresParam = params.get("genres");
  return genresParam ? genresParam.split(",") : [];
};

const getSearchQueryFromURL = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || "";
};

const MoviesPage: React.FC = () => {
  // Use URL queries as initial state.
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() =>
    getGenresFromQuery()
  );
  const [searchQuery, setSearchQuery] = useState<string>(() => getSearchQueryFromURL());
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

  // --- Fetch movies ---  
  // When a search query is provided, include it in the query parameters for GetAllMovies.
  const fetchMovies = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        let url = "";
        if (searchQuery.trim() !== "") {
          // Use the search parameter; adjust this endpoint if needed.
          const genreParams = selectedGenres.length > 0 ? `&genres=${selectedGenres.join(",")}` : "";
          url = `${API_BASE}/INTEX/GetAllMovies?page=${page}&pageSize=${PAGE_SIZE}&search=${encodeURIComponent(
            searchQuery
          )}${genreParams}`;
        } else {
          // No search query: use genre filtering if exactly one genre is selected.
          if (selectedGenres.length === 1) {
            if (page === 1) {
              const genre = selectedGenres[0];
              url = `${API_BASE}${API_ROUTES[genre]}`;
            } else {
              setLoading(false);
              return;
            }
          } else {
            const genreParams = selectedGenres.length > 0 ? `&genres=${selectedGenres.join(",")}` : "";
            url = `${API_BASE}/INTEX/GetAllMovies?page=${page}&pageSize=${PAGE_SIZE}${genreParams}`;
          }
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        let moviesArray: MovieFromApi[] = Array.isArray(data)
          ? data
          : data?.movies || [];
        const newMovies = moviesArray.map(convertToMovie);

        if (selectedGenres.length === 1 && searchQuery.trim() === "") {
          // For a single genre filter (non-search mode), store the full list.
          setMovies(newMovies);
          setHasMore(newMovies.length > currentPage * PAGE_SIZE);
        } else {
          // Append new movies (deduplicated) when in "all movies" or search mode.
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
    [selectedGenres, searchQuery, currentPage]
  );

  // --- Infinite scroll setup ---
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

  // --- Reset movies and page when filters or search query changes ---
  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
  }, [selectedGenres, searchQuery]);

  // --- Fetch movies when currentPage changes ---
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  // --- Validate images and trigger replacement if needed ---
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

  // --- Replacement mechanism for broken images ---
  const handleImageError = useCallback(
    (failedMovieId: string) => {
      setReplacementQueue((prev) => [...prev, failedMovieId]);

      if (!replacementTimeout.current) {
        replacementTimeout.current = setTimeout(async () => {
          const idsToReplace = [...replacementQueue];
          setReplacementQueue([]);

          try {
            const res = await fetch(
              `${API_BASE}/INTEX/GetAllMovies?page=1&pageSize=${idsToReplace.length * 5}`
            );
            const data = await res.json();
            const candidates: MovieFromApi[] = Array.isArray(data)
              ? data
              : data?.movies || [];
            const replacements = candidates
              .map(convertToMovie)
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

  // --- Handler for when a movie card is clicked ---
  const handleCardClick = (movieId: string) => {
    setSelectedMovieId(movieId);
  };

  // --- Handler for processing search submissions via the SearchBar ---
  const handleSearch = (query: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (query.trim() !== "") {
      searchParams.set("search", query);
    } else {
      searchParams.delete("search");
    }
    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : "";
    window.history.replaceState(null, "", `${window.location.pathname}${queryStr}`);
    setSearchQuery(query);
    setMovies([]);
    setCurrentPage(1);
  };

  const displayedMovies = movies; // For both search and non-search modes

  return (
    <div className={styles.moviesPage}>
      <Header selectedType="Movie" onTypeChange={() => {}} />
      <CookieConsentBanner />
      {/* Render the search bar */}
      
      {/* Render GenreFilter with selected genres state */}
      <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <div className={styles.mainContent}>
        <h2 className={styles.pageTitle}></h2>
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




