import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomPage from "./pages/WelcomPage";
import TriviaPage from "./pages/TriviaPage";
import MapGame from "./FuncComp/MapGame";
import BonusStationPage from "./pages/BonusStationPage";
import WordGameInstPage from "./pages/WordGameInstPage";
import WordGamePage from "./pages/WordGamePage";
import RatingPage from "./pages/RatingPage";
import TheSpeakerComp from "./AR/TheSpeaker";
import HipodromComp from "./AR/Hipodrom";
import VideoComp from "./AR/VideoComp";
import PortComp from "./AR/Port";
import AmfiComp from "./AR/Amfi";
import SignGroupPage from "./pages/SignGroupPage";
import AllGamesPage from "./pages/AllGamesPage";
import FlagRegisterPage from "./pages/FlagRegisterPage";


function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<WelcomPage />} />

            <Route path="/signGroup" element={<SignGroupPage />} />
            <Route path="/Trivia" element={<TriviaPage />} />
            <Route path="/PlayMap" element={<MapGame />} />
            <Route path="/BonusStation" element={ <BonusStationPage />} />
            <Route path="/WordGameInst" element={<WordGameInstPage />} />
            <Route path="/WordGame" element={<WordGamePage />} />
            <Route path="/Rating" element={<RatingPage />} />
            <Route path="/theSpeaker" element={<TheSpeakerComp />} />
            <Route path="/hipodrom" element={<HipodromComp />} />
            <Route path="/port" element={<PortComp />} />
            <Route path="/amfi" element={<AmfiComp />} />
            <Route path="/Video" element={<VideoComp />} />
            <Route path="/flagRegister" element={<FlagRegisterPage />} />
            <Route path="/AllGamesPage" element={<AllGamesPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
