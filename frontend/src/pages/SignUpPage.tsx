import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import ExternalNavBar from "../components/ExternalNavBar";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const validateInputs = (): string | null => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{15,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || !confirmPassword) {
      return "❌ Please fill in all fields.";
    }

    if (!emailRegex.test(email)) {
      return "❌ Please enter a valid email address.";
    }

    if (password !== confirmPassword) {
      return "❌ Passwords do not match.";
    }

    if (!passwordRegex.test(password)) {
      return "❌ Password must be at least 15 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (new Set(password).size < 3) {
      return "❌ Password must contain at least 3 unique characters.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationMessage = validateInputs();
    if (validationMessage) {
      setError(validationMessage);
      setSuccess("");
      return;
    }

    try {
      const response = await fetch(
        "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        setSuccess("✅ Successful registration. Redirecting to login...");
        setError("");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        const errorData = await response.json();
        setError(`❌ ${errorData.message || "Error registering."}`);
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Network error. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className={styles.container}>
      <ExternalNavBar />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Sign Up</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
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
                name="password"
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
                name="confirmPassword"
                placeholder="Confirm Password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            {success && <p className={styles.successText}>{success}</p>}
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
              ©2025 CineNiche, All Rights Reserved
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
