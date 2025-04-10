import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddMoviePage.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { addMovie } from "../api/API";
import AuthorizeView from "../components/AuthorizeView";

type MovieData = {
  // Basic info
  type: string;
  title: string;
  director: string;
  cast: string;
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  description: string;

  // Genres (all as numbers)
  Action: number;
  Adventure: number;
  AnimeSeriesInternationalTVShows: number;
  BritishTVShowsDocuseriesInternationalTVShows: number;
  Children: number;
  Comedies: number;
  ComediesDramasInternationalMovies: number;
  ComediesInternationalMovies: number;
  ComediesRomanticMovies: number;
  CrimeTVShowsDocuseries: number;
  Documentaries: number;
  DocumentariesInternationalMovies: number;
  Docuseries: number;
  Dramas: number;
  DramasInternationalMovies: number;
  DramasRomanticMovies: number;
  FamilyMovies: number;
  Fantasy: number;
  HorrorMovies: number;
  InternationalMoviesThrillers: number;
  InternationalTVShowsRomanticTVShowsTVDramas: number;
  KidsTV: number;
  LanguageTVShows: number;
  Musicals: number;
  NatureTV: number;
  RealityTV: number;
  Spirituality: number;
  TVAction: number;
  TVComedies: number;
  TVDramas: number;
  TalkShowsTVComedies: number;
  Thrillers: number;

  // Duration info
  duration_minutes_movies: number;
  duration_in_seasons: number;
};

const AddMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<MovieData>({
    type: "",
    title: "",
    director: "",
    cast: "",
    country: "",
    release_year: 2000,
    rating: "",
    duration: "",
    description: "",

    // Genres
    Action: 0,
    Adventure: 0,
    AnimeSeriesInternationalTVShows: 0,
    BritishTVShowsDocuseriesInternationalTVShows: 0,
    Children: 0,
    Comedies: 0,
    ComediesDramasInternationalMovies: 0,
    ComediesInternationalMovies: 0,
    ComediesRomanticMovies: 0,
    CrimeTVShowsDocuseries: 0,
    Documentaries: 0,
    DocumentariesInternationalMovies: 0,
    Docuseries: 0,
    Dramas: 0,
    DramasInternationalMovies: 0,
    DramasRomanticMovies: 0,
    FamilyMovies: 0,
    Fantasy: 0,
    HorrorMovies: 0,
    InternationalMoviesThrillers: 0,
    InternationalTVShowsRomanticTVShowsTVDramas: 0,
    KidsTV: 0,
    LanguageTVShows: 0,
    Musicals: 0,
    NatureTV: 0,
    RealityTV: 0,
    Spirituality: 0,
    TVAction: 0,
    TVComedies: 0,
    TVDramas: 0,
    TalkShowsTVComedies: 0,
    Thrillers: 0,
    duration_minutes_movies: 0,
    duration_in_seasons: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Type assertion for checkbox

    setMovieData({
      ...movieData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setMovieData({
      ...movieData,
      [name]: checked ? 1 : 0, // Set to 1 if checked, 0 if unchecked
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Send the movie data to your backend
      const addedMovie = await addMovie(movieData);
      console.log("Movie added successfully:", addedMovie);

      // Navigate back to admin page after successful creation
      navigate("/admin");
    } catch (error) {
      console.error("Error adding movie:", error);
      setError(error instanceof Error ? error.message : "Failed to add movie");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Navigate back to admin page without saving
    navigate("/admin");
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  return (
    <AuthorizeView>
    <div className={styles.addMoviePage}>
      <Header
        selectedType={"Movie"}
        onTypeChange={function (_type: "Movie" | "TV Show"): void {
          throw new Error("Function not implemented.");
        }}
      />

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
                <label className={styles.formLabel}>Country</label>
                <input
                  type="text"
                  name="country"
                  value={movieData.country}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="country"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Release Year</label>
                <input
                  type="text"
                  name="releaseYear"
                  value={movieData.release_year}
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

            <div className={styles.genresContainer}>
              <h2 className={styles.sectionTitle}>Select Genres</h2>

              <div className={styles.genresList}>
                {/* Action */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="action"
                    name="Action"
                    checked={movieData.Action === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="action" className={styles.genreLabel}>
                    Action
                  </label>
                </div>

                {/* Adventure */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="adventure"
                    name="Adventure"
                    checked={movieData.Adventure === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="adventure" className={styles.genreLabel}>
                    Adventure
                  </label>
                </div>

                {/* Anime Series */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="anime"
                    name="AnimeSeriesInternationalTVShows"
                    checked={movieData.AnimeSeriesInternationalTVShows === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="anime" className={styles.genreLabel}>
                    Anime Series
                  </label>
                </div>

                {/* British TV Shows */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="british"
                    name="BritishTVShowsDocuseriesInternationalTVShows"
                    checked={
                      movieData.BritishTVShowsDocuseriesInternationalTVShows ===
                      1
                    }
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="british" className={styles.genreLabel}>
                    British TV Shows
                  </label>
                </div>

                {/* Children */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="children"
                    name="Children"
                    checked={movieData.Children === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="children" className={styles.genreLabel}>
                    Children
                  </label>
                </div>

                {/* Comedies */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="comedies"
                    name="Comedies"
                    checked={movieData.Comedies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="comedies" className={styles.genreLabel}>
                    Comedies
                  </label>
                </div>

                {/* Comedy Dramas (Intl) */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="comedyDramasInt"
                    name="ComediesDramasInternationalMovies"
                    checked={movieData.ComediesDramasInternationalMovies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label
                    htmlFor="comedyDramasInt"
                    className={styles.genreLabel}
                  >
                    Comedy Dramas International
                  </label>
                </div>

                {/* Comedies (Intl) */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="comedyInt"
                    name="ComediesInternationalMovies"
                    checked={movieData.ComediesInternationalMovies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="comedyInt" className={styles.genreLabel}>
                    Comedies International
                  </label>
                </div>

                {/* Comedies Romance */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="comedyRom"
                    name="ComediesRomanticMovies"
                    checked={movieData.ComediesRomanticMovies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="comedyRom" className={styles.genreLabel}>
                    Comedy Romance
                  </label>
                </div>

                {/* Crime */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="Crime"
                    name="CrimeTVShowsDocuseries"
                    checked={movieData.CrimeTVShowsDocuseries === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="Crime" className={styles.genreLabel}>
                    Crime
                  </label>
                </div>

                {/* Documentaries */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="documentaries"
                    name="Documentaries"
                    checked={movieData.Documentaries === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="documentaries" className={styles.genreLabel}>
                    Documentaries
                  </label>
                </div>

                {/* Documentaries International */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="documentariesInt"
                    name="DocumentariesInternationalMovies"
                    checked={movieData.DocumentariesInternationalMovies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label
                    htmlFor="documentariesInt"
                    className={styles.genreLabel}
                  >
                    Documentaries International
                  </label>
                </div>

                {/* Docuseries */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="Docuseries"
                    name="Docuseries"
                    checked={movieData.Docuseries === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="Docuseries" className={styles.genreLabel}>
                    Docuseries
                  </label>
                </div>

                {/* Dramas */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="dramas"
                    name="Dramas"
                    checked={movieData.Dramas === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="dramas" className={styles.genreLabel}>
                    Dramas
                  </label>
                </div>

                {/* Dramas International */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="DramasInternationalMovies"
                    name="DramasInternationalMovies"
                    checked={movieData.DramasInternationalMovies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label
                    htmlFor="DramasInternationalMovies"
                    className={styles.genreLabel}
                  >
                    Dramas International
                  </label>
                </div>

                {/* Drama Romance */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="DramasRomanticMovies"
                    name="DramasRomanticMovies"
                    checked={movieData.DramasRomanticMovies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label
                    htmlFor="DramasRomanticMovies"
                    className={styles.genreLabel}
                  >
                    Drama Romance
                  </label>
                </div>

                {/* Drama Romance INT*/}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="InternationalTVShowsRomanticTVShowsTVDramas"
                    name="InternationalTVShowsRomanticTVShowsTVDramas"
                    checked={
                      movieData.InternationalTVShowsRomanticTVShowsTVDramas ===
                      1
                    }
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label
                    htmlFor="InternationalTVShowsRomanticTVShowsTVDramas"
                    className={styles.genreLabel}
                  >
                    Drama Romance International
                  </label>
                </div>

                {/* FamilyMovies */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="familyMovies"
                    name="FamilyMovies"
                    checked={movieData.FamilyMovies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="familyMovies" className={styles.genreLabel}>
                    Family
                  </label>
                </div>

                {/* Fantasy */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="fantasy"
                    name="Fantasy"
                    checked={movieData.Fantasy === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="fantasy" className={styles.genreLabel}>
                    Fantasy
                  </label>
                </div>

                {/* Horror */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="horror"
                    name="HorrorMovies"
                    checked={movieData.HorrorMovies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="horror" className={styles.genreLabel}>
                    Horror
                  </label>
                </div>

                {/* Kids TV */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="KidsTV"
                    name="KidsTV"
                    checked={movieData.KidsTV === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="KidsTV" className={styles.genreLabel}>
                    Kids
                  </label>
                </div>

                {/* Language TV */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="LanguageTVShows"
                    name="LanguageTVShows"
                    checked={movieData.LanguageTVShows === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label
                    htmlFor="LanguageTVShows"
                    className={styles.genreLabel}
                  >
                    Language
                  </label>
                </div>

                {/* Musicals */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="Musicals"
                    name="Musicals"
                    checked={movieData.Musicals === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="Musicals" className={styles.genreLabel}>
                    Musicals
                  </label>
                </div>

                {/* NatureTV */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="NatureTV"
                    name="NatureTV"
                    checked={movieData.NatureTV === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="NatureTV" className={styles.genreLabel}>
                    Nature
                  </label>
                </div>

                {/* RealityTV */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="RealityTV"
                    name="RealityTV"
                    checked={movieData.RealityTV === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="RealityTV" className={styles.genreLabel}>
                    Reality
                  </label>
                </div>

                {/* Spirituality */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="Spirituality"
                    name="Spirituality"
                    checked={movieData.Spirituality === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="Spirituality" className={styles.genreLabel}>
                    Spirituality
                  </label>
                </div>

                {/* TV Action */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="tvAction"
                    name="TVAction"
                    checked={movieData.TVAction === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="tvAction" className={styles.genreLabel}>
                    TV Action
                  </label>
                </div>

                {/* TV Comedies */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="tvComedies"
                    name="TVComedies"
                    checked={movieData.TVComedies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="tvComedies" className={styles.genreLabel}>
                    TV Comedies
                  </label>
                </div>

                {/* TV Dramas */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="TVDramas"
                    name="TVDramas"
                    checked={movieData.TVDramas === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="TVDramas" className={styles.genreLabel}>
                    TV Dramas
                  </label>
                </div>

                {/* TalkShowsTVComedies */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="TalkShowsTVComedies"
                    name="TalkShowsTVComedies"
                    checked={movieData.TalkShowsTVComedies === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label
                    htmlFor="TalkShowsTVComedies"
                    className={styles.genreLabel}
                  >
                    Talk Shows
                  </label>
                </div>

                {/* Thrillers */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="Thrillers"
                    name="Thrillers"
                    checked={movieData.Thrillers === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label htmlFor="Thrillers" className={styles.genreLabel}>
                    Thriller
                  </label>
                </div>

                {/* InternationalMoviesThrillers */}
                <div className={styles.genreItem}>
                  <input
                    type="checkbox"
                    id="InternationalMoviesThrillers"
                    name="InternationalMoviesThrillers"
                    checked={movieData.InternationalMoviesThrillers === 1}
                    onChange={handleCheckboxChange}
                    className={styles.genreCheckbox}
                  />
                  <label
                    htmlFor="InternationalMoviesThrillers"
                    className={styles.genreLabel}
                  >
                    Thrillers International
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              {error && <div className="error-message">{error}</div>}
              <button
                className={styles.addButton}
                onClick={handleAdd}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add"}
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
    </AuthorizeView>
  );
};

export default AddMoviePage;
