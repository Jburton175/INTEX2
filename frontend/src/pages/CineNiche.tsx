"use client";
import React from "react";
import styles from "./CineNiche.module.css";
import Header from "./Header";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import Footer from "./Footer";

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
