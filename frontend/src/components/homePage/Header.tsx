import React from "react";
import styles from "./Header.module.css";
import { LogoIcon, BellIcon } from "./Icons";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brandContainer}>
        <LogoIcon />
        <h1 className={styles.brandName}>CineNiche</h1>
      </div>

      <nav className={styles.navigation}>
        <div className={styles.navTabs}>
          <button className={styles.activeTab}>Home</button>
          <span className={styles.tabLabel}>Movies &amp; Shows</span>
        </div>
      </nav>

      <button className={styles.notificationButton} aria-label="Notifications">
        <BellIcon />
      </button>
    </header>
  );
};

export default Header;
