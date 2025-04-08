import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo_5.png"; // ✅ Correct import
import "./TopNavBar.css";
import "./ThemeToggle.css";

const TopNavBar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="top-navbar">
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
