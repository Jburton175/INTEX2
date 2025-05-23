import React from "react";
import styles from "./PrivacyPolicyPage.module.css";
import ExternalNavBar from "../components/ExternalNavBar";
import Footer from "../components/Footer";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* <Header
        selectedType={"Movie"}
        onTypeChange={function (_type: "Movie" | "TV Show"): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      <ExternalNavBar />
      <br />
      <br />
      <br />
      <main className={styles.mainContent}>
        <div className={styles.policyContainer}>
          <div className={styles.policyContent}>
            <section className={styles.introSection}>
              <h2 className={styles.policyTitle}>CineNiche Privacy Policy</h2>
              <p className={styles.policyDate}>Effective Date: April 2025</p>
              <p className={styles.policyIntro}>
                At CineNiche, we value your privacy and are committed to
                protecting your personal data. This Privacy Policy explains how
                we collect, use, share, and protect your information when you
                interact with our movie recommendation platform.
              </p>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>What Data We Collect</h2>
              <div className={styles.sectionContent}>
                <p className={styles.sectionIntro}>
                  We collect the following types of information:
                </p>

                <div className={styles.categoryGroup}>
                  <h4 className={styles.categoryTitle}>Account Information</h4>
                  <ul className={styles.categoryList}>
                    <li className={styles.listItem}>Name</li>
                    <li className={styles.listItem}>Email address</li>
                    <li className={styles.listItem}>
                      Password (hashed and stored securely)
                    </li>
                    <li className={styles.listItem}>
                      Age, gender, city, state, and zip code
                    </li>
                  </ul>
                </div>

                <div className={styles.categoryGroup}>
                  <h4 className={styles.categoryTitle}>
                    Viewing &amp; Rating Behavior
                  </h4>
                  <ul className={styles.categoryList}>
                    <li className={styles.listItem}>Movies you have watched</li>
                    <li className={styles.listItem}>Ratings you provide</li>
                  </ul>
                </div>

                <div className={styles.categoryGroup}>
                  <h4 className={styles.categoryTitle}>Platform Usage</h4>
                  <ul className={styles.categoryList}>
                    <li className={styles.listItem}>
                      Which streaming services you subscribe to (e.g., Netflix,
                      Hulu, etc.)
                    </li>
                    <li className={styles.listItem}>
                      Device type and browser used to access CineNiche
                    </li>
                  </ul>
                </div>

                <div className={styles.categoryGroup}>
                  <h4 className={styles.categoryTitle}>
                    Technical Information
                  </h4>
                  <ul className={styles.categoryList}>
                    <li className={styles.listItem}>IP address</li>
                    <li className={styles.listItem}>
                      Cookies and usage logs (see below)
                    </li>
                  </ul>
                </div>

                <p>
                  We do not collect any payment or financial data, as this is a
                  prototype application.
                </p>
              </div>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>How We Use Your Data</h2>
              <div className={styles.sectionContent}>
                <p>We use your information to:</p>
                <ul className={styles.categoryList}>
                  <li className={styles.listItem}>
                    Authenticate users and manage accounts
                  </li>
                  <li className={styles.listItem}>
                    Provide personalized movie recommendations
                  </li>
                  <li className={styles.listItem}>
                    Analyze viewing and rating trends
                  </li>
                  <li className={styles.listItem}>
                    Improve our machine learning models
                  </li>
                  <li className={styles.listItem}>
                    Administer the CineNiche platform and troubleshoot issues
                  </li>
                  <li className={styles.listItem}>
                    Comply with legal obligations
                  </li>
                </ul>
              </div>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>
                Who Has Access to Your Data
              </h2>
              <div className={styles.sectionContent}>
                <p>Your personal data is accessible only to:</p>
                <ul className={styles.categoryList}>
                  <li className={styles.listItem}>You, through your account</li>
                  <li className={styles.listItem}>
                    CineNiche administrators (authorized users with proper
                    roles)
                  </li>
                  <li className={styles.listItem}>
                    Our development and grading team (for educational purposes
                    only)
                  </li>
                </ul>
                <p className={styles.paragraph}>
                  We do not sell, rent, or trade your data with third parties.
                </p>
              </div>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>
                Cookies &amp; Tracking Technologies
              </h2>
              <div className={styles.sectionContent}>
                <p>We use cookies to:</p>
                <ul className={styles.categoryList}>
                  <li className={styles.listItem}>
                    Remember your login session
                  </li>
                  <li className={styles.listItem}>
                    Store user preferences (e.g., display settings)
                  </li>
                  <li className={styles.listItem}>
                    Collect anonymized usage analytics
                  </li>
                </ul>
                <p className={styles.paragraph}>
                  We display a cookie consent banner when you first visit our
                  site. By continuing to use CineNiche, you consent to our use
                  of cookies.
                </p>
              </div>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Security Measures</h2>
              <div className={styles.sectionContent}>
                <p>We take appropriate steps to protect your data:</p>
                <ul className={styles.categoryList}>
                  <li className={styles.listItem}>
                    All connections are secured with HTTPS (TLS encryption)
                  </li>
                  <li className={styles.listItem}>
                    Strong password policies are enforced
                  </li>
                  <li className={styles.listItem}>
                    User roles (Admin, Customer, Visitor) are protected by
                    authentication and authorization rules
                  </li>
                  <li className={styles.listItem}>
                    Data access is restricted by role using Role-Based Access
                    Control (RBAC)
                  </li>
                  <li className={styles.listItem}>
                    Data deletions require confirmation
                  </li>
                  <li className={styles.listItem}>
                    Credentials and sensitive environment variables are stored
                    securely and never exposed in public code repositories.
                  </li>
                </ul>
              </div>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Your Rights Under GDPR</h2>
              <div className={styles.sectionContent}>
                <p>You have the right to:</p>
                <ul className={styles.categoryList}>
                  <li className={styles.listItem}>Access your personal data</li>
                  <li className={styles.listItem}>Correct inaccurate data</li>
                  <li className={styles.listItem}>
                    Request deletion of your data ("right to be forgotten")
                  </li>
                  <li className={styles.listItem}>
                    Object to processing of your data
                  </li>
                  <li className={styles.listItem}>
                    Withdraw consent at any time
                  </li>
                </ul>
              </div>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>
                Data Storage &amp; Retention
              </h2>
              <div className={styles.sectionContent}>
                <p>
                  All user data is stored securely in a cloud-hosted database.
                  Data is retained only as long as necessary to fulfill the
                  purposes outlined in this policy.
                </p>
              </div>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Third-Party Integrations</h2>
              <div className={styles.sectionContent}>
                <p>
                  Our platform may optionally support third-party authentication
                  providers (e.g., Google, Microsoft). If enabled, these
                  services will have access to your login information as per
                  their terms and policies.
                </p>
              </div>
            </section>

            <section className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
              <div className={styles.sectionContent}>
                <p>
                  We may update this Privacy Policy as needed. If changes are
                  significant, we will notify you through the platform or by
                  email.
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

export default PrivacyPolicyPage;
