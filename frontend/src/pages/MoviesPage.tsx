import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./MoviesPage.module.css";
import Header from "../components/TopNavBar";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";

// --- Interfaces ---
interface MovieFromApi {
  show_id: string;
  title: string;
  duration_minutes_movies: number | null;
  duration_in_seasons?: number | null;
  release_year: number;
  rating: string;
  type?: string;
  [key: string]: any;
}

export interface Movie {
  id: string;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

// --- Constants ---
const PAGE_SIZE = 20;    // for data loading/infinite scroll
const SECTION_SIZE = 7;  // each section must display 7 movies per carousel page

const MOVIES_CACHE_KEY = "cachedMovies";

// --- Helper Functions ---
// Generate the image URL from the movie title.
const generateImageURL = (title: string) =>
  `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;

// Convert API movie data to our Movie interface.
const convertToMovie = (data: MovieFromApi[]): Movie[] => {
  return data.map((movie) => {
    const durationMin = movie.duration_minutes_movies ?? 90;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    return {
      id: movie.show_id,
      show_id: movie.show_id,
      title: movie.title,
      duration: `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`,
      rating: parseFloat(rating),
      image: generateImageURL(movie.title),
      releaseDate: `April ${movie.release_year}`,
    };
  });
};

// Format genre labels by inserting spaces.
const formatGenreLabel = (raw: string): string =>
  raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

// Optionally, pad an array (if needed for other UI adjustments)
function padArray<T>(arr: T[], targetLength: number): (T | null)[] {
  const padded = [...arr];
  while (padded.length < targetLength) {
    padded.push(null);
  }
  return padded;
}

// --- MoviesPage Component ---
const MoviesPage: React.FC = () => {
  // State declarations
  const [allMovies, setAllMovies] = useState<MovieFromApi[]>([]);
  const [selectedType, setSelectedType] = useState<"Movie" | "TV Show">("Movie");
  const [recommended, setRecommended] = useState<(Movie | null)[]>([]);
  const [newReleases, setNewReleases] = useState<(Movie | null)[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, (Movie | null)[]>>({});
  const [pageNum, setPageNum] = useState(1);
  const [totalNumMovies, setTotalNumMovies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);
  const [erroredMovieIds, setErroredMovieIds] = useState<Set<string>>(new Set());
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Featured movie for hero section (displayed only for Movies)
  const featuredMovie = {
    title: "The Interview",
    description:
      "A satirical look at international relations featuring a controversial interview that turns unexpectedly.",
    image: generateImageURL("The Interview"),
  };

  // On mount, load cached movies (if any) from localStorage.
  useEffect(() => {
    const cachedData = localStorage.getItem(MOVIES_CACHE_KEY);
    if (cachedData) {
      try {
        const parsedCache = JSON.parse(cachedData);
        if (parsedCache && Array.isArray(parsedCache.allMovies)) {
          setAllMovies(parsedCache.allMovies);
          setTotalNumMovies(parsedCache.totalNumMovies || 0);
          console.log("Loaded movies from cache", parsedCache.allMovies);
        }
      } catch (err) {
        console.error("Error parsing cached movies:", err);
      }
    }
  }, []);

  // When allMovies state changes, update the localStorage cache.
  useEffect(() => {
    localStorage.setItem(
      MOVIES_CACHE_KEY,
      JSON.stringify({ allMovies, totalNumMovies })
    );
  }, [allMovies, totalNumMovies]);

  // --- Data Loading ---
  // Fetch genres from API on mount.
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const resGenres = await fetch(
          "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetGenres"
        );
        const genresData: string[] = await resGenres.json();
        setGenres(genresData);
        console.log("Fetched genres:", genresData);
      } catch (err) {
        console.error("Failed to load genres:", err);
      }
    };
    fetchGenres();
  }, []);

  // Load movies from API for a given page.
  const loadMovies = async (page: number) => {
    setLoading(true);
    try {
      const moviesUrl = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetAllMovies?pageSize=${PAGE_SIZE}&pageNum=${page}`;
      const resMovies = await fetch(moviesUrl);
      const dataMovies = await resMovies.json();
      const newMovies: MovieFromApi[] = dataMovies.movies ?? [];
      setTotalNumMovies(dataMovies.totalNumMovies);
      // Combine previously loaded movies with new ones; deduplicate based on show_id.
      setAllMovies(prev => {
        const combined = [...prev, ...newMovies];
        const unique = Array.from(new Map(combined.map(movie => [movie.show_id, movie])).values());
        return unique;
      });
      console.log(`Loaded page ${page}:`, newMovies.map(movie => movie.title));
    } catch (err) {
      console.error("Failed to load movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load pages when pageNum increases.
  useEffect(() => {
    loadMovies(pageNum);
  }, [pageNum]);

  // Infinite scroll: Increase pageNum when sentinel is visible.
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && !loading && allMovies.length < totalNumMovies) {
        setPageNum(prev => prev + 1);
      }
    });
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [loading, allMovies, totalNumMovies]);

  // When selectedType changes, reset movies state.
  useEffect(() => {
    setAllMovies([]);
    setPageNum(1);
    setTotalNumMovies(0);
    setRecommended([]);
    setNewReleases([]);
    setGenreMovies({});
  }, [selectedType]);

  // --- Section Calculations ---
  // Get movies for the selected type.
  const moviesForType = allMovies.filter(m => {
    if (selectedType === "Movie") {
      return m.type === "Movie" && !erroredMovieIds.has(m.show_id);
    } else {
      return m.type && m.type.toLowerCase().includes("tv") && !erroredMovieIds.has(m.show_id);
    }
  });

  // Updated Recommended Section (pass full array so that multiple pages are rendered if available)
  useEffect(() => {
    if (moviesForType.length > 0) {
      const recsFull = convertToMovie(moviesForType);
      if (recsFull.length === 0 && moviesForType.length < totalNumMovies) return;
      setRecommended(recsFull);
      console.log("Recommended:", recsFull.map(m => (m ? m.title : "placeholder")));
    }
  }, [moviesForType, erroredMovieIds, totalNumMovies]);

  // Updated New Releases Section (pass full array so that multiple pages are rendered if available)
  useEffect(() => {
    if (moviesForType.length > 0) {
      const sorted = moviesForType.slice().sort((a, b) => b.release_year - a.release_year);
      const newRelFull = convertToMovie(sorted);
      if (newRelFull.length === 0 && moviesForType.length < totalNumMovies) return;
      setNewReleases(newRelFull);
      console.log("New Releases:", newRelFull.map(m => (m ? m.title : "placeholder")));
    }
  }, [moviesForType, erroredMovieIds, totalNumMovies]);

  // Updated Genre Grouping Effect (pass full array)
  useEffect(() => {
    const applicableGenres = genres.filter(genreKey => {
      return selectedType === "Movie"
        ? !genreKey.toLowerCase().includes("tv")
        : genreKey.toLowerCase().includes("tv");
    });

    const groups: Record<string, (Movie | null)[]> = {};
    applicableGenres.forEach(genreKey => {
      const formattedGenre = formatGenreLabel(genreKey);
      const matches = moviesForType.filter(m =>
        Object.keys(m).some(key => key.toLowerCase() === genreKey.toLowerCase() && m[key] === 1)
      );
      const groupFull = convertToMovie(matches);
      if (groupFull.length === 0 && moviesForType.length < totalNumMovies) return;
      groups[formattedGenre] = groupFull;
      console.log(`Genre "${formattedGenre}":`, groupFull.map(i => (i ? i.title : "placeholder")));
    });
    setGenreMovies(groups);
  }, [moviesForType, genres, erroredMovieIds, selectedType, totalNumMovies]);

  // Global effect to ensure sections eventually have more items if available.
  useEffect(() => {
    const recCount = recommended.length;
    const newRelCount = newReleases.length;
    let genreShort = false;
    for (const group of Object.values(genreMovies)) {
      if (group.length < SECTION_SIZE) {
        genreShort = true;
        break;
      }
    }
    if (
      (recCount < SECTION_SIZE || newRelCount < SECTION_SIZE || genreShort) &&
      allMovies.length < totalNumMovies &&
      !loading
    ) {
      setPageNum(prev => prev + 1);
    }
  }, [recommended, newReleases, genreMovies, allMovies, totalNumMovies, loading]);

  // Callback for image load errors.
  const handleImageError = useCallback((movieId: string) => {
    setErroredMovieIds(prev => new Set(prev).add(movieId));
    console.log("Image error for:", movieId);
  }, []);

  return (
    <div className={styles.moviesPage}>
      <Header selectedType={selectedType} onTypeChange={setSelectedType} />
      <CookieConsentBanner />
      <div className={styles.mainContent}>
        {/* Hero Section: Only for Movies */}
        {selectedType === "Movie" && (
          <div className={styles.heroSection}>
            <img
              src={featuredMovie.image}
              alt={featuredMovie.title}
              className={styles.heroImage}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://placehold.co/200x120?text=No+Image";
              }}
            />
            <div className={styles.heroOverlay}>
              <h1 className={styles.heroTitle}>{featuredMovie.title}</h1>
              <p className={styles.heroDescription}>{featuredMovie.description}</p>
            </div>
          </div>
        )}
        <div className={styles.categoriesContainer}>
          {selectedType === "TV Show" && recommended.length === 0 ? (
            <div className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>Shows Coming Soon!</h2>
            </div>
          ) : (
            <>
              {/* Recommended Section */}
              <MovieCategorySection
                title="Recommended For You"
                movies={recommended}
                type="duration"
                onImageError={handleImageError}
              />
              {/* New Releases Section */}
              <MovieCategorySection
                title="New Releases"
                movies={newReleases}
                type="duration"
                onImageError={handleImageError}
              />
              {/* Genre Sections */}
              {Object.entries(genreMovies).map(([genre, movies]) => (
                <MovieCategorySection
                  key={genre}
                  title={genre}
                  movies={movies}
                  type="duration"
                  onImageError={handleImageError}
                />
              ))}
            </>
          )}
        </div>
      </div>
      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} style={{ height: "1px" }} />
      <Footer />
    </div>
  );
};

export default MoviesPage;
