import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUpPage.module.css";

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
      <header className={styles.header}>
        <Link to="/" className={styles.logoContainer}>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.logoIcon}
          >
            <path
              d="M41.4862 20.07C41.1363 9.11059 32.2559 0.266489 21.2596 0C20.9763 0 20.7431 0.216522 20.7431 0.499667L20.7264 7.86143C20.7264 8.22785 20.4432 8.51099 20.0766 8.52765C9.11363 8.86076 0.266578 17.7548 0 28.7475C0 29.0306 0.216594 29.2638 0.499833 29.2638L7.84738 29.2805C8.21393 29.2805 8.49717 29.5636 8.51383 29.93C8.86371 40.8894 17.7607 49.7335 28.7404 50C29.0237 50 29.2569 49.7835 29.2569 49.5003L29.2736 42.1386C29.2736 41.7722 29.5568 41.489 29.9234 41.4724C40.8864 41.1226 49.7334 32.2285 50 21.2525C50 20.9694 49.7834 20.7362 49.5002 20.7362L42.1526 20.7195C41.7861 20.7195 41.5028 20.4364 41.4862 20.07ZM28.5405 41.4224C22.3092 41.056 17.3109 35.9927 17.0776 29.7302C17.061 29.4637 16.8444 29.2472 16.5778 29.2472L9.24692 29.2305C8.86371 29.2305 8.56381 28.9141 8.58047 28.531C8.94702 22.3018 14.012 17.3051 20.2766 17.072C20.5431 17.0553 20.7597 16.8388 20.7597 16.5723L20.7764 9.22718C20.7764 8.8441 21.093 8.5443 21.4762 8.56096C27.7074 8.92738 32.7058 13.9907 32.939 20.2532C32.9557 20.5197 33.1723 20.7362 33.4389 20.7362L40.7697 20.7528C41.1529 20.7528 41.4528 21.0693 41.4362 21.4524C41.0696 27.8481 35.7547 32.928 29.2736 32.928L29.2569 40.7562C29.2403 41.1392 28.9237 41.439 28.5405 41.4224Z"
              fill="#E60000"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5254 20.5691C20.5254 19.5613 21.6059 18.9224 22.4889 19.4081L30.6442 23.8935C31.5595 24.3969 31.5595 25.712 30.6442 26.2154L22.4889 30.7008C21.6059 31.1865 20.5254 30.5477 20.5254 29.5399V20.5691Z"
              fill="white"
            ></path>
          </svg>
          <span className={styles.logoText}>CineNiche</span>
        </Link>
      </header>

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
