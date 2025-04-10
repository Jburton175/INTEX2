
// import React, { useState, useEffect } from "react";
// import styles from "./MoviesPage.module.css";
// import Header from "../components/TopNavBar";
// import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
// import CookieConsentBanner from "../components/CookieConsentBanner";
// import Footer from "../components/Footer";
// import PageDetails from "./PageDetails";

// interface MovieFromApi {
//   show_id: string;
//   title: string;
//   duration: string;
//   release_year: number;
//   [key: string]: any; // For genre flags and possible other keys
// }

// export interface Movie {
//   id: string;
//   show_id: string;
//   title: string;
//   image: string;
//   duration: string;
//   rating: number;
//   releaseDate: string;
// }

// const PAGE_SIZE = 1000;
// const API_BASE = "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net";

// const getGenresFromMovie = (movie: MovieFromApi): string[] => {
//   return Object.keys(movie).filter(
//     key =>
//       movie[key] === 1 &&
//       key !== "show_id" &&
//       key !== "type" &&
//       !key.startsWith("duration") &&
//       !key.startsWith("ratings")
//   );
// };

// const convertToMovie = (data: MovieFromApi): Movie => ({
//   id: data.show_id,
//   show_id: data.show_id,
//   title: data.title,
//   image: `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(
//     data.title
//   )}.jpg`,
//   duration: data.duration,
//   rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
//   releaseDate: `April ${data.release_year}`
// });

// const MoviesPage: React.FC = () => {
//   const [selectedType, setSelectedType] = useState<"Movie" | "TV Show">("Movie");
//   const [genreMovies, setGenreMovies] = useState<Record<string, Movie[]>>({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

//   const loadMovies = async (page: number) => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `${API_BASE}/INTEX/GetAllMovies?page=${page}&pageSize=${PAGE_SIZE}`
//       );
//       if (!res.ok) {
//         console.error(
//           `Error fetching movies: ${res.status} - ${res.statusText}`
//         );
//         return;
//       }
//       const data = await res.json();

//       // Extract movies array from the response.
//       let moviesArray: MovieFromApi[] = [];
//       if (Array.isArray(data)) {
//         moviesArray = data;
//       } else if (data && Array.isArray(data.movies)) {
//         moviesArray = data.movies;
//       } else {
//         console.error("Expected an array for movies, but got:", data);
//         return;
//       }

//       const newGenreMap: Record<string, Movie[]> = { ...genreMovies };

//       moviesArray.forEach((movieData: MovieFromApi) => {
//         const movie = convertToMovie(movieData);
//         const genres = getGenresFromMovie(movieData);
//         genres.forEach(genre => {
//           if (!newGenreMap[genre]) {
//             newGenreMap[genre] = [];
//           }
//           if (!newGenreMap[genre].some(m => m.id === movie.id)) {
//             newGenreMap[genre].push(movie);
//           }
//         });
//       });

//       setGenreMovies(newGenreMap);
//       setHasMore(moviesArray.length === PAGE_SIZE);
//     } catch (error) {
//       console.error("Error loading movies:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMovies(currentPage);
//   }, [currentPage]);

//   // Handler to remove a movie if its image fails to load.
//   const handleImageError = (failedMovieId: string) => {
//     setGenreMovies(prevGenres => {
//       const newGenres = { ...prevGenres };
//       Object.keys(newGenres).forEach(genre => {
//         newGenres[genre] = newGenres[genre].filter(
//           movie => movie.id !== failedMovieId
//         );
//       });
//       return newGenres;
//     });
//   };

//   const handleLoadMore = async () => {
//     if (!loading && hasMore) {
//       setCurrentPage(prev => prev + 1);
//     }
//   };

//   return (
//     <div className={styles.moviesPage}>
//       <Header selectedType={selectedType} onTypeChange={setSelectedType} />
//       <CookieConsentBanner />

//       <div className={styles.mainContent}>
//         <div className={styles.categoriesContainer}>
//           {Object.entries(genreMovies).map(([genre, movies]) => (
//             <MovieCategorySection
//               key={genre}
//               title={genre}
//               movies={movies}
//               categoryKey={genre}
//               onLoadMore={handleLoadMore}
//               onImageError={handleImageError}
//             />
//           ))}
//         </div>
//         {loading && (
//           <div className={styles.loading}>Loading more movies...</div>
//         )}
//       </div>

//       {selectedMovieId && (
//         <PageDetails
//           showId={selectedMovieId}
//           onClose={() => setSelectedMovieId(null)}
//         />
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default MoviesPage;











// src/pages/MoviesPage.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./MoviesPage.module.css";
import Header from "../components/TopNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import MovieCard, { Movie } from "../components/moviesPage/MovieCard";
import PageDetails from "./PageDetails";

const PAGE_SIZE = 20;
const API_BASE =
  "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net";

// Build the blob image URL from the movie's title.
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
  [key: string]: any;
}

// Convert API movie into our Movie object.
const convertToMovie = (data: MovieFromApi): Movie => ({
  id: data.show_id,
  show_id: data.show_id,
  title: data.title,
  image: getImageUrl(data.title),
  duration: data.duration,
  rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
  releaseDate: `April ${data.release_year}`,
});

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [replacementQueue, setReplacementQueue] = useState<string[]>([]);
  const replacementTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

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
      const res = await fetch(
        `${API_BASE}/INTEX/GetAllMovies?page=${page}&pageSize=${PAGE_SIZE}`
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
        const uniqueMovies = Array.from(
          new Map(combined.map((m) => [m.id, m])).values()
        );
        return uniqueMovies;
      });
      setHasMore(moviesArray.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Replacement mechanism: When an image fails, add its movie ID to a queue
  // and then fetch a batch of replacement movies from page 1.
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

  // Setup infinite scrolling via IntersectionObserver.
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

  // Fetch movies whenever currentPage changes.
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

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
        <div className={styles.moviesGrid}>
          {movies.map((movie) => (
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
