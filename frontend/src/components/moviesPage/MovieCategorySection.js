import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./MovieCategorySection.module.css";
import MovieCard from "./MovieCard"; // Ensure import is correct
const BASE_SECTION_SIZE = 14; // Initial section size
const MovieCategorySection = ({ title, movies, type, onImageError, onMovieClick, }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [sectionSize, setSectionSize] = useState(BASE_SECTION_SIZE); // Dynamic section size
    // Pad the movies array so it fits the current section size
    const paddedMovies = movies.length % sectionSize === 0
        ? movies
        : [
            ...movies,
            ...Array(sectionSize - (movies.length % sectionSize)).fill(null),
        ];
    const totalPages = Math.ceil(paddedMovies.length / sectionSize);
    useEffect(() => {
        console.log(`[${title}] Movies length: ${movies.length} (padded to ${paddedMovies.length}) | SECTION_SIZE: ${sectionSize} | Total Pages: ${totalPages}`);
        console.log(`[${title}] Current Page: ${currentPage}`);
    }, [movies.length, paddedMovies.length, currentPage, totalPages, title, sectionSize]);
    const canGoLeft = currentPage > 0;
    const canGoRight = currentPage < totalPages - 1;
    const handlePrev = () => {
        if (canGoLeft) {
            const newPage = currentPage - 1;
            console.log(`[${title}] Going left: Changing page from ${currentPage} to ${newPage}`);
            setCurrentPage(newPage);
        }
    };
    const handleNext = () => {
        if (canGoRight) {
            const newPage = currentPage + 1;
            console.log(`[${title}] Going right: Changing page from ${currentPage} to ${newPage}`);
            setCurrentPage(newPage);
            // Increase the section size by 7 when the user clicks next
            setSectionSize(prevSize => prevSize + 7);
        }
    };
    const startIndex = currentPage * sectionSize;
    const visibleMovies = paddedMovies.slice(startIndex, startIndex + sectionSize);
    return (_jsxs("div", { className: styles.categorySection, children: [_jsx("h2", { className: styles.categoryTitle, children: title }), _jsxs("div", { className: styles.carouselContainer, children: [canGoLeft && (_jsx("div", { className: styles.arrowLeft, onClick: handlePrev, children: _jsx("span", { className: styles.arrowIcon, children: "\u2039" }) })), _jsx("div", { className: styles.carouselViewport, children: _jsx("div", { className: styles.carouselInner, style: {
                                transform: `translateX(-${currentPage * 100}%)`,
                                transition: "transform 0.5s ease-in-out",
                            }, children: visibleMovies.map((movie, index) => (_jsx("div", { className: styles.cardWrapper, children: movie ? (_jsx(MovieCard, { movie: movie, onImageError: onImageError, onClick: () => onMovieClick(movie.id) })) : (_jsx("div", { className: styles.cardPlaceholder, children: _jsx("div", { className: styles.placeholder, children: _jsx("div", { className: styles.spinner }) }) })) }, movie ? movie.id : `placeholder-${index}`))) }) }), canGoRight && (_jsx("div", { className: styles.arrowRight, onClick: handleNext, children: _jsx("span", { className: styles.arrowIcon, children: "\u203A" }) }))] })] }));
};
export default MovieCategorySection;
