import "bootstrap/dist/css/bootstrap.min.css";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdminPage from "./pages/AdminPage";
import UpdateMovie from "./pages/UpdateMoviePage";
import CookiePage from "./pages/CookiePolicyPage";
import AddMovie from "./pages/AddMoviePage";
import PageDetails from "./pages/PageDetails";
import SearchResultsPage from "./pages/SearchResultsPage";
import CorsTestPage from "./pages/CorsTestPage"; // import your test page
import EmailLogger from "./components/EmailLogger";
import RoleProtectedRoute from "./components/RoleProtectionRoute";


function App() {
  return (
    <Router>
      <EmailLogger />
      <div className="App">
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
            
            <Route
              path="/admin"
              element={
                <RoleProtectedRoute allowedRoles={["Admin"]}>
                  <AdminPage />
                </RoleProtectedRoute>
              }
            />

            <Route path="/update-movie/:show_id" element={<UpdateMovie />} />
            <Route path="/cookie" element={<CookiePage />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/movie/:show_id" element={<PageDetails />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/cors-test" element={<CorsTestPage />} />
      </Routes>

      </div>
    </Router>
  );
}

export default App;
