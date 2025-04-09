import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page Imports
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import ShowsPage from "./pages/ShowsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdminPage from "./pages/AdminPage";
import UpdateMovie from "./pages/UpdateMoviePage";
import CookiePage from "./pages/CookiePolicyPage";
import PageDetails from "./pages/PageDetails";




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Movies / TV */}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/shows" element={<ShowsPage />} />
          
          {/* Auth */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Misc Pages */}
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie" element={<CookiePage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/update-movie/:show_id" element={<UpdateMovie />} />

          {/* Details Page */}
          <Route path="/movie/:show_id" element={<PageDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
