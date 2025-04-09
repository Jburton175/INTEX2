import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./MoviesPage.module.css";
import Header from "../components/TopNavBar";
import MovieCategorySection from "../components/moviesPage/MovieCategorySection";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import PageDetails from "./PageDetails";
// --- Constants ---
const PAGE_SIZE = 800; // for data loading/infinite scroll
const SECTION_SIZE = 14; // each section must display 7 movies per carousel page
const MOVIES_CACHE_KEY = "cachedMovies";
// --- Helper Functions ---
// Generate the image URL from the movie title.
const generateImageURL = (title) => `https://blobintex.blob.core.windows.net/movieimages/${encodeURIComponent(title)}.jpg`;
// Convert API movie data to our Movie interface.
const convertToMovie = (data) => {
    return data.map((movie) => {
        const durationMin = movie.duration_minutes_movies ?? 90;
        const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
        return {
            id: movie.show_id,
            show_id: movie.show_id,
            title: movie.title,
            duration: `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`,
            rating: parseFloat(rating),
            image: generateImageURL(movie.title),
            releaseDate: `April ${movie.release_year}`,
        };
    });
};
// Format genre labels by inserting spaces.
const formatGenreLabel = (raw) => raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
// --- MoviesPage Component ---
const MoviesPage = () => {
    // State declarations
    const [allMovies, setAllMovies] = useState([]);
    const [selectedType, setSelectedType] = useState("Movie");
    const [recommended, setRecommended] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [genreMovies, setGenreMovies] = useState({});
    const [pageNum, setPageNum] = useState(1);
    const [totalNumMovies, setTotalNumMovies] = useState(0);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState([]);
    const [erroredMovieIds, setErroredMovieIds] = useState(new Set());
    const sentinelRef = useRef(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null); // State to track the selected movie ID
    // Featured movie for hero section (displayed only for Movies)
    const featuredMovie = {
        title: "The Interview",
        description: "A satirical look at international relations featuring a controversial interview that turns unexpectedly.",
        image: generateImageURL("The Interview"),
    };
    // On mount, load cached movies (if any) from localStorage.
    useEffect(() => {
        const cachedData = localStorage.getItem(MOVIES_CACHE_KEY);
        if (cachedData) {
            try {
                const parsedCache = JSON.parse(cachedData);
                if (parsedCache && Array.isArray(parsedCache.allMovies)) {
                    setAllMovies(parsedCache.allMovies);
                    setTotalNumMovies(parsedCache.totalNumMovies || 0);
                    console.log("Loaded movies from cache", parsedCache.allMovies);
                }
            }
            catch (err) {
                console.error("Error parsing cached movies:", err);
            }
        }
    }, []);
    // When allMovies state changes, update the localStorage cache.
    useEffect(() => {
        localStorage.setItem(MOVIES_CACHE_KEY, JSON.stringify({ allMovies, totalNumMovies }));
    }, [allMovies, totalNumMovies]);
    // --- Data Loading ---
    // Fetch genres from API on mount.
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const resGenres = await fetch("https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetGenres");
                const genresData = await resGenres.json();
                setGenres(genresData);
                console.log("Fetched genres:", genresData);
            }
            catch (err) {
                console.error("Failed to load genres:", err);
            }
        };
        fetchGenres();
    }, []);
    // Load movies from API for a given page.
    const loadMovies = async (page) => {
        // Only fetch more movies if we have less than the SECTION_SIZE
        if (allMovies.length >= SECTION_SIZE) {
            console.log("Already reached the maximum number of movies.");
            return; // Stop loading if we already have enough movies
        }
        setLoading(true);
        try {
            const moviesUrl = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetAllMovies?pageSize=${PAGE_SIZE}&pageNum=${page}`;
            const resMovies = await fetch(moviesUrl);
            const dataMovies = await resMovies.json();
            const newMovies = dataMovies.movies ?? [];
            // Stop further calls if there are no more movies to load
            if (newMovies.length === 0 || allMovies.length >= SECTION_SIZE) {
                console.log("No more movies to load or reached SECTION_SIZE limit.");
                return; // Prevent further loading
            }
            setTotalNumMovies(dataMovies.totalNumMovies); // Update the total number of movies
            setAllMovies(prev => {
                const combined = [...prev, ...newMovies];
                const unique = Array.from(new Map(combined.map(movie => [movie.show_id, movie])).values());
                return unique;
            });
            console.log(`Loaded page ${page}:`, newMovies.map(movie => movie.title));
        }
        catch (err) {
            console.error("Failed to load movies:", err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchMoviesForEachGenre = async () => {
            for (const genre of genres) {
                let genreMovies = [];
                let page = 1;
                let attempts = 0; // To prevent infinite loops if API can't return enough data
                console.log(`Fetching movies for genre: ${genre}`);
                // Ensure at least 7 movies for each genre
                while (genreMovies.length < 7 && attempts < 5) { // Limit attempts to 5 to prevent infinite loops
                    try {
                        const moviesUrl = `https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetAllMovies?page=${page}&pageSize=8&genre=${genre}`;
                        const res = await fetch(moviesUrl);
                        if (!res.ok)
                            throw new Error("Failed to fetch movies"); // Check if the response is ok
                        const data = await res.json();
                        const newMovies = data.movies ?? [];
                        console.log(`Total movies available for genre "${genre}": ${data.totalNumMovies}`);
                        console.log(`Fetched page ${page} with ${newMovies.length} movies.`);
                        genreMovies = [...genreMovies, ...newMovies]; // Add fetched movies
                        // If no new movies are found, break the loop
                        if (newMovies.length === 0) {
                            console.log(`No more movies available for genre: ${genre}`);
                            break;
                        }
                        // Increase the page number for the next request
                        page++;
                        attempts++;
                    }
                    catch (error) {
                        console.error("Error fetching movies:", error);
                        break; // Stop fetching if there's an error
                    }
                }
                // If there are fewer than 7 movies available for that genre, we will get what we can
                setGenreMovies(prevState => ({
                    ...prevState,
                    [genre]: genreMovies.slice(0, 7), // Always limit to 7 movies per genre
                }));
            }
        };
        if (genres.length > 0) {
            fetchMoviesForEachGenre();
        }
    }, [genres]); // Trigger fetch when genres change
    // Load pages when pageNum increases.
    useEffect(() => {
        loadMovies(pageNum);
    }, [pageNum]);
    // Infinite scroll: Increase pageNum when sentinel is visible.
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting && // Check if the sentinel element is in view
                !loading && // Only trigger if not already loading
                allMovies.length < totalNumMovies // Only trigger if there are more movies to load
            ) {
                setPageNum(prev => prev + 1); // Increase pageNum for the next request
            }
        });
        const currentSentinel = sentinelRef.current;
        if (currentSentinel)
            observer.observe(currentSentinel);
        return () => {
            if (currentSentinel)
                observer.unobserve(currentSentinel);
        };
    }, [loading, allMovies, totalNumMovies]);
    // When selectedType changes, reset movies state.
    useEffect(() => {
        setAllMovies([]);
        setPageNum(1);
        setTotalNumMovies(0);
        setRecommended([]);
        setNewReleases([]);
        setGenreMovies({});
    }, [selectedType]);
    // --- Section Calculations ---
    // Get movies for the selected type.
    const moviesForType = allMovies.filter(m => {
        if (selectedType === "Movie") {
            return m.type === "Movie" && !erroredMovieIds.has(m.show_id);
        }
        else {
            return m.type && m.type.toLowerCase().includes("tv") && !erroredMovieIds.has(m.show_id);
        }
    });
    // Updated Recommended Section (pass full array so that multiple pages are rendered if available)
    useEffect(() => {
        if (moviesForType.length > 0) {
            const recsFull = convertToMovie(moviesForType);
            if (recsFull.length === 0 && moviesForType.length < totalNumMovies)
                return;
            setRecommended(recsFull);
            console.log("Recommended:", recsFull.map(m => (m ? m.title : "placeholder")));
        }
    }, [moviesForType, erroredMovieIds, totalNumMovies]);
    // Updated New Releases Section (pass full array so that multiple pages are rendered if available)
    useEffect(() => {
        if (moviesForType.length > 0) {
            const sorted = moviesForType.slice().sort((a, b) => b.release_year - a.release_year);
            const newRelFull = convertToMovie(sorted);
            if (newRelFull.length === 0 && moviesForType.length < totalNumMovies)
                return;
            setNewReleases(newRelFull);
            console.log("New Releases:", newRelFull.map(m => (m ? m.title : "placeholder")));
        }
    }, [moviesForType, erroredMovieIds, totalNumMovies]);
    // Updated Genre Grouping Effect (pass full array)
    useEffect(() => {
        const applicableGenres = genres.filter(genreKey => {
            return selectedType === "Movie"
                ? !genreKey.toLowerCase().includes("tv")
                : genreKey.toLowerCase().includes("tv");
        });
        const groups = {};
        // Combine Action and Adventure into one group "Action & Adventure"
        const actionAdventureMatches = moviesForType.filter(m => m["action"] === 1 || m["adventure"] === 1);
        const actionAdventureConverted = convertToMovie(actionAdventureMatches);
        if (actionAdventureConverted.length > 0) {
            groups["Action & Adventure"] = actionAdventureConverted;
        }
        // Now, filter out "Action" and "Adventure" individually
        applicableGenres.forEach(genreKey => {
            if (genreKey.toLowerCase() !== "action" &&
                genreKey.toLowerCase() !== "adventure") {
                const formattedGenre = formatGenreLabel(genreKey);
                const matches = moviesForType.filter(m => Object.keys(m).some(key => key.toLowerCase() === genreKey.toLowerCase() && m[key] === 1));
                const groupFull = convertToMovie(matches);
                if (groupFull.length === 0 && moviesForType.length < totalNumMovies)
                    return;
                groups[formattedGenre] = groupFull;
                console.log(`Genre "${formattedGenre}":`, groupFull.map(i => (i ? i.title : "placeholder")));
            }
        });
        setGenreMovies(groups);
    }, [moviesForType, genres, erroredMovieIds, selectedType, totalNumMovies]);
    // Callback for image load errors.
    const handleImageError = useCallback((movieId) => {
        setErroredMovieIds(prev => new Set(prev).add(movieId));
        console.log("Image error for:", movieId);
    }, []);
    const handleMovieClick = (showId) => {
        setSelectedMovieId(showId);
    };
    const handleCloseDetails = () => {
        setSelectedMovieId(null);
    };
    return (_jsxs("div", { className: styles.moviesPage, children: [_jsx(Header, { selectedType: selectedType, onTypeChange: setSelectedType }), _jsx(CookieConsentBanner, {}), _jsxs("div", { className: styles.mainContent, children: [selectedType === "Movie" && (_jsxs("div", { className: styles.heroSection, children: [_jsx("img", { src: featuredMovie.image, alt: featuredMovie.title, className: styles.heroImage, onError: (e) => {
                                    e.currentTarget.src = "https://placehold.co/200x120?text=No+Image";
                                } }), _jsxs("div", { className: styles.heroOverlay, children: [_jsx("h1", { className: styles.heroTitle, children: featuredMovie.title }), _jsx("p", { className: styles.heroDescription, children: featuredMovie.description })] })] })), _jsx("div", { className: styles.categoriesContainer, children: selectedType === "TV Show" && recommended.length === 0 ? (_jsx("div", { className: styles.categorySection, children: _jsx("h2", { className: styles.categoryTitle, children: "Shows Coming Soon!" }) })) : (_jsxs(_Fragment, { children: [_jsx(MovieCategorySection, { title: "Recommended For You", movies: recommended, type: "duration", onImageError: handleImageError, onMovieClick: handleMovieClick }), _jsx(MovieCategorySection, { title: "New Releases", movies: newReleases, type: "duration", onImageError: handleImageError, onMovieClick: handleMovieClick }), Object.entries(genreMovies).map(([genre, movies]) => (_jsx(MovieCategorySection, { title: genre, movies: movies, type: "duration", onImageError: handleImageError, onMovieClick: handleMovieClick }, genre)))] })) })] }), selectedMovieId && (_jsx(PageDetails, { showId: selectedMovieId, onClose: handleCloseDetails })), _jsx("div", { ref: sentinelRef, style: { height: "1px" } }), _jsx(Footer, {})] }));
};
export default MoviesPage;
