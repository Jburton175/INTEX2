"use client";
import React from "react";
import styles from "./CineNiche.module.css";
import Header from "../components/TopNavBar";
import Footer from "../components/Footer";
import HeroSection from "../components/homePage/HeroSection";
import CategorySection from "../components/homePage/CategorySection";

const CineNiche: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <HeroSection />

      <CategorySection />
      <Footer />
    </div>
  );
};

export default CineNiche;
