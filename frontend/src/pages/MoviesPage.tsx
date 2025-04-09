import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./MoviesPage.module.css";
import TopNavBar from "../components/TopNavBar";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
import CookieConsentBanner from "../components/CookieConsentBanner";

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

interface Movie {
  // Using the API’s show_id as the stable identifier.
  id: string;
  show_id: string;
  title: string;
  duration: string;
  rating: number;
  image: string;
  releaseDate?: string;
}

const PAGE_SIZE = 20; // Items per API call and target count per section
const MIN_MOVIES = 7;  // Minimum items required for a genre to be rendered

// Generate the image URL from the title.
const generateImageURL = (title: string) =>
  `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;

// Convert API data to our Movie interface.
// For TV shows, we display the duration as number of seasons.
const convertToMovie = (data: MovieFromApi[]): Movie[] => {
  return data.map((item) => {
    if (item.type === "TV Show") {
      const seasons = item.duration_in_seasons ?? 0;
      const durationStr =
        seasons > 0 ? `${seasons} Season${seasons > 1 ? "s" : ""}` : "N/A";
      return {
        id: item.show_id,
        show_id: item.show_id,
        title: item.title,
        duration: durationStr,
        rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
        image: generateImageURL(item.title),
        releaseDate: `April ${item.release_year}`,
      };
    } else {
      // Assume it's a movie.
      const durationMin = item.duration_minutes_movies ?? 90;
      const hours = Math.floor(durationMin / 60);
      const minutes = durationMin % 60;
      const durationStr = `${hours}h ${minutes}min`;
      return {
        id: item.show_id,
        show_id: item.show_id,
        title: item.title,
        duration: durationStr,
        rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
        image: generateImageURL(item.title),
        releaseDate: `April ${item.release_year}`,
      };
    }
  });
};

// Format genre labels by inserting spaces.
const formatGenreLabel = (raw: string) => {
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
};

const MoviesPage: React.FC = () => {
  // The selectedType drives which items to display.
  const [selectedType, setSelectedType] = useState<"Movie" | "TV Show">("Movie");
  const [allMovies, setAllMovies] = useState<MovieFromApi[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, Movie[]>>({});
  const [pageNum, setPageNum] = useState(1);
  const [totalNumMovies, setTotalNumMovies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);
  const [erroredMovieIds, setErroredMovieIds] = useState<Set<string>>(new Set());
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Featured item for the hero section.
  const featuredMovie = {
    title: "The Interview",
    description:
      "A satirical look at international relations featuring a controversial interview that turns unexpectedly.",
    image: generateImageURL("The Interview"),
  };

  // Reset state when switching between Movies and TV Shows.
  useEffect(() => {
    setAllMovies([]);
    setPageNum(1);
    setTotalNumMovies(0);
    setRecommended([]);
    setGenreMovies({});
  }, [selectedType]);

  // Load items from the API.
  // The GetAllMovies endpoint returns both movies and TV shows.
  const loadMovies = async (page: number) => {
    setLoading(true);
    try {
      const moviesUrl = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetAllMovies?pageSize=${PAGE_SIZE}&pageNum=${page}`;
      const resMovies = await fetch(moviesUrl);
      const dataMovies = await resMovies.json();
      const newItems: MovieFromApi[] = dataMovies.movies ?? [];
      setAllMovies((prev) => [...prev, ...newItems]);
      setTotalNumMovies(dataMovies.totalNumMovies);
      console.log(`Loaded page ${page}:`, newItems.map(item => item.title));
    } catch (err) {
      console.error("Failed to load items:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial and subsequent pages.
  useEffect(() => {
    loadMovies(pageNum);
  }, [pageNum]);

  // Infinite scroll: increment pageNum when the sentinel becomes visible.
  useEffect(() => {
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
  }, [loading, allMovies, totalNumMovies]);

  // Compute the "Recommended For You" section for the selected type.
  useEffect(() => {
    if (allMovies.length > 0) {
      const filtered = allMovies.filter(
        (m) => m.type === selectedType && !erroredMovieIds.has(m.show_id)
      );
      const recs = convertToMovie(filtered.slice(0, PAGE_SIZE));
      setRecommended(recs);
      console.log("Recommended items:", recs.map(m => m.title));
    }
  }, [allMovies, selectedType, erroredMovieIds]);

  // Compute genre sections for the selected type.
  useEffect(() => {
    const filteredItems = allMovies.filter(
      (m) => m.type === selectedType && !erroredMovieIds.has(m.show_id)
    );
    const usedIds = new Set<string>(recommended.map((item) => item.id));
    const itemsByGenre: Record<string, Movie[]> = {};

    genres.forEach((genreKey) => {
      const formattedGenre = formatGenreLabel(genreKey);
      const matchesGenre = filteredItems.filter(
        (m) =>
          Object.keys(m).some(
            (key) =>
              key.toLowerCase() === genreKey.toLowerCase() && m[key] === 1
          ) && !usedIds.has(m.show_id)
      );
      let itemsForGenre = convertToMovie(matchesGenre).slice(0, PAGE_SIZE);
      itemsForGenre.forEach((item) => usedIds.add(item.id));
      if (itemsForGenre.length >= MIN_MOVIES) {
        itemsByGenre[formattedGenre] = itemsForGenre;
        console.log(
          `Items for category "${formattedGenre}" (>=${MIN_MOVIES}):`,
          itemsForGenre.map((item) => item.title)
        );
      }
    });

    setGenreMovies(itemsByGenre);
  }, [allMovies, genres, erroredMovieIds, recommended, selectedType]);

  // Handle image load errors.
  const handleImageError = useCallback((movieId: string) => {
    setErroredMovieIds((prev) => new Set(prev).add(movieId));
    console.log("Image error for item:", movieId);
  }, []);

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

  return (
    <div className={styles.moviesPage}>
      {/* TopNavBar controls type toggling and search functionality */}
      <TopNavBar selectedType={selectedType} onTypeChange={setSelectedType} />

      <CookieConsentBanner />

      <div className={styles.mainContent}>
        {/* Conditionally render the hero section only for movies */}
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

        {/* Display the recommended section and genre sections for the selected type */}
        <div className={styles.categoriesContainer}>
          <MovieCategorySection
            title="Recommended For You"
            movies={recommended}
            type="duration"
            onImageError={handleImageError}
          />
          {Object.entries(genreMovies).map(([genre, items]) => (
            <MovieCategorySection
              key={genre}
              title={genre}
              movies={items}
              type="duration"
              onImageError={handleImageError}
            />
          ))}
        </div>
      </div>

      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} style={{ height: "1px" }} />

      {/* Footer */}
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

