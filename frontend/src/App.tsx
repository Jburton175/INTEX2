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
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}

export default App;
