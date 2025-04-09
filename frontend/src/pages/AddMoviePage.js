import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddMoviePage.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
const AddMoviePage = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
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
    const handleInputChange = (e) => {
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
    return (_jsxs("div", { className: styles.addMoviePage, children: [_jsx(Header, { selectedType: "Movie", onTypeChange: function (type) {
                    throw new Error("Function not implemented.");
                } }), _jsxs("main", { className: styles.mainContent, children: [_jsxs("div", { className: styles.pageHeader, children: [_jsx("button", { className: styles.backButton, onClick: handleGoBack, children: _jsx(ArrowLeft, { size: 32 }) }), _jsx("h1", { className: styles.pageTitle, children: "Manage Movies" })] }), _jsx("div", { className: styles.formContainer, children: _jsxs("div", { className: styles.formWrapper, children: [_jsx("h2", { className: styles.formTitle, children: "Add Movie" }), _jsxs("div", { className: styles.formGrid, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Type" }), _jsx("input", { type: "text", name: "type", value: movieData.type, onChange: handleInputChange, className: styles.formInput, placeholder: "Type" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Title" }), _jsx("input", { type: "text", name: "title", value: movieData.title, onChange: handleInputChange, className: styles.formInput, placeholder: "Title" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Director" }), _jsx("input", { type: "text", name: "director", value: movieData.director, onChange: handleInputChange, className: styles.formInput, placeholder: "Director" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Cast" }), _jsx("input", { type: "text", name: "cast", value: movieData.cast, onChange: handleInputChange, className: styles.formInput, placeholder: "Cast" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Release Year" }), _jsx("input", { type: "text", name: "releaseYear", value: movieData.releaseYear, onChange: handleInputChange, className: styles.formInput, placeholder: "Release Year" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Rating" }), _jsx("input", { type: "text", name: "rating", value: movieData.rating, onChange: handleInputChange, className: styles.formInput, placeholder: "Rating" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Duration" }), _jsx("input", { type: "text", name: "duration", value: movieData.duration, onChange: handleInputChange, className: styles.formInput, placeholder: "Duration" })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { className: styles.formLabel, children: "Genre" }), _jsx("input", { type: "text", name: "genre", value: movieData.genre, onChange: handleInputChange, className: styles.formInput, placeholder: "Genre" })] }), _jsxs("div", { className: styles.formGroupFull, children: [_jsx("label", { className: styles.formLabel, children: "Description" }), _jsx("textarea", { name: "description", value: movieData.description, onChange: handleInputChange, className: styles.formTextarea, placeholder: "Description" })] })] }), _jsxs("div", { className: styles.buttonContainer, children: [_jsx("button", { className: styles.addButton, onClick: handleAdd, children: "Add" }), _jsx("button", { className: styles.cancelButton, onClick: handleCancel, children: "Cancel" })] })] }) })] }), _jsx(Footer, {})] }));
};
export default AddMoviePage;
