import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./MoviesPage.module.css";
import TopNavBar from "../components/TopNavBar";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";

interface MovieFromApi {
  show_id: string;
  title: string;
  duration_minutes_movies: number | null;
  release_year: number;
  rating: string;
  type?: string;
  [key: string]: any;
}

interface Movie {
  // Using the API’s show_id as the stable identifier (a string).
  id: string;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

const PAGE_SIZE = 20; // Movies per API call and target count per section
const MIN_MOVIES = 7;  // Minimum movies required for a genre to be rendered

// Generate the image URL from the movie title.
const generateImageURL = (title: string) =>
  `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;

// Convert API movie data to our Movie interface.
const convertToMovie = (data: MovieFromApi[]): Movie[] => {
  return data.map((movie) => {
    const durationMin = movie.duration_minutes_movies ?? 90;
    // Generate a random rating between 3.5 and 5.0.
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    return {
      id: movie.show_id,
      show_id: movie.show_id,
      title: movie.title,
      duration: `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`,
      rating: parseFloat(rating),
      image: generateImageURL(movie.title),
      releaseDate: `April ${movie.release_year}`
    };
  });
};

// Format genre labels by inserting spaces.
const formatGenreLabel = (raw: string) => {
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
};

const MoviesPage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<MovieFromApi[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, Movie[]>>({});
  const [pageNum, setPageNum] = useState(1);
  const [totalNumMovies, setTotalNumMovies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"movies" | "shows">("movies");
  // Set of movie IDs whose image failed to load.
  const [erroredMovieIds, setErroredMovieIds] = useState<Set<string>>(new Set());
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Function to load movies for a given page.
  const loadMovies = async (page: number) => {
    setLoading(true);
    try {
      const moviesUrl = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetAllMovies?pageSize=${PAGE_SIZE}&pageNum=${page}`;
      const resMovies = await fetch(moviesUrl);
      const dataMovies = await resMovies.json();
      const newMovies: MovieFromApi[] = dataMovies.movies ?? [];
      setAllMovies(prev => [...prev, ...newMovies]);
      setTotalNumMovies(dataMovies.totalNumMovies);
      console.log(`Loaded page ${page}:`, newMovies.map(movie => movie.title));
    } catch (err) {
      console.error("Failed to load movies:", err);
    } finally {
      setLoading(false);
    }
  };

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

  // Load the first page on mount and additional pages when pageNum increases.
  useEffect(() => {
    loadMovies(pageNum);
  }, [pageNum]);

  // Infinite scroll: Observe the sentinel element to load more movies.
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && !loading && allMovies.length < totalNumMovies) {
        setPageNum(prev => prev + 1);
      }
    });
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [loading, allMovies, totalNumMovies]);

  // Compute the "Recommended For You" section.
  // Now also filter out movies whose images have failed.
  useEffect(() => {
    if (recommended.length === 0 && allMovies.length > 0) {
      const onlyMovies = allMovies.filter(
        m => m.type === "Movie" && !erroredMovieIds.has(m.show_id)
      );
      const recs = convertToMovie(onlyMovies.slice(0, PAGE_SIZE));
      setRecommended(recs);
      console.log("Recommended movies:", recs.map(m => m.title));
    }
  }, [allMovies, recommended.length, erroredMovieIds]);

  // Compute movies for each genre, ensuring no duplicate movies across sections
  // and that each genre section has at least MIN_MOVIES movies.
  useEffect(() => {
    const onlyMovies = allMovies.filter(
      m => m.type === "Movie" && !erroredMovieIds.has(m.show_id)
    );
    // Begin with recommended movies' IDs so they are not rendered again.
    const usedIds = new Set<string>(recommended.map(movie => movie.id));
    const movieByGenre: Record<string, Movie[]> = {};

    genres.forEach((genreKey) => {
      const formattedGenre = formatGenreLabel(genreKey);
      const filtered = onlyMovies.filter(m =>
        Object.keys(m).some(
          (key) => key.toLowerCase() === genreKey.toLowerCase() && m[key] === 1
        ) && !usedIds.has(m.show_id)
      );
      let moviesForGenre = convertToMovie(filtered).slice(0, PAGE_SIZE);
      moviesForGenre.forEach(movie => usedIds.add(movie.id));
      // Only add the genre if we have at least MIN_MOVIES movies.
      if (moviesForGenre.length >= MIN_MOVIES) {
        movieByGenre[formattedGenre] = moviesForGenre;
        console.log(`Movies for category "${formattedGenre}" (>=${MIN_MOVIES}):`, moviesForGenre.map(movie => movie.title));
      }
    });

    setGenreMovies(movieByGenre);
  }, [allMovies, genres, erroredMovieIds, recommended]);

  // Callback to flag a movie whose image fails to load.
  const handleImageError = useCallback((movieId: string) => {
    setErroredMovieIds(prev => new Set(prev).add(movieId));
    console.log("Image error for movie:", movieId);
  }, []);

  return (
    <div className={styles.moviesPage}>
      <TopNavBar />
      <div className={styles.mainContent}>
        <div className={styles.heroSection}>
          <img
            src={generateImageURL("The Interview")}
            alt="Featured Movie"
            className={styles.heroImage}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/200x300?text=No+Image";
            }}
          />
          <div className={styles.heroContent}></div>
        </div>
        <div className={styles.tabContainer}>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${activeTab === "movies" ? styles.activeTab : styles.inactiveTab}`}
              onClick={() => setActiveTab("movies")}
            >
              Movies
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "shows" ? styles.activeTab : styles.inactiveTab}`}
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
                  movies={recommended}
                  type="duration"
                  onImageError={handleImageError}
                />
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
            {activeTab === "shows" && (
              <div className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>Shows Coming Soon!</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Sentinel element for infinite scrolling */}
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
