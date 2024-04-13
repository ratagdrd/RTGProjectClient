import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomPage from "./pages/WelcomPage";
import SignGroupPage from "./pages/SignGroupPage";
import TriviaPage from "./pages/TriviaPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<WelcomPage />} />
          <Route path="/register" element={<SignGroupPage />} />
          <Route path="/Trivia" element={<TriviaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
