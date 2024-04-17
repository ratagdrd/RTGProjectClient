import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomPage from "./pages/WelcomPage";
import SignGroupPage from "./pages/SignGroupPage";
import TriviaPage from "./pages/TriviaPage";
import MapGame from "./FuncComp/MapGame";
import Flag from "./pages/Flag";
import familyPhoto from "./images/familyPhoto.jpeg";
import BonusStation from "./pages/BonusStation";
import WordGamePage1 from "./pages/WordGamePage1";
import WordGamePage2 from "./pages/WordGamePage2";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<WelcomPage />} />
            <Route path="/register" element={<SignGroupPage />} />
            <Route path="/Trivia" element={<TriviaPage />} />
            <Route path="/PlayMap" element={<MapGame />} />
            <Route path="/Flag" element={<Flag familyImg={familyPhoto} />} />
            <Route
              path="/BonusStation"
              element={
                <BonusStation familyImg={familyPhoto} MaxAgediffrence="50" />
              }
            />
          <Route path="/WordGameInst" element={<WordGamePage1/>} />
          <Route path="/WordGame" element={<WordGamePage2/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
