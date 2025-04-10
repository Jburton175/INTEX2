import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignInPage.module.css";
import ExternalNavBar from "../components/ExternalNavBar";
import AuthorizeView from "../components/AuthorizeView";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Sign in attempt with:", email, password);
  };

  return (
    <AuthorizeView>
    <div className={styles.container}>
      <ExternalNavBar />
        <br/><br/><br/><br/><br/><br/><br/><br/>  
      {/* Main Sign In Form */}
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Sign In</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.signInButton}>
              Sign In
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>OR</span>
            </div>

            <Link to="/signup" className={styles.signUpLink}>
              Sign Up Now!
            </Link>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerDivider}></div>
          <div className={styles.footerInfo}>
            <div className={styles.copyright}>
              @2025 CineNiche, All Rights Reserved
            </div>
            <div className={styles.policies}>
              <Link to="/privacy" className={styles.policyLink}>
                Privacy Policy
              </Link>
              <div className={styles.policySeparator}></div>
              <Link to="/cookies" className={styles.policyLink}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
        </AuthorizeView>
  );
};

export default SignInPage;
