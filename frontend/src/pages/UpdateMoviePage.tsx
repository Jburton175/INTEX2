import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateMoviePage.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { fetchOneMovie, UpdateMovie } from "../api/API";
import { Movies } from "../types/Movies";
import AuthorizeView from "../components/AuthorizeView";
const UpdateMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movieData, setMovieData] = useState<Movies | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  useEffect(() => {
    if (!show_id) return;
    const fetchMovie = async () => {
      try {
        const movie = await fetchOneMovie(show_id);
        console.log(":white_check_mark: Movie loaded:", movie);
        setMovieData(movie.movie);
      } catch (err) {
        console.error(":x: Failed to load movie:", err);
        setErrorMsg("Failed to fetch movie. Redirecting...");
        setTimeout(() => navigate("/admin"), 2500);
      }
    };
    fetchMovie();
  }, [show_id]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovieData((prev) => (prev ? { ...prev, [name]: value } : null));
  };
  const handleUpdate = async () => {
    if (!movieData) return;
    try {
      const updated = await UpdateMovie(movieData.show_id, movieData);
      console.log(":white_check_mark: Movie updated:", updated);
      navigate("/admin");
    } catch (err) {
      console.error(":x: Error updating:", err);
      setErrorMsg("Failed to update movie.");
    }
  };
  const handleConfirmDelete = () => {
    console.log("Deleting movie:", movieData?.show_id);
    setShowDeleteConfirmation(false);
    navigate("/admin");
  };
  const handleGoBack = () => navigate("/admin");
  if (errorMsg) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{errorMsg}</p>
        <button onClick={handleGoBack}>Return to Admin</button>
      </div>
    );
  }
  if (!movieData) return <div>Loading...</div>;
  return (
    <AuthorizeView>
      <div className={styles.updateMoviePage}>
        <Header selectedType={"Movie"} onTypeChange={() => {}} />
        {showDeleteConfirmation && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
              <div className={styles.modalContent}>
                <div className={styles.modalMessage}>
                  Are you sure you want to delete?
                  <div className={styles.modalSubtext}>
                    (This action cannot be undone)
                  </div>
                </div>
                <div className={styles.modalButtons}>
                  <button onClick={() => setShowDeleteConfirmation(false)}>
                    Cancel
                  </button>
                  <button onClick={handleConfirmDelete}>Confirm</button>
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
                {[
                  "type",
                  "title",
                  "director",
                  "cast",
                  "rating",
                  "duration",
                  "country",
                ].map((field) => (
                  <div className={styles.formGroup} key={field}>
                    <label className={styles.formLabel}>
                      {field[0].toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={(movieData as any)[field] || ""}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder={field}
                    />
                  </div>
                ))}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Release Year</label>
                  <input
                    type="number"
                    name="release_year"
                    value={movieData.release_year || ""}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Description</label>
                  <textarea
                    name="description"
                    value={movieData.description || ""}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                  />
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setShowDeleteConfirmation(true)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthorizeView>
  );
};
export default UpdateMoviePage;
