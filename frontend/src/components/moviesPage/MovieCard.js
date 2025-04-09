import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./MovieCard.module.css";
const MovieCard = ({ movie, onImageError, onClick }) => {
    const [loaded, setLoaded] = useState(false);
    return (_jsxs("div", { className: styles.card, onClick: onClick, children: [" ", !loaded && (_jsx("div", { className: styles.placeholder, children: _jsx("div", { className: styles.spinner }) })), _jsx("img", { src: movie.image, alt: movie.title, className: styles.image, onLoad: () => setLoaded(true), onError: () => {
                    onImageError(movie.id);
                    setLoaded(true);
                }, style: { display: loaded ? "block" : "none" } }), _jsxs("div", { className: styles.info, children: [_jsx("h3", { className: styles.title, children: movie.title }), _jsx("p", { className: styles.duration, children: movie.duration })] })] }));
};
export default MovieCard;
