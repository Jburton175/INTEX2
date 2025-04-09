"use client";
import React from "react";
import styles from "./HomePage.module.css";
import Header from "../components/TopNavBar";
import HeroSection from "../components/homePage/HeroSection";
import CategorySection from "../components/homePage/CategorySection";
import Footer from "../components/Footer";

const CineNiche: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header selectedType={"Movie"} onTypeChange={function (type: "Movie" | "TV Show"): void {
        throw new Error("Function not implemented.");
      } } />
      <HeroSection />
      <CategorySection />
      <Footer />
    </div>
  );
};

export default CineNiche;

