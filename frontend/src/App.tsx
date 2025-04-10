import "bootstrap/dist/css/bootstrap.min.css";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import ShowsPage from "./pages/ShowsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdminPage from "./pages/AdminPage";
import UpdateMovie from "./pages/UpdateMoviePage";
import CookiePage from "./pages/CookiePolicyPage";
import AddMovie from "./pages/AddMoviePage";
import PageDetails from "./pages/PageDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/update-movie/:show_id" element={<UpdateMovie />} />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/movie/:show_id" element={<PageDetails />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
