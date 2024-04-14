import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomPage from "./pages/WelcomPage";
import SignGroupPage from "./pages/SignGroupPage";
import TriviaPage from "./pages/TriviaPage";
import MapGame from "./FuncComp/MapGame";

function App() {
  return (
    <>
      {/* <MapOmer /> */}
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<WelcomPage />} />
            <Route path="/register" element={<SignGroupPage />} />
            <Route path="/Trivia" element={<TriviaPage />} />
            <Route path="/PlayMap" element={<MapGame />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
