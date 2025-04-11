import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PageDetails.module.css";
import MovieRating from "../components/MovieRating";
import TopNavBar from "../components/TopNavBar";
import { Movie } from "../components/moviesPage/MovieCard";
import AuthorizeView from "../components/AuthorizeView";
import ShareMovieButton from "../components/ShareMovieButton";

interface MovieData {
  show_id: string;
  type?: string;
  title?: string;
  director?: string;
  cast?: string;
  country?: string;
  release_year?: number;
  rating?: string;
  duration?: string;
  description?: string;

  // Genres
  Action?: number;
  Adventure?: number;
  AnimeSeriesInternationalTVShows?: number;
  BritishTVShowsDocuseriesInternationalTVShows?: number;
  Children?: number;
  Comedies?: number;
  ComediesDramasInternationalMovies?: number;
  ComediesInternationalMovies?: number;
  ComediesRomanticMovies?: number;
  CrimeTVShowsDocuseries?: number;
  Documentaries?: number;
  DocumentariesInternationalMovies?: number;
  Docuseries?: number;
  Dramas?: number;
  DramasInternationalMovies?: number;
  DramasRomanticMovies?: number;
  FamilyMovies?: number;
  Fantasy?: number;
  HorrorMovies?: number;
  InternationalMoviesThrillers?: number;
  InternationalTVShowsRomanticTVShowsTVDramas?: number;
  KidsTV?: number;
  LanguageTVShows?: number;
  Musicals?: number;
  NatureTV?: number;
  RealityTV?: number;
  Spirituality?: number;
  TVAction?: number;
  TVComedies?: number;
  TVDramas?: number;
  TalkShowsTVComedies?: number;
  Thrillers?: number;
  duration_minutes_movies?: number;
  duration_in_seasons?: number;
}

interface Recommendation {
  recommended_show_id: string;
  recommended_title: string;
}

const PageDetails: React.FC = () => {
  const { show_id } = useParams<{ show_id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingRec, setLoadingRec] = useState(true);

  // Generate image URL based on title.
  const getImageUrl = (title: string | undefined) => {
    const safeTitle = (
      title && title.trim() ? title : "myDefaultImage"
    ).replace(/['’:\-.!?–&()]/g, "");
    return `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(safeTitle)}.jpg`;
  };

  // onError: fallback to a local image if blob not found.
  const handleImageError = async (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = e.currentTarget as HTMLImageElement;
    const imageUrl = imgElement.src;
    try {
      // Check if the blob image exists by performing a HEAD request.
      const headRes = await fetch(imageUrl, { method: "HEAD" });
      if (!headRes.ok) {
        // The blob link is invalid—fetch a replacement movie.
        const replacement = await fetchReplacementMovie();
        if (replacement) {
          setMovie(replacement);
          // Update the image source using the replacement movie's title.
          imgElement.src = getImageUrl(replacement.title);
        } else {
          // Fallback to a default image if no replacement is available.
          imgElement.src = "/default.jpg";
        }
      }
    } catch (err) {
      console.error("Error checking blob link:", err);
      imgElement.src = "/default.jpg";
    }
  };

  useEffect(() => {
    if (show_id) {
      // Fetch main movie data.
      fetch(
        `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetOneMovie?show_id=${show_id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setLoadingMovie(false);
        })
        .catch((err) => {
          console.error("Error fetching movie:", err);
          setLoadingMovie(false);
        });

      // Fetch recommendations.
      fetch(
        `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetOneMovieRecommendation?show_id=${show_id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRecommendations(data);
          setLoadingRec(false);
        })
        .catch((err) => {
          console.error("Error fetching recommendations:", err);
          setLoadingRec(false);
        });
    }
  }, [show_id]);

  if (loadingMovie) return <div>Loading movie...</div>;
  if (!movie) return <div>No movie data found.</div>;

  // This function attempts to fetch a replacement movie.
  // You can use a dedicated endpoint or pick one from your recommendations.
  const fetchReplacementMovie = async (): Promise<Movie | null> => {
    try {
      const res = await fetch(
        "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetRandomMovie"
      );
      if (!res.ok) return null;

      const data = await res.json();
      const movie = Array.isArray(data) ? data[0] : data;

      return {
        id: movie.show_id,
        show_id: movie.show_id,
        title: movie.title,
        duration: `${Math.floor((movie.duration_minutes_movies ?? 90) / 60)}h ${(movie.duration_minutes_movies ?? 90) % 60}min`,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1), // <-- now a string!
        image: `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(
          (movie.title || "default-title").replace(/['’:\-.!?–&()]/g, "")
        )}.jpg`,
        releaseDate: `April ${movie.release_year}`,
        genres: [], // optional
      };
    } catch (err) {
      console.error("Error fetching replacement movie:", err);
      return null;
    }
  };

  return (
    <AuthorizeView>
      <div className={styles.overlay}>
        <TopNavBar
          selectedType={"Movie"}
          onTypeChange={function (_type: "Movie" | "TV Show"): void {
            throw new Error("Function not implemented.");
          }}
        />
        {/* Main Content: Poster and movie details */}
        <div className={styles.content}>
          <img
            className={styles.poster}
            src={getImageUrl(movie.title)}
            onError={handleImageError}
            alt={movie.title}
          />
          <div className={styles.details}>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <ul>
              <li>
                <strong>Director:</strong> {movie.director}
              </li>
              <li>
                <strong>Cast:</strong> {movie.cast}
              </li>
              <li>
                <strong>Country:</strong> {movie.country}
              </li>
              <li>
                <strong>Release Year:</strong> {movie.release_year}
              </li>
              <li>
                <strong>Rating:</strong> {movie.rating}
              </li>
              <li>
                <strong>Duration:</strong> {movie.duration}
              </li>
            </ul>
            <button onClick={() => navigate("/movies")}>Back to Home</button>
          </div>
          <MovieRating
            show_id={movie.show_id}
            movieId={movie.show_id}
            initialUserRating={0} // Change if you have real data
            initialAverageRating={0} // Change if you have real data
            onRatingUpdate={(newRating) => {
              // Update local state if desired
              setMovie((prev) =>
                prev ? { ...prev, user_rating: newRating } : null
              );
            }}
          />
          {movie?.title && <ShareMovieButton title={movie.title} />}
        </div>

        {/* Recommendations Section and MovieRating */}
        <div className={styles.recommendationsContainer}>
          <h2>Recommendations</h2>
          <div>
            {loadingRec ? (
              <div>Loading recommendations...</div>
            ) : recommendations.length > 0 ? (
              <>
                <div className={styles.recommendationsList}>
                  {recommendations.slice(0, 5).map((rec, idx) => (
                    <div
                      key={`${rec.recommended_show_id}-${idx}`}
                      className={styles.recommendationItem}
                      onClick={() =>
                        navigate(`/movie/${rec.recommended_show_id}`)
                      }
                    >
                      <img
                        className={styles.poster}
                        src={getImageUrl(rec.recommended_title)}
                        onError={handleImageError}
                        alt={rec.recommended_title}
                      />

                      <div className={styles.recommendationOverlay}>
                        <p>{rec.recommended_title}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Wrap MovieRating inside its own container */}
                <div className={styles.movieRatingContainer}></div>
              </>
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        </div>
      </div>
    </AuthorizeView>
  );
};

export default PageDetails;
