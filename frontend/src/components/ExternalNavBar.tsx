import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExternalNavBar.module.css";
import { LogoIcon } from "./homePage/Icons"; // adjust path if needed

const ExternalNavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      {/* Left Side - Logo */}
      <Link to="/" className={styles.logoContainer}>
        <LogoIcon />
        <span>CineNiche</span>
      </Link>

      {/* Right Side - Actions */}
      <div className={styles.actions}>
        <Link to="/signin" className={styles.actionButton}>
          Sign In
        </Link>
        <Link to="/signup" className={styles.actionButton}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default ExternalNavBar;
