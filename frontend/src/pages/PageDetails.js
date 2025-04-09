import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./PageDetails.module.css"; // Add styling for your page details
// Define the utility function locally
const generateImageURL = (title) => {
    // Example transformation: replace spaces with underscores and lowercase the title
    const formattedTitle = title.replace(/\s+/g, "_").toLowerCase();
    return `https://your-image-service.com/images/${formattedTitle}.jpg`;
};
const PageDetails = ({ showId, onClose }) => {
    const [movieDetails, setMovieDetails] = useState(null); // Type appropriately
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetMovieDetails?showId=${showId}`);
                const data = await res.json();
                setMovieDetails(data);
            }
            catch (err) {
                console.error("Failed to load movie details:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [showId]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (!movieDetails) {
        return _jsx("div", { children: "No details available" });
    }
    return (_jsxs("div", { className: styles.pageDetails, children: [_jsx("button", { onClick: onClose, className: styles.closeButton, children: "Close" }), _jsx("h1", { className: styles.movieTitle, children: movieDetails.title }), _jsx("img", { src: generateImageURL(movieDetails.title), alt: movieDetails.title, className: styles.movieImage }), _jsxs("div", { className: styles.movieDescription, children: [_jsx("p", { children: movieDetails.description }), _jsxs("p", { children: [_jsx("strong", { children: "Release Date:" }), " ", movieDetails.release_date] }), _jsxs("p", { children: [_jsx("strong", { children: "Rating:" }), " ", movieDetails.rating] }), _jsxs("p", { children: [_jsx("strong", { children: "Duration:" }), " ", movieDetails.duration, " minutes"] })] })] }));
};
export default PageDetails;
