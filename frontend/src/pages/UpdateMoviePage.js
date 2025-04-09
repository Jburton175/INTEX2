import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateMoviePage.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { fetchOneMovie, UpdateMovie } from "../api/API";
const UpdateMoviePage = () => {
    const navigate = useNavigate();
    const { show_id } = useParams();
    const [movieData, setMovieData] = useState(null);
    useEffect(() => {
        if (show_id) {
            fetchOneMovie(show_id)
                .then((data) => {
                console.log("Fetched movie data:", data); // Log to inspect the response
                // Check if data exists and is not empty
                if (data) {
                    setMovieData(data); //this has an error but it works
                }
                else {
                    console.error("No movie found with the given show_id.");
                    // Optionally handle the case where no movie is found
                }
            })
                .catch((error) => {
                console.error("Failed to fetch movie", error);
            });
        }
    }, [show_id]);
    const handleInputChange = (e) => {
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
        UpdateMovie(movieData.show_id, movieData) // Force casting
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
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { className: styles.updateMoviePage, children: [_jsx(Header, { selectedType: "Movie", onTypeChange: function (type) {
                    throw new Error("Function not implemented.");
                } }), showDeleteConfirmation && (_jsx("div", { className: styles.modalOverlay, children: _jsx("div", { className: styles.modalContainer, children: _jsxs("div", { className: styles.modalContent, children: [_jsxs("div", { className: styles.modalMessage, children: [_jsx("div", { children: "Are you sure you want to delete?" }), _jsx("div", { className: styles.modalSubtext, children: "(this action cannot be undone)" })] }), _jsxs("div", { className: styles.modalButtons, children: [_jsx("button", { className: styles.cancelButton, onClick: handleCancelDelete, children: "Cancel" }), _jsx("button", { className: styles.confirmButton, onClick: handleConfirmDelete, children: "Confirm" })] })] }) }) })), _jsxs("main", { className: styles.mainContent, children: [_jsxs("div", { className: styles.pageHeader, children: [_jsx("button", { className: styles.backButton, onClick: handleGoBack, children: _jsx(ArrowLeft, { size: 32 }) }), _jsx("h1", { className: styles.pageTitle, children: "Manage Movies" })] }), _jsx("div", { className: styles.formContainer, children: _jsxs("div", { className: styles.formWrapper, children: [_jsx("h2", { className: styles.formTitle, children: "Update Movie" }), _jsxs("div", { className: styles.formGrid, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Type" }), _jsx("input", { type: "text", name: "type", value: movieData.type || "", onChange: handleInputChange, className: styles.formInput, placeholder: "Type" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Title" }), _jsx("input", { type: "text", name: "title", value: movieData.title || "", onChange: handleInputChange, className: styles.formInput, placeholder: "Title" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Director" }), _jsx("input", { type: "text", name: "director", value: movieData.director || "", onChange: handleInputChange, className: styles.formInput, placeholder: "Director" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Cast" }), _jsx("input", { type: "text", name: "cast", value: movieData.cast || "", onChange: handleInputChange, className: styles.formInput, placeholder: "Cast" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Release Year" }), _jsx("input", { type: "number", name: "release_year", value: movieData.release_year || "", onChange: handleInputChange, className: styles.formInput, placeholder: "Release Year" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Rating" }), _jsx("input", { type: "text", name: "rating", value: movieData.rating || "", onChange: handleInputChange, className: styles.formInput, placeholder: "Rating" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Duration" }), _jsx("input", { type: "text", name: "duration", value: movieData.duration || "", onChange: handleInputChange, className: styles.formInput, placeholder: "Duration" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Description" }), _jsx("textarea", { name: "description", value: movieData.description || "", onChange: handleInputChange, className: styles.formTextarea, placeholder: "Description" })] })] }), _jsxs("div", { className: styles.buttonContainer, children: [_jsx("button", { className: styles.updateButton, onClick: handleUpdate, children: "Update" }), _jsx("button", { className: styles.deleteButton, onClick: handleDelete, children: "Delete" })] })] }) })] }), _jsx(Footer, {})] }));
};
export default UpdateMoviePage;
