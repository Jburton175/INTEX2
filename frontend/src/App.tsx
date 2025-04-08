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
import React from "react";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/HomePage";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/MoviesPage";
import MoviePage from "./pages/MoviesPage";

function App() {
  return (
    <BrowserRouter>
      <Home/>
      <MoviePage/>
    </BrowserRouter>
  );
}

export default App;
