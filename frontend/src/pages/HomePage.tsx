"use client";
import React from "react";
import styles from "./HomePage.module.css";
import ExtHeader from "../components/ExternalNavBar";
import HeroSection from "../components/homePage/HeroSection";
import CategorySection from "../components/homePage/CategorySection";
import Footer from "../components/Footer";
import CookieConsentBanner from "../components/CookieConsentBanner";

const CineNiche: React.FC = () => {
  return (

    <div className={styles.container}>
      <ExtHeader />
      <HeroSection />
      <CategorySection />
      <CookieConsentBanner />
      <Footer />
    </div>
  );
};

export default CineNiche;
