"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./HeroSection.module.css";
import { PlayIcon } from "./Icons";
import MovieGrid from "./MovieGrid";
const HeroSection = () => {
    return (_jsxs("section", { className: styles.heroSection, children: [_jsx(MovieGrid, {}), _jsx("div", { className: styles.topGradient }), _jsx("div", { className: styles.bottomGradient }), _jsxs("div", { className: styles.heroContent, children: [_jsx("h2", { className: styles.heroTitle, children: "The Best Streaming Experience" }), _jsx("p", { className: styles.heroDescription, children: "CineNiche is the ultimate streaming experience for discovering and enjoying unique, hard-to-find movies and shows\u2014anytime, anywhere. Our platform is built for true film lovers, featuring hand-curated content including cult classics, indie gems, global cinema, niche documentaries, and hidden favorites you won't find on mainstream services." }), _jsxs("a", { href: "/signin", className: styles.ctaButton, children: [_jsx(PlayIcon, {}), _jsx("span", { className: styles.ctaText, children: "Start Watching Now" })] })] })] }));
};
export default HeroSection;
