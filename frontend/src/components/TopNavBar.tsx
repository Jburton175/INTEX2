import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./TopNavBar.css";
import "./ThemeToggle.css"

const TopNavBar: React.FC = () => {
  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <Link to="/" className="brand-logo">
          MySite
        </Link>
      </div>
      <div className="nav-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
      <ThemeToggle />
      </div>
    </nav>
  );
};

export default TopNavBar;
