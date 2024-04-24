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
import RatingPage from "./pages/RatingPage";
import TheSpeakerComp from "./AR/TheSpeaker";
import HipodromComp from "./AR/Hipodrom";
import VideoComp from "./AR/VideoComp";
import PortComp from "./AR/Port";
import AmfiComp from "./AR/Amfi";
import ImagePost from "./pages/imagePost";
import FlagRegisterComp from "./pages/FlagRegister";
function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<WelcomPage />} />
            <Route path="/register" element={<SignGroupPage />} />
            <Route path="/image" element={<ImagePost />} />

            <Route path="/Trivia" element={<TriviaPage />} />
            <Route path="/PlayMap" element={<MapGame />} />
            <Route path="/Flag" element={<Flag familyImg={familyPhoto} />} />
            <Route
              path="/BonusStation"
              element={
                <BonusStation familyImg={familyPhoto} MaxAgediffrence="50" />
              }
            />
            <Route path="/WordGameInst" element={<WordGamePage1 />} />
            <Route path="/WordGame" element={<WordGamePage2 />} />
            <Route path="/Rating" element={<RatingPage />} />
            <Route path="/theSpeaker" element={<TheSpeakerComp />} />
            <Route path="/hipodrom" element={<HipodromComp />} />
            <Route path="/port" element={<PortComp />} />
            <Route path="/amfi" element={<AmfiComp />} />
            <Route path="/Video" element={<VideoComp />} />
            <Route path="/flagRegister" element={<FlagRegisterComp />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
