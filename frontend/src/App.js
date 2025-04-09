import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import HomePage from './pages/HomePage'
// function App() {
//   const [count, setCount] = useState(0)
//   return (
//     <>
//       <HomePage />
//     </>
//   )
// }
// export default App
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
import "./App.css";
function App() {
    return (_jsx(Router, { children: _jsx("div", { className: "App", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/movies", element: _jsx(MoviesPage, {}) }), _jsx(Route, { path: "/shows", element: _jsx(ShowsPage, {}) }), _jsx(Route, { path: "/signin", element: _jsx(SignInPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUpPage, {}) }), _jsx(Route, { path: "/privacypolicy", element: _jsx(PrivacyPolicyPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminPage, {}) }), _jsx(Route, { path: "/update-movie/:show_id", element: _jsx(UpdateMovie, {}) }), _jsx(Route, { path: "/cookie", element: _jsx(CookiePage, {}) })] }) }) }));
}
export default App;
