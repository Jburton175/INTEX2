import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.css";
import ExternalNavBar from "../components/ExternalNavBar";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setRememberme(checked);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
  
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    // Use your production API endpoint or local endpoint as needed.
    const loginUrl = rememberme
      ? "https://localhost:5000/login?useCookies=true"
      : "https://localhost:5000/login?useSessionCookies=true";
  
    try {
      console.log("Sending login request to:", loginUrl);
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("Fetch response object:", response);
  
      // Inspect the response status and headers
      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);
  
      // Parse JSON only if a content-length exists (i.e., response has a body)
      let data = null;
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
        console.log("Fetched data:", data);
      } else {
        console.warn("No content-length header or empty response body.");
      }
  
      // If the request was not OK, throw an error now
      if (!response.ok) {
        console.error("Response not OK:", response.status, data);
        throw new Error(data?.message || "Invalid email or password.");
      }
  
      // Log to see if the expected key exists in the response
      if (data && data.user_id) {
        localStorage.setItem("userId", data.user_id.toString());
        console.log("UserId stored in localStorage:", localStorage.getItem("userId"));
      } else {
        console.error("No user_id found in the login response.");
      }
  
      // Store the token if it's in the response
      if (data && data.token) {
        localStorage.setItem("authToken", data.token);
        console.log("Auth token stored in localStorage:", localStorage.getItem("authToken"));
      }
  
      navigate("/movies");
    } catch (error: any) {
      setError(error.message || "Error logging in.");
      console.error("Fetch attempt failed:", error);
    }
  };
  
      

  return (
    <div className={styles.container}>
      <ExternalNavBar />
      <br />
      <br />
      <br />
      {/* Main Sign In Form */}
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Sign In</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberme"
                name="rememberme"
                checked={rememberme}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberme">
                Remember password
              </label>
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
          {error && <p className="error">{error}</p>}
          <br />
          <br />
          <br />
          <br />
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

export default SignInPage;
