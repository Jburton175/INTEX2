import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PageDetails.module.css";

interface MovieData {
  show_id: string;
  title: string;
  description: string;
  // Additional fields from your debug data
  horrorMovies: number;
  internationalMoviesThrillers: number;
  // Add other fields as needed
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

  const getImageUrl = (title: string | undefined) => {
    const safeTitle = (title && title.trim() ? title : "myDefaultImage")
      .replace(/['’:\-.!?–&()]/g, "");
    return `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(safeTitle)}.jpg`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/default.jpg";
  };

  useEffect(() => {
    if (show_id) {
      // Fetch main movie data
      fetch(`https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetOneMovie?show_id=${show_id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setLoadingMovie(false);
        })
        .catch((err) => {
          console.error("Error fetching movie:", err);
          setLoadingMovie(false);
        });

      // Fetch recommendations
      fetch(`https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/intex/GetOneMovieRecommendation?show_id=${show_id}`)
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

  return (
    <div className={styles.overlay}>
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
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>

      {/* Recommendations Section */}
      <div style={{ width: "80%", marginBottom: "2rem" }}>
        <h2 style={{ color: "white" }}>Recommendations</h2>
        {loadingRec ? (
          <div style={{ color: "white" }}>Loading recommendations...</div>
        ) : recommendations.length > 0 ? (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {recommendations.slice(0, 5).map((rec, idx) => (
              <div
                key={`${rec.recommended_show_id}-${idx}`}
                style={{ textAlign: "center", minWidth: "150px", cursor: "pointer" }}
                onClick={() => navigate(`/movie/${rec.recommended_show_id}`)}
              >
                <img
                  className={styles.poster}
                  src={getImageUrl(rec.recommended_title)}
                  onError={handleImageError}
                  alt={rec.recommended_title}
                  style={{
                    width: "150px",
                    height: "225px",
                    objectFit: "cover",
                    objectPosition: "center",
                    marginBottom: "0.5rem"
                  }}
                />
                <p style={{ color: "white" }}>{rec.recommended_title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "white" }}>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default PageDetails;