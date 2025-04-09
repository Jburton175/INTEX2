import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PageDetails.module.css";

interface MovieData {
  show_id: string;
  title: string;
  duration_minutes_movies?: number;
  release_year?: number;
  rating?: string;
  // ...any other fields
}

const generateImageURL = (title: string) =>
  `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;

const PageDetails: React.FC = () => {
  const { show_id } = useParams<{ show_id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!show_id) return;

    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetOneMovie?show_id=${show_id}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching single movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [show_id]);

  if (loading) {
    return <div className={styles.overlay}>Loading...</div>;
  }

  if (!movie) {
    return <div className={styles.overlay}>Movie details not found.</div>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {/* Poster on the left */}
        <img
          className={styles.poster}
          src={generateImageURL(movie.title)}
          alt={movie.title}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/300x450?text=No+Image";
          }}
        />

        {/* Details on the right */}
        <div className={styles.details}>
          {/* Movie info */}
          <div className={styles.info}>
            <br /> <br />
            <br /> <br />
            <h1>{movie.title}</h1>
            <p>Duration: {movie.duration_minutes_movies} minutes</p>
            <p>Release Year: {movie.release_year}</p>
            <p>Rating: {movie.rating}</p>
          </div>

          {/* Button at the bottom */}
          <div className={styles.buttonContainer}>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetails;
