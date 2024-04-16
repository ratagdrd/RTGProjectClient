import React from "react";
import "./../css/trivia.css";
import pic1 from "../images/HordusPort.jpg";

export default function TriviaPage({ques,ans,prog,tot}) {
  const question = " איפה היה ארמון הורדוס בלה בלה בלה בלה ";
  const answersList = [ "תשובה 1 בלה בלה", "תשובה 2 בלה בלה",  "תשובה 3 בלה בלה",  "תשובה 4 בלה בלה"];  //להחליף כשמגיע דאטה מהשרת
  const percentage = (1 / 10) * 100;

  return (
    <div className="trivia-game">
      <div className="quesProgress-container">
      <div className="quesProgress">Q1/10</div>
      <div className="next-button-container">
        <button className="next-button">›</button>
      </div>

      </div>
      
      <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
       
      </div>
    </div>

      <div className="question-container">
        <div className="question-text">{question}</div>
        <img src={pic1} alt="Trivia" className="trivia-image" />
      </div>
<br />
      <div className="answers-container">
        {answersList.map((answer, index) => (
          <button key={index} className="answer-button">
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
