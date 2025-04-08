import React, { useEffect, useState, useRef } from "react";
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
  id: number;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

const PAGE_SIZE = 20; // Number of movies to request per page

// Fisher–Yates shuffle for uniform randomization.
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateImageURL = (title: string) =>
  `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;

const convertToMovie = (data: MovieFromApi[], startId = 0): Movie[] => {
  return data.map((movie, idx) => {
    const durationMin = movie.duration_minutes_movies ?? 90;
    // Generate a random rating between 3.5 and 5.0.
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    return {
      id: startId + idx,
      show_id: `s${Math.floor(Math.random() * 8807) + 1}`,
      title: movie.title,
      duration: `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`,
      rating: parseFloat(rating),
      image: generateImageURL(movie.title),
      releaseDate: `April ${movie.release_year}`
    };
  });
};

const formatGenreLabel = (raw: string) => {
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
};

const MoviesPage: React.FC = () => {
  // All movies loaded so far.
  const [allMovies, setAllMovies] = useState<MovieFromApi[]>([]);
  // Derived state for recommended movies and genre categories.
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, Movie[]>>({});
  // Pagination state.
  const [pageNum, setPageNum] = useState(1);
  const [totalNumMovies, setTotalNumMovies] = useState(0);
  const [loading, setLoading] = useState(false);
  // Array of genres (fetched on mount).
  const [genres, setGenres] = useState<string[]>([]);
  // Active tab state.
  const [activeTab, setActiveTab] = useState<"movies" | "shows">("movies");
  // Sentinel ref for infinite scrolling.
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Load movies for a given page.
  const loadMovies = async (page: number) => {
    setLoading(true);
    try {
      const moviesUrl = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetAllMovies?pageSize=${PAGE_SIZE}&pageNum=${page}`;
      const resMovies = await fetch(moviesUrl);
      const dataMovies = await resMovies.json();
      // IMPORTANT: Use lowercase "movies" (as in your API sample) and totalNumMovies.
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
        const resGenres = await fetch("https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetGenres");
        const genresData: string[] = await resGenres.json();
        setGenres(genresData);
        console.log("Fetched genres:", genresData);
      } catch (err) {
        console.error("Failed to load genres:", err);
      }
    };
    fetchGenres();
  }, []);

  // Load the first page on mount and load subsequent pages when pageNum changes.
  useEffect(() => {
    loadMovies(pageNum);
  }, [pageNum]);

  // Set up IntersectionObserver for infinite scrolling.
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

  // Recalculate recommended and genre movies whenever allMovies or genres change.
  useEffect(() => {
    // Filter movies that are of type "Movie".
    const onlyMovies = allMovies.filter(m => m.type === "Movie");
    // Recommended: pick PAGE_SIZE random movies.
    const recommendedMovies = convertToMovie(shuffleArray(onlyMovies).slice(0, PAGE_SIZE));
    setRecommended(recommendedMovies);
    console.log("Recommended movies:", recommendedMovies.map(movie => movie.title));

    const movieByGenre: Record<string, Movie[]> = {};
    genres.forEach((genreKey) => {
      // Debug logging: show which movies have the matching key.
      console.log(`\n--- Debug for Genre: "${genreKey}" ---`);
      onlyMovies.forEach((movie) => {
        const matchedKeys = Object.keys(movie).filter(
          (key) => key.toLowerCase() === genreKey.toLowerCase()
        );
        if (matchedKeys.length > 0) {
          console.log(
            `Movie "${movie.title}" has key(s): ${JSON.stringify(matchedKeys)} with value(s): ${JSON.stringify(matchedKeys.map(key => movie[key]))}`
          );
        }
      });
      const filtered = onlyMovies.filter((m) =>
        Object.keys(m).some(
          (key) => key.toLowerCase() === genreKey.toLowerCase() && m[key] === 1
        )
      );
      const formattedGenre = formatGenreLabel(genreKey);
      const moviesForGenre = filtered.length > 0
        ? convertToMovie(shuffleArray(filtered).slice(0, PAGE_SIZE))
        : [];
      movieByGenre[formattedGenre] = moviesForGenre;
      console.log(`Movies for category "${formattedGenre}":`, moviesForGenre.map(movie => movie.title));
    });
    setGenreMovies(movieByGenre);
  }, [allMovies, genres]);

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
                />
                {Object.entries(genreMovies).map(([genre, movies]) => (
                  <MovieCategorySection
                    key={genre}
                    title={genre}
                    movies={movies}
                    type="duration"
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
      {/* Sentinel element used for infinite scrolling */}
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
