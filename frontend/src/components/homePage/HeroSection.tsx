"use client";
import React from "react";
import styles from "./HeroSection.module.css";
import { PlayIcon } from "./Icons";
import MovieGrid from "./MovieGrid";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <MovieGrid />

      <div className={styles.topGradient} />
      <div className={styles.bottomGradient} />

      <div className={styles.heroContent}>
        <h2 className={styles.heroTitle}>The Best Streaming Experience</h2>
        <p className={styles.heroDescription}>
          CineNiche is the ultimate streaming experience for discovering and
          enjoying unique, hard-to-find movies and shows—anytime, anywhere. Our
          platform is built for true film lovers, featuring hand-curated content
          including cult classics, indie gems, global cinema, niche
          documentaries, and hidden favorites you won't find on mainstream
          services.
        </p>
        <button className={styles.ctaButton}>
          <PlayIcon />
          <span className={styles.ctaText}>Start Watching Now</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
