import React, { useEffect, useState } from "react";
import styles from "./PageDetails.module.css"; // Add styling for your page details

interface PageDetailsProps {
  showId: string;
  onClose: () => void; // Callback to close the details page
}

// Define the utility function locally
const generateImageURL = (title: string): string => {
  // Example transformation: replace spaces with underscores and lowercase the title
  const formattedTitle = title.replace(/\s+/g, "_").toLowerCase();
  return `https://your-image-service.com/images/${formattedTitle}.jpg`;
};

const PageDetails: React.FC<PageDetailsProps> = ({ showId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState<any>(null); // Type appropriately
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetMovieDetails?showId=${showId}`
        );
        const data = await res.json();
        setMovieDetails(data);
      } catch (err) {
        console.error("Failed to load movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [showId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetails) {
    return <div>No details available</div>;
  }

  return (
    <div className={styles.pageDetails}>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
      <h1 className={styles.movieTitle}>{movieDetails.title}</h1>
      <img
        src={generateImageURL(movieDetails.title)} // Use the image generation logic
        alt={movieDetails.title}
        className={styles.movieImage}
      />
      <div className={styles.movieDescription}>
        <p>{movieDetails.description}</p>
        <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
        <p><strong>Rating:</strong> {movieDetails.rating}</p>
        <p><strong>Duration:</strong> {movieDetails.duration} minutes</p>
      </div>
    </div>
  );
};

export default PageDetails;
