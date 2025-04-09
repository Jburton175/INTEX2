import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogoIcon } from "./homePage/Icons";
import { Search } from "lucide-react";
import "./TopNavBar.css";
import "./ThemeToggle.css";
// Helper: Insert spaces between capital letters for genre labels.
const formatGenreLabel = (raw) => {
    return raw
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
};
const TopNavBar = ({ selectedType, onTypeChange }) => {
    // State for scroll behavior.
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    // State for search functionality.
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // State for genres.
    const [genres, setGenres] = useState([]);
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const genreTimeoutRef = useRef(null);
    // Hide navbar on scroll.
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setIsHidden(currentY > lastScrollY && currentY > 60);
            setLastScrollY(currentY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);
    // Fetch genres on component mount.
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch("https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetGenres");
                if (!response.ok)
                    throw new Error("Failed to fetch genres");
                const data = await response.json();
                setGenres(data);
            }
            catch (error) {
                console.error("Error fetching genres:", error);
                setGenres(["Action", "Comedy", "Drama"]);
            }
        };
        fetchGenres();
    }, []);
    // Debounce search query and call the backend SearchTitles endpoint.
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSearchResults([]);
            return;
        }
        const delayDebounce = setTimeout(async () => {
            try {
                const response = await fetch(`https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/SearchTitles?query=${encodeURIComponent(searchTerm)}`);
                if (!response.ok)
                    throw new Error("Search failed");
                const data = await response.json();
                setSearchResults(data);
            }
            catch (error) {
                console.error("Error fetching search results:", error);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);
    return (_jsxs("nav", { className: `top-navbar ${isHidden ? "hide" : ""}`, children: [_jsx("div", { className: "nav-left", children: _jsx(Link, { to: "/", className: "brand-logo", children: _jsx(LogoIcon, {}) }) }), _jsxs("div", { className: "nav-center", children: [_jsx("button", { className: `type-toggle ${selectedType === "Movie" ? "active" : ""}`, onClick: () => onTypeChange("Movie"), children: "Movies" }), _jsx("button", { className: `type-toggle ${selectedType === "TV Show" ? "active" : ""}`, onClick: () => onTypeChange("TV Show"), children: "TV Shows" })] }), _jsxs("div", { className: "nav-right", children: [_jsxs("div", { className: "nav-right-left", children: [_jsxs("div", { className: "nav-genre-dropdown-container", onMouseEnter: () => {
                                    if (genreTimeoutRef.current)
                                        clearTimeout(genreTimeoutRef.current);
                                    setIsGenreOpen(true);
                                }, onMouseLeave: () => {
                                    genreTimeoutRef.current = setTimeout(() => {
                                        setIsGenreOpen(false);
                                    }, 600);
                                }, children: [_jsx("button", { className: "nav-genre-button", children: "Genres" }), isGenreOpen && (_jsx("ul", { className: "nav-genre-dropdown", onMouseEnter: () => {
                                            if (genreTimeoutRef.current)
                                                clearTimeout(genreTimeoutRef.current);
                                            setIsGenreOpen(true);
                                        }, onMouseLeave: () => {
                                            genreTimeoutRef.current = setTimeout(() => {
                                                setIsGenreOpen(false);
                                            }, 600);
                                        }, children: genres.map((genre) => (_jsx("li", { children: _jsx("button", { className: "genre-option", children: formatGenreLabel(genre) }) }, genre))) }))] }), _jsxs("div", { className: "nav-search-container", children: [_jsxs("div", { className: "nav-search-field", children: [_jsx(Search, { size: 20, color: "gray", className: "nav-search-icon-inside" }), _jsx("input", { type: "text", className: "nav-search-input", placeholder: "Search...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), searchResults.length > 0 && (_jsx("ul", { className: "search-dropdown", children: searchResults.map((title) => (_jsx("li", { children: _jsx(Link, { to: `/movies/${encodeURIComponent(title)}`, className: "search-result", children: title }) }, title))) }))] })] }), _jsx(ThemeToggle, {})] })] }));
};
export default TopNavBar;
