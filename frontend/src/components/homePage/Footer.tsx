import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <hr className={styles.divider} />
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            @2025 CineNiche, All Rights Reserved
          </p>
          <div className={styles.policyLinks}>
            <button className={styles.policyLink}>Privacy Policy</button>
            <div className={styles.separator} />
            <button className={styles.policyLink}>Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
