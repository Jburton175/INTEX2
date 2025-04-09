import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddMoviePage.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";

interface MovieData {
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

const AddMoviePage: React.FC = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState<MovieData>({
    type: "",
    title: "",
    director: "",
    cast: "",
    releaseYear: "",
    rating: "",
    duration: "",
    description: "",
    genre: "",
    image: "",
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

  const handleAdd = () => {
    // In a real application, this would send an API request to create the movie
    console.log("Adding new movie:", movieData);
    // Navigate back to admin page after successful creation
    navigate("/admin");
  };

  const handleCancel = () => {
    // Navigate back to admin page without saving
    navigate("/admin");
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  return (
    <div className={styles.addMoviePage}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <button className={styles.backButton} onClick={handleGoBack}>
            <ArrowLeft size={32} />
          </button>
          <h1 className={styles.pageTitle}>Manage Movies</h1>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Add Movie</h2>

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

              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  name="description"
                  value={movieData.description}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Description"
                />
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button className={styles.addButton} onClick={handleAdd}>
                Add
              </button>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddMoviePage;
