import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.css";
import ExternalNavBar from "../components/ExternalNavBar";
import CookieConsentBanner from "../components/CookieConsentBanner";

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

      // 🔥 New: Check /pingauth for role info and log it
      try {
        const pingRes = await fetch(
          "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/pingauth",
          {
            method: "GET",
            credentials: "include"
          }
        );

        console.log("[/pingauth] Status:", pingRes.status);

        const pingData = await pingRes.json();
        console.log("[/pingauth] Data:", pingData);

        if (pingData?.role) {
          localStorage.setItem("user", JSON.stringify(pingData));

          if (pingData.role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/movies");
          }
        } else {
          console.warn("No role found in /pingauth response. Defaulting to movies.");
          navigate("/movies");
        }
      } catch (pingErr) {
        console.error("Error calling /pingauth:", pingErr);
        navigate("/movies");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Error logging in.");
    }
  };


  return (
    <div className={styles.container}>
      <ExternalNavBar />
      <CookieConsentBanner />
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

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default SignInPage;