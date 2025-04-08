import { useEffect, useState } from "react";
import "./ThemeToggle.css";
import SunIcon from "../assets/Sun.webp";
import MoonIcon from "../assets/Moon.webp";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [animating, setAnimating] = useState<boolean>(false);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  };

  useEffect(() => {
    const consent = getCookie("cookieConsent");
    const savedTheme = getCookie("theme") as "light" | "dark" | null;

    if (consent === "accepted") {
      setConsentGiven(true);
    }

    const initialTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    setAnimating(true);
    setTimeout(() => setAnimating(false), 1000);

    // Background transition effect
    const computedStyle = window.getComputedStyle(document.body);
    const currentBackground = computedStyle.background;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "9998";
    overlay.style.pointerEvents = "none";
    overlay.style.background = currentBackground;
    overlay.style.transition = "opacity 1s ease";
    document.body.appendChild(overlay);

    if (consentGiven) {
      // Set frontend cookie
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `theme=${newTheme}; path=/; expires=${expires.toUTCString()}`;

      // Call backend
      // try {
      //   await fetch("/api/Theme/SetTheme", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(newTheme),
      //   });
      // } catch (err) {
      //   console.error("Failed to persist theme to backend:", err);
      // }
    }

    // Remove overlay after fade
    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 1000);
    }, 50);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <img
        src={theme === "light" ? MoonIcon : SunIcon}
        alt="Toggle theme"
        className={`theme-icon ${animating ? "spin" : ""}`}
      />
    </button>
  );
};

export default ThemeToggle;
