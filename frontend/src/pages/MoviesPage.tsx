import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./MoviesPage.module.css";
import TopNavBar from "../components/TopNavBar";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
import CookieConsentBanner from "../components/CookieConsentBanner";

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
const PAGE_SIZE = 20;      // For data loading/infinite scroll
const SECTION_SIZE = 7;    // Each section renders 7 cards

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

// Pad an array with null values until it reaches targetLength.
function padArray<T>(arr: T[], targetLength: number): (T | null)[] {
  const padded = [...arr];
  while (padded.length < targetLength) {
    padded.push(null);
  }
  return padded;
}

// --- MoviesPage Component ---
const MoviesPage: React.FC = () => {
  // Instead of one "allMovies" state, we cache movies by type.
  const [cachedMovies, setCachedMovies] = useState<{
    Movie: MovieFromApi[];
    "TV Show": MovieFromApi[];
  }>({ Movie: [], "TV Show": [] });

  // The selected type (determines which cache to use).
  const [selectedType, setSelectedType] = useState<"Movie" | "TV Show">("Movie");

  // The derived sections that we will render.
  const [recommended, setRecommended] = useState<(Movie | null)[]>([]);
  const [newReleases, setNewReleases] = useState<(Movie | null)[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, (Movie | null)[]>>({});

  // These states are used for infinite scroll.
  const [pageNum, setPageNum] = useState(1);
  const [totalNumMovies, setTotalNumMovies] = useState(0);
  const [loading, setLoading] = useState(false);

  // Other state.
  const [genres, setGenres] = useState<string[]>([]);
  const [erroredMovieIds, setErroredMovieIds] = useState<Set<string>>(new Set());
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Featured movie for hero section (only for Movies).
  const featuredMovie = {
    title: "The Interview",
    description:
      "A satirical look at international relations featuring a controversial interview that turns unexpectedly.",
    image: generateImageURL("The Interview"),
  };

  // --- Data Loading ---

  // Fetch genres once on mount.
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
      // Update total count (global for now)
      setTotalNumMovies(dataMovies.totalNumMovies);
      // Update our cache by appending new movies into the proper cache by type.
      setCachedMovies(prev => {
        const newCache = { ...prev };
        newMovies.forEach(movie => {
          if (movie.type === "Movie") {
            if (!newCache.Movie.some(m => m.show_id === movie.show_id)) {
              newCache.Movie.push(movie);
            }
          } else if (movie.type && movie.type.toLowerCase().includes("tv")) {
            if (!newCache["TV Show"].some(m => m.show_id === movie.show_id)) {
              newCache["TV Show"].push(movie);
            }
          }
        });
        return newCache;
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

  // Infinite scroll: Increase pageNum when the sentinel becomes visible.
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && !loading && (cachedMovies[selectedType].length < totalNumMovies)) {
        setPageNum(prev => prev + 1);
      }
    });
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [loading, cachedMovies, totalNumMovies, selectedType]);

  // --- Section Calculations ---  
  // Get the movies for the current selected type.
  const moviesForType = cachedMovies[selectedType];

  // Compute "Recommended For You" section.
  useEffect(() => {
    if (moviesForType.length > 0) {
      const filtered = moviesForType.filter(m => !erroredMovieIds.has(m.show_id));
      const recsFull = convertToMovie(filtered);
      // Only set sections if we have enough movies already or no more movies are available.
      if (recsFull.length < SECTION_SIZE && moviesForType.length < totalNumMovies) return;
      const recs = recsFull.length >= SECTION_SIZE ? recsFull.slice(0, SECTION_SIZE) : padArray(recsFull, SECTION_SIZE);
      setRecommended(recs);
      console.log("Recommended:", recs.map(m => (m ? m.title : "placeholder")));
    }
  }, [moviesForType, erroredMovieIds, totalNumMovies]);

  // Compute "New Releases" section.
  useEffect(() => {
    if (moviesForType.length > 0) {
      const filtered = moviesForType.filter(m => !erroredMovieIds.has(m.show_id));
      const sorted = filtered.slice().sort((a, b) => b.release_year - a.release_year);
      const newRelFull = convertToMovie(sorted);
      if (newRelFull.length < SECTION_SIZE && moviesForType.length < totalNumMovies) return;
      const newRel = newRelFull.length >= SECTION_SIZE ? newRelFull.slice(0, SECTION_SIZE) : padArray(newRelFull, SECTION_SIZE);
      setNewReleases(newRel);
      console.log("New Releases:", newRel.map(m => (m ? m.title : "placeholder")));
    }
  }, [moviesForType, erroredMovieIds, totalNumMovies]);

  // Compute Genre Grouping.
  useEffect(() => {
    // For segregating genres: Movies use genres that do not include "tv"; TV shows use genres that include "tv".
    const applicableGenres = genres.filter(genreKey => {
      if (selectedType === "Movie") {
        return !genreKey.toLowerCase().includes("tv");
      } else {
        return genreKey.toLowerCase().includes("tv");
      }
    });
    const filteredItems = moviesForType.filter(m => !erroredMovieIds.has(m.show_id));
    // Avoid duplicates by starting with the IDs already in Recommended.
    const usedIds = new Set<string>(recommended.map(item => item?.id || ""));
    const groups: Record<string, (Movie | null)[]> = {};
    applicableGenres.forEach(genreKey => {
      const formattedGenre = formatGenreLabel(genreKey);
      const matches = filteredItems.filter(m =>
        Object.keys(m).some(key =>
          key.toLowerCase() === genreKey.toLowerCase() && m[key] === 1
        ) && !usedIds.has(m.show_id)
      );
      const groupFull = convertToMovie(matches);
      if (groupFull.length < SECTION_SIZE && moviesForType.length < totalNumMovies) return;
      const groupItems = groupFull.length >= SECTION_SIZE ? groupFull.slice(0, SECTION_SIZE) : padArray(groupFull, SECTION_SIZE);
      groupItems.forEach(item => {
        if (item) usedIds.add(item.id);
      });
      if (groupItems.length > 0) {
        groups[formattedGenre] = groupItems;
        console.log(`Genre "${formattedGenre}":`, groupItems.map(i => (i ? i.title : "placeholder")));
      }
    });
    setGenreMovies(groups);
  }, [moviesForType, genres, erroredMovieIds, recommended, selectedType, totalNumMovies]);

  // --- Global Effect to Ensure Sections Have 7 Items ---
  useEffect(() => {
    const recCount = recommended.filter(m => m !== null).length;
    const newRelCount = newReleases.filter(m => m !== null).length;
    let genreShort = false;
    for (const group of Object.values(genreMovies)) {
      if (group.filter(m => m !== null).length < SECTION_SIZE) {
        genreShort = true;
        break;
      }
    }
    if ((recCount < SECTION_SIZE || newRelCount < SECTION_SIZE || genreShort) &&
        moviesForType.length < totalNumMovies &&
        !loading) {
      setPageNum(prev => prev + 1);
    }
  }, [recommended, newReleases, genreMovies, moviesForType, totalNumMovies, loading]);

  // --- Callback for Image Load Errors ---
  const handleImageError = useCallback((movieId: string) => {
    setErroredMovieIds(prev => new Set(prev).add(movieId));
    console.log("Image error for:", movieId);
  }, []);

  return (
    <div className={styles.moviesPage}>
      <TopNavBar selectedType={selectedType} onTypeChange={setSelectedType} />
      <CookieConsentBanner />
      <div className={styles.mainContent}>
        {/* Hero Section for Movies */}
        {selectedType === "Movie" && (
          <div className={styles.heroSection}>
            <img
              src={featuredMovie.image}
              alt={featuredMovie.title}
              className={styles.heroImage}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/200x120?text=No+Image";
              }}
            />
            <div className={styles.heroOverlay}>
              <h1 className={styles.heroTitle}>{featuredMovie.title}</h1>
              <p className={styles.heroDescription}>{featuredMovie.description}</p>
            </div>
          </div>
        )}
        <div className={styles.categoriesContainer}>
          {selectedType === "TV Show" && recommended.filter(m => m !== null).length === 0 ? (
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
      <div ref={sentinelRef} style={{ height: "1px" }} />
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
