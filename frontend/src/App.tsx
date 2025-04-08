import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/MoviesPage";
import MoviePage from "./pages/MoviesPage";
import TopNavBar from "./components/TopNavBar";
import CineNiche from "./pages/CineNiche";
import CookieConsentBanner from "./components/CookieConsentBanner";

function App() {
  return (
    <BrowserRouter>
      {/* <TopNavBar /> */}
      <Home/>
      {/* <CineNiche />
      <MoviePage/> */}
      <CookieConsentBanner />
    </BrowserRouter>
  );
}

export default App;
