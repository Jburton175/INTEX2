import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import ExternalNavBar from "../components/ExternalNavBar";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Updated regex for at least one lowercase, one uppercase, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{15,}$/;
  
    if (password !== confirmPassword) {
      setPasswordError("❌ Passwords do not match");
      return;
    }
  
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "❌ Password must be at least 15 characters long and include at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
  
    // Check for 3 unique characters
    const uniqueChars = new Set(password.split(""));
    if (uniqueChars.size < 3) {
      setPasswordError("❌ Password must contain at least 3 unique characters");
      return;
    }
  
    setPasswordError("");
  
    // Proceed with actual sign-up logic here (e.g., API call)
    console.log("Sign up attempt with:", email, password);
  };
  

  return (
    <div className={styles.container}>
      <ExternalNavBar />
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Sign Up</h1>

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

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className={styles.errorText}>{passwordError}</p>
              )}
            </div>

            <button type="submit" className={styles.signUpButton}>
              Create an Account
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>OR</span>
            </div>

            <Link to="/signin" className={styles.signInLink}>
              Already have an account? Sign In
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
  );
};

export default SignUpPage;
