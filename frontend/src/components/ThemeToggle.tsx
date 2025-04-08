import { useEffect, useState } from "react";
import "./ThemeToggle.css";
import SunIcon from "../assets/Sun.webp";
import MoonIcon from "../assets/Moon.webp";

const ThemeToggle = () => {
  // Initialize theme from cookie (or default to light)
  const [theme, setTheme] = useState<"light" | "dark">("light");
  // Local state to trigger the icon spin animation.
  const [animating, setAnimating] = useState<boolean>(false);

  // Read cookie on mount and set the theme.
  useEffect(() => {
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

    const storedTheme = getCookie("theme") || "light";
    setTheme(storedTheme as "light" | "dark");
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = async () => {
    // Create an overlay to capture the current background
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

    // Toggle the theme
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    // Trigger the icon spin animation.
    setAnimating(true);
    setTimeout(() => setAnimating(false), 1000);

    try {
      await fetch("/api/Theme/SetTheme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTheme),
      });
    } catch (error) {
      console.error("Error updating theme cookie", error);
    }

    // Give a short delay (so the new theme has been applied) then fade out the overlay.
    setTimeout(() => {
      overlay.style.opacity = "0";
      // Remove the overlay after the fade-out is complete.
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
