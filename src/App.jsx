import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomPage from "./pages/WelcomPage";
import SignGroupPage from "./pages/SignGroupPage";
import Trivia from "./pages/Trivia";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<WelcomPage />} />
          <Route path="/register" element={<SignGroupPage />} />
        </Routes>
      <br></br>   <br></br>

   <Trivia question="1234" answersList={["a","b","c","d"]}/>
   </div>
    </Router>
  );
}

export default App;
