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
            {/* start page for dev enviroment */}
            <Route path="/" element={<WelcomPage />} />

            {/* start page for prod enviroment */}
            <Route path="/cgroup60/test2/tar3/" element={<WelcomPage />} />

            <Route
              path="/cgroup60/test2/tar3/signGroup"
              element={<SignGroupPage />}
            />
            <Route
              path="/cgroup60/test2/tar3/Trivia"
              element={<TriviaPage />}
            />
            <Route path="/PlayMap" element={<MapGame />} />
            <Route
              path="/cgroup60/test2/tar3/BonusStation"
              element={<BonusStationPage />}
            />
            <Route
              path="/cgroup60/test2/tar3/WordGameInst"
              element={<WordGameInstPage />}
            />
            <Route
              path="/cgroup60/test2/tar3/WordGame"
              element={<WordGamePage />}
            />
            <Route
              path="/cgroup60/test2/tar3/Rating"
              element={<RatingPage />}
            />
            <Route
              path="/cgroup60/test2/tar3/theSpeaker"
              element={<TheSpeakerComp />}
            />
            <Route
              path="/cgroup60/test2/tar3/hipodrom"
              element={<HipodromComp />}
            />
            <Route path="/cgroup60/test2/tar3/port" element={<PortComp />} />
            <Route path="/cgroup60/test2/tar3/amfi" element={<AmfiComp />} />
            <Route path="/cgroup60/test2/tar3/Video" element={<VideoComp />} />
            <Route
              path="/cgroup60/test2/tar3/flagRegister"
              element={<FlagRegisterPage />}
            />
            <Route
              path="/cgroup60/test2/tar3/AllGamesPage"
              element={<AllGamesPage />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
