import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import TopNavBar from "../components/TopNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
// import "../components/HomePage.css";
function HomePage() {
    return (_jsxs(_Fragment, { children: [_jsx(TopNavBar, { selectedType: "Movie", onTypeChange: function (type) {
                    throw new Error("Function not implemented.");
                } }), _jsxs("main", { style: {
                    padding: "6rem 2rem 2rem", // Top padding accounts for navbar height
                    maxWidth: "800px",
                    margin: "0 auto",
                }, children: [_jsx("h1", { children: "Welcome to CineNiche!" }), _jsx("p", { children: "Discover unique, niche, and classic films. Your curated movie experience starts here." }), [...Array(25)].map((_, i) => (_jsxs("section", { style: { margin: "2rem 0" }, children: [_jsxs("h2", { children: ["Feature #", i + 1] }), _jsx("p", { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum pulvinar nisl, sed vehicula mauris facilisis at. Duis vitae nunc a sapien fermentum hendrerit sed non eros." })] }, i)))] }), _jsx(CookieConsentBanner, {}), _jsx(Footer, {})] }));
}
export default HomePage;
