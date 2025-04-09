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
            <a href="/privacypolicy" className={styles.policyLink}>
              Privacy Policy
            </a>
            <div className={styles.separator} />
            <a href="/cookie" className={styles.policyLink}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
