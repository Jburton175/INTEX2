import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.css";
import ExternalNavBar from "../components/ExternalNavBar";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState("");
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
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginUrl = rememberme
      ? "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/login?useCookies=true"
      : "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/login?useSessionCookies=true";

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentLength = response.headers.get("content-length");
      let data = null;
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      if (data?.user_id) {
        localStorage.setItem("userId", data.user_id.toString());
      }

      if (data?.token) {
        localStorage.setItem("authToken", data.token);
      }

      // 🔥 Role fetch and redirect
      const userRes = await fetch(
        "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/INTEX/GetCurrentUser",
        { credentials: "include" }
      );

      if (userRes.ok) {
        const userInfo = await userRes.json();
        localStorage.setItem("user", JSON.stringify(userInfo));

        if (userInfo.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/movies");
        }
      } else {
        navigate("/movies"); // fallback
      }
    } catch (err: any) {
      setError(err.message || "Error logging in.");
    }
  };

  return (
    <div className={styles.container}>
      <ExternalNavBar />
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
