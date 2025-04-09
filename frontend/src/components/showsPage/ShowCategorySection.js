import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import styles from "./ShowCategorySection.module.css";
import ShowCard from "./ShowCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
const ShowCategorySection = ({ title, shows, type, }) => {
    // State to track active indicator
    const [activeIndex, setActiveIndex] = React.useState(0);
    // Handle navigation
    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1));
    };
    const handleNext = () => {
        setActiveIndex((prev) => (prev === 3 ? 3 : prev + 1));
    };
    return (_jsxs("div", { className: styles.categorySection, children: [_jsxs("div", { className: styles.categoryHeader, children: [_jsx("h2", { className: styles.categoryTitle, children: title }), _jsxs("div", { className: styles.navigationControls, children: [_jsx("button", { className: styles.navButton, onClick: handlePrev, children: _jsx(ChevronLeft, { size: 24 }) }), _jsx("div", { className: styles.indicators, children: [0, 1, 2, 3].map((index) => (_jsx("div", { className: `${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ""}` }, index))) }), _jsx("button", { className: styles.navButton, onClick: handleNext, children: _jsx(ChevronRight, { size: 24 }) })] })] }), _jsx("div", { className: styles.showsGrid, children: shows.map((show) => (_jsx(ShowCard, { image: show.image, duration: show.duration, rating: show.rating, seasons: show.seasons, type: type }, show.id))) })] }));
};
export default ShowCategorySection;
