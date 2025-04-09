import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Correctly import useNavigate
import styles from "./MoviesPage.module.css";
import Header from "../components/TopNavBar";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import PageDetails from "./PageDetails";
import { useParams } from "react-router-dom";
import fetchMoviesByGenres from "../components/fetchMoviesByGenres";
import { useMemo } from "react";



// --- Interfaces ---
interface MovieFromApi {
  show_id: string;
  title: string;
  duration_minutes_movies: number | null;
  duration_in_seasons?: number | null;
  release_year: number;
  rating: string;
  type?: string;
  [key: string]: any; // Allow additional properties
};


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
const PAGE_SIZE = 1500;    // for data loading/infinite scroll
const SECTION_SIZE = 14;  // each section must display 7 movies per carousel page

const MOVIES_CACHE_KEY = "cachedMovies";

// --- Helper Functions ---
// Generate the image URL from the movie title.
const generateImageURL = (title: string) =>
  `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;

// Convert API movie data to our Movie interface.
// Replace your convertToMovie function with this:
const convertToMovie = (data: MovieFromApi[]): Movie[] => {
  return data.map((movie) => {
    const durationMin = movie.duration_minutes_movies ?? 90;
    return {
      id: movie.show_id,
      show_id: movie.show_id,
      title: movie.title,
      duration: `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`,
      rating: parseFloat(movie.rating) || 4.0, // use provided rating or fallback to 4.0
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
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null); // State to track the selected movie ID
  const navigate = useNavigate(); 
  const [stopInfiniteScroll, setStopInfiniteScroll] = useState(false);
  const [genreMap, setGenreMap] = useState<Record<string, MovieFromApi[]>>({});
  const [error, setError] = useState<string | null>(null);


  const handleMovieClick = (show_id: string) => {
    // Optionally store it in state
    setSelectedMovieId(show_id);
    // Then navigate to the details route
    navigate(`/movie/${show_id}`);
  };



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
        // Remove the undefined call:
        // fetchMoviesForEachGenre();
      } catch (err) {
        console.error("Failed to load genres:", err);
      }
    };
    fetchGenres();
  }, []);
  
  








  const loadMovies = async (page: number) => {
    // If already have at least SECTION_SIZE, do nothing
    if (allMovies.length >= SECTION_SIZE) {
      console.log("Already reached the maximum number of movies for the carousel.");
      setStopInfiniteScroll(true);
      return;
    }
  
    setLoading(true);
  
    try {
      const moviesUrl = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetAllMovies?pageSize=${PAGE_SIZE}&pageNum=${page}`;
      const resMovies = await fetch(moviesUrl);
      const dataMovies = await resMovies.json();
      const newMovies: MovieFromApi[] = dataMovies.movies ?? [];
  
      // If no movies are returned, or we reached SECTION_SIZE, stop loading more
      if (newMovies.length === 0) {
        console.log("No more movies to load.");
        setStopInfiniteScroll(true);
        return;
      }
  
      // Append the new movies
      setAllMovies((prev) => {
        const combined = [...prev, ...newMovies];
        const unique = Array.from(new Map(combined.map(m => [m.show_id, m])).values());
        // If we’re at or beyond SECTION_SIZE, block further fetching
        if (unique.length >= SECTION_SIZE) {
          setStopInfiniteScroll(true);
        }
        return unique;
      });
  
      // Update total if needed
      setTotalNumMovies(dataMovies.totalNumMovies);
  
      console.log(`Loaded page ${page}:`, newMovies.map((m) => m.title));
    } catch (err) {
      console.error("Failed to load movies:", err);
    } finally {
      setLoading(false);
    }
  };
  


 
  

  useEffect(() => {
    // As soon as the component mounts, fetch all genre-based movies
    (async function loadData() {
      try {
        setLoading(true);
        const data = await fetchMoviesByGenres();
        setGenreMap(data); 
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch movies by genres");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading genres and movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  




  // Load pages when pageNum increases.
  useEffect(() => {
    loadMovies(pageNum);
  }, [pageNum]);


  
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


  useEffect(() => {
    if (stopInfiniteScroll) {
      // If we’re done loading, unobserve the sentinel (if desired)
      if (sentinelRef.current) {
        const observer = new IntersectionObserver(() => {});
        observer.unobserve(sentinelRef.current);
      }
      return;
    }
  
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (
        firstEntry.isIntersecting &&
        !loading &&
        allMovies.length < totalNumMovies
      ) {
        setPageNum((prev) => prev + 1);
      }
    });
  
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);
  
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [stopInfiniteScroll, loading, allMovies, totalNumMovies]);
  

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
  
    // Combine Action and Adventure into one group "Action & Adventure"
    const actionAdventureMatches = moviesForType.filter(
      m => m["action"] === 1 || m["adventure"] === 1
    );
    const actionAdventureConverted = convertToMovie(actionAdventureMatches);
    if (actionAdventureConverted.length > 0) {
      groups["Action & Adventure"] = actionAdventureConverted;
    }
  
    // Now, filter out "Action" and "Adventure" individually
    applicableGenres.forEach(genreKey => {
      if (
        genreKey.toLowerCase() !== "action" &&
        genreKey.toLowerCase() !== "adventure"
      ) {
        const formattedGenre = formatGenreLabel(genreKey);
        const matches = moviesForType.filter(m =>
          Object.keys(m).some(
            key => key.toLowerCase() === genreKey.toLowerCase() && m[key] === 1
          )
        );
        const groupFull = convertToMovie(matches);
        if (groupFull.length === 0 && moviesForType.length < totalNumMovies) return;
        groups[formattedGenre] = groupFull;
        console.log(`Genre "${formattedGenre}":`, groupFull.map(i => (i ? i.title : "placeholder")));
      }
    });
  
    setGenreMovies(groups);
  }, [moviesForType, genres, erroredMovieIds, selectedType, totalNumMovies]);
  
  

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
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/200x120?text=No+Image";
              }}
            />
            <div className={styles.heroOverlay}>
              <h1 className={styles.heroTitle}>{featuredMovie.title}</h1>
              <p className={styles.heroDescription}>
                {featuredMovie.description}
              </p>
            </div>
          </div>
        )}
  
        <div className={styles.categoriesContainer}>
          {/* Show a message if there are no recommended shows for "TV Show" */}
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
                onImageError={handleImageError}

              />
  
              {/* New Releases Section */}
              <MovieCategorySection
                title="New Releases"
                movies={newReleases}
                onImageError={handleImageError}

              />
  
              {/* Genre Sections */}
              {Object.entries(genreMovies).map(([genre, movies]) => (
                <MovieCategorySection
                  key={genre}
                  title={genre}
                  movies={movies}
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
