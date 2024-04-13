import "./App.css";

import WelcomPage from "./pages/WelcomPage";
import SignGroupPage from "./pages/SignGroupPage";
import Trivia from "./pages/Trivia";


function App() {
  return (
    <div className="app-container">
   <WelcomPage/>
   <SignGroupPage/>
   <br></br>   <br></br>

   <Trivia question="1234" answersList={["a","b","c","d"]}/>
   </div>
  )
}

export default App;
