import React from "react";
import TopNavBar from "../components/TopNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";
// Make sure this CSS contains your theme overrides
// import "../components/HomePage.css";

function HomePage() {
  return (
        <>
            <TopNavBar />
            <p>Hello</p>
            <CookieConsentBanner />
        </>
  );
}

export default HomePage;
