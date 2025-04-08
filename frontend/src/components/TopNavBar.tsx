import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo_5.png";
import "./TopNavBar.css";
import "./ThemeToggle.css";

const TopNavBar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 60) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`top-navbar ${isHidden ? "hide" : ""}`}>
      <div className="nav-left">
        <Link to="/" className="brand-logo">
          <img src={logo} alt="CineNiche Logo" className="logo-image" />
        </Link>
      </div>

      <button
        className="mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`nav-center ${isMobileOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="nav-right">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default TopNavBar;
