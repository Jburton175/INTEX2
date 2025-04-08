import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateMoviePage.module.css";
import Header from "../components/homePage/Header";
import Footer from "../components/homePage/Footer";
import { ArrowLeft } from "lucide-react";

interface MovieData {
  id: string;
  type: string;
  title: string;
  director: string;
  cast: string;
  releaseYear: string;
  rating: string;
  duration: string;
  description: string;
  genre: string;
  image?: string;
}

const UpdateMoviePage: React.FC = () => {
  const navigate = useNavigate();

  // In a real application, this would come from a route parameter or context
  // For now, we'll use mock data
  const [movieData, setMovieData] = useState<MovieData>({
    id: "1",
    type: "Movie",
    title: "The Cinematic Experience",
    director: "Jane Director",
    cast: "Actor One, Actor Two, Actor Three",
    releaseYear: "2023",
    rating: "8.5",
    duration: "2h 15m",
    description:
      "A groundbreaking film that explores the boundaries of cinema.",
    genre: "Drama, Thriller",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7d070b596a99677bef7f541f0efac5e7a0f3a1af",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // In a real application, this would send an API request to update the movie
    console.log("Updating movie:", movieData);
    // Navigate back to admin page after successful update
    navigate("/admin");
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    // In a real application, this would send an API request to delete the movie
    console.log("Deleting movie:", movieData.id);
    setShowDeleteConfirmation(false);
    // Navigate back to admin page after successful deletion
    navigate("/admin");
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  return (
    <div className={styles.updateMoviePage}>
      <Header />

      {showDeleteConfirmation && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              <div className={styles.modalMessage}>
                <div>Are you sure you want to delete?</div>
                <div className={styles.modalSubtext}>
                  (this action cannot be undone)
                </div>
              </div>
              <div className={styles.modalButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className={styles.confirmButton}
                  onClick={handleConfirmDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <button className={styles.backButton} onClick={handleGoBack}>
            <ArrowLeft size={32} />
          </button>
          <h1 className={styles.pageTitle}>Manage Movies</h1>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Update Movie</h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Type</label>
                <input
                  type="text"
                  name="type"
                  value={movieData.type}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Type"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={movieData.title}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Title"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Director</label>
                <input
                  type="text"
                  name="director"
                  value={movieData.director}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Director"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cast</label>
                <input
                  type="text"
                  name="cast"
                  value={movieData.cast}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Cast"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Release Year</label>
                <input
                  type="text"
                  name="releaseYear"
                  value={movieData.releaseYear}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Release Year"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Rating</label>
                <input
                  type="text"
                  name="rating"
                  value={movieData.rating}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Rating"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={movieData.duration}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Duration"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  name="description"
                  value={movieData.description}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Description"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={movieData.genre}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Genre"
                />
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button className={styles.updateButton} onClick={handleUpdate}>
                Update
              </button>
              <button className={styles.deleteButton} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpdateMoviePage;
