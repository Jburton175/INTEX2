import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateMoviePage.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { fetchOneMovie, UpdateMovie } from "../api/API";
import { Movies } from "../types/Movies";

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

const UpdateMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  useEffect(() => {
    if (show_id) {
      fetchOneMovie(show_id)
        .then((data) => {
          console.log("Fetched movie data:", data); // Log to inspect the response

          // Check if data exists and is not empty
          if (data) {
            setMovieData(data); //this has an error but it works
          } else {
            console.error("No movie found with the given show_id.");
            // Optionally handle the case where no movie is found
          }
        })
        .catch((error) => {
          console.error("Failed to fetch movie", error);
        });
    }
  }, [show_id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovieData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdate = () => {
    if (!movieData) {
      console.error("Movie data is not available");
      return;
    }

    console.log("Updating movie:", movieData);

    // Type assertion here
    UpdateMovie(movieData.show_id, movieData as Movies) // Force casting
      .then((updatedMovie) => {
        console.log("Movie updated successfully:", updatedMovie);
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
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
    console.log("Deleting movie:", movieData?.show_id);
    setShowDeleteConfirmation(false);
    // Navigate back to admin page after successful deletion
    navigate("/admin");
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.updateMoviePage}>
      <Header selectedType={"Movie"} onTypeChange={function (type: "Movie" | "TV Show"): void {
        throw new Error("Function not implemented.");
      } } />

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
                  value={movieData.type || ""}
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
                  value={movieData.title || ""}
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
                  value={movieData.director || ""}
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
                  value={movieData.cast || ""}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Cast"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Release Year</label>
                <input
                  type="number"
                  name="release_year"
                  value={movieData.release_year || ""}
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
                  value={movieData.rating || ""}
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
                  value={movieData.duration || ""}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Duration"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  name="description"
                  value={movieData.description || ""}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Description"
                />
              </div>
            </div>

            {/* Genres */}

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
