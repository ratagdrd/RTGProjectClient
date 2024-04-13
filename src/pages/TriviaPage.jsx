import React from "react";
import "./../css/trivia.css";
import pic1 from "../images/HordusPort.jpg";

export default function TriviaPage() {
  const question = "1234";
  const answersList = ["a", "b", "c", "d"];

  return (
    <div className="trivia-game">
      <div className="progress-bar">Q1/10</div>
      <button className="next-button">›</button>
      <div className="question-container">
        <div className="question-text">{question}</div>
      </div>
      <img src={pic1} alt="Trivia" className="trivia-image" />
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
