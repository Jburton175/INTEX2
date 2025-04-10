import React from "react";
import styles from "./CookiePolicyPage.module.css";
import ExternalNavBar from "../components/ExternalNavBar";
import Footer from "../components/Footer";

const CookiePolicyPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <ExternalNavBar />
      <br />
      <br />
      <br />

      <main className={styles.mainContent}>
        <div className={styles.policyContainer}>
          <div className={styles.policyContent}>
            <section className={styles.introSection}>
              <h2 className={styles.policyTitle}>CineNiche Cookie Policy</h2>
              <p className={styles.policyDate}>Effective Date: April 2025</p>
              <p className={styles.policyIntro}>
                This Cookie Policy explains how CineNiche ("we," "us," or "our")
                uses cookies and similar technologies on our website to improve
                your user experience, personalize content, and ensure our
                services function securely. By continuing to use our website,
                you agree to the use of cookies as described in this policy.
              </p>
            </section>

            <section className={styles.policySection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🍪</span>
                What Are Cookies?
              </h3>
              <div className={styles.sectionContent}>
                <p>
                  Cookies are small text files stored on your device (computer,
                  smartphone, or tablet) when you visit a website. They help us
                  remember you and your preferences for future visits and allow
                  our platform to function efficiently.
                </p>
              </div>
            </section>

            <section className={styles.policySection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🔍</span>
                Why We Use Cookies
              </h3>
              <div className={styles.sectionContent}>
                <div className={styles.bulletList}>
                  <div className={styles.bulletItem}>
                    Authenticate users and keep you logged in
                  </div>
                  <div className={styles.bulletItem}>
                    Remember preferences like language, layout, and dark/light
                    mode
                  </div>
                  <div className={styles.bulletItem}>
                    Enable site functionality, such as scrolling behavior and
                    carousel animations
                  </div>
                  <div className={styles.bulletItem}>
                    Track usage for analytics and site improvement
                  </div>
                  <div className={styles.bulletItem}>
                    Support security, such as preventing fraudulent access and
                    abuse
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.policySection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>📋</span>
                Types of Cookies We Use
              </h3>
              <div className={styles.sectionContent}>
                <div className={styles.cookieTypeContainer}>
                  <div className={styles.cookieType}>
                    <div className={styles.cookieTypeName}>
                      Strictly Necessary Cookies
                    </div>
                    <div className={styles.cookieTypeDescription}>
                      Required for core functionality like login and page
                      security
                    </div>
                    <div className={styles.cookieTypeDuration}>
                      Duration: Session or short-term
                    </div>
                  </div>
                  <div className={styles.cookieType}>
                    <div className={styles.cookieTypeName}>
                      Preference Cookies
                    </div>
                    <div className={styles.cookieTypeDescription}>
                      Save your settings and preferences (e.g., page view mode,
                      genre filters)
                    </div>
                    <div className={styles.cookieTypeDuration}>
                      Duration: Up to 1 year
                    </div>
                  </div>
                  <div className={styles.cookieType}>
                    <div className={styles.cookieTypeName}>
                      Analytics Cookies
                    </div>
                    <div className={styles.cookieTypeDescription}>
                      Help us understand how users navigate and use CineNiche
                      (e.g., most watched movies, click rates)
                    </div>
                    <div className={styles.cookieTypeDuration}>
                      Duration: Varies
                    </div>
                  </div>
                  <div className={styles.cookieType}>
                    <div className={styles.cookieTypeName}>
                      Authentication Cookies
                    </div>
                    <div className={styles.cookieTypeDescription}>
                      Maintain login sessions and remember users across pages
                    </div>
                    <div className={styles.cookieTypeDuration}>
                      Duration: Session-based
                    </div>
                  </div>
                </div>
                <div className={styles.noteText}>
                  Note: We do not use advertising or third-party marketing
                  cookies on the CineNiche platform.
                </div>
              </div>
            </section>

            <section className={styles.policySection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>⚙️</span>
                Managing Your Cookie Preferences
              </h3>
              <div className={styles.sectionContent}>
                <div className={styles.bulletList}>
                  <div className={styles.bulletItem}>
                    Through our cookie consent banner shown on your first visit
                  </div>
                  <div className={styles.bulletItem}>
                    By adjusting your browser settings to block or delete
                    cookies
                  </div>
                  <div className={styles.bulletItem}>
                    By clearing saved cookies manually through your browser
                  </div>
                </div>
                <div className={styles.noteText}>
                  Please note: Disabling certain cookies may affect the
                  performance and features of our website.
                </div>
              </div>
            </section>

            <section className={styles.policySection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🔒</span>
                Personal Data and Cookies
              </h3>
              <div className={styles.sectionContent}>
                <p>
                  Some cookies may collect personal data (e.g., your email or
                  user ID) only for necessary functionality such as login or
                  personalization. These are processed in accordance with our
                  Privacy Policy.
                </p>
              </div>
            </section>

            <section className={styles.policySection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🤝</span>
                Do We Share Cookie Data?
              </h3>
              <div className={styles.sectionContent}>
                <p>
                  No. We do not sell or share cookie data with third parties.
                  All data collected via cookies is used strictly for platform
                  functionality and internal insights.
                </p>
              </div>
            </section>

            <section className={styles.policySection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🔄</span>
                Updates to This Cookie Policy
              </h3>
              <div className={styles.sectionContent}>
                <p>
                  We may update this Cookie Policy to reflect changes in legal
                  requirements or our practices. You will be notified of any
                  significant changes through a notice on our site.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
