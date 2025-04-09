"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./CineNiche.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import HeroSection from "../components/homePage/HeroSection";
import CategorySection from "../components/homePage/CategorySection";
const CineNiche = () => {
    return (_jsxs("div", { className: styles.container, children: [_jsx(Header, { selectedType: "Movie", onTypeChange: function (type) {
                    throw new Error("Function not implemented.");
                } }), _jsx(HeroSection, {}), _jsx(CategorySection, {}), _jsx(Footer, {})] }));
};
export default CineNiche;
