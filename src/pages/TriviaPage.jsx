import React, { useState } from "react";
import "./../css/Games.css";
import pic1 from "../images/HordusPort.jpg";

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { IconButton } from "@mui/material";

export default function TriviaPage({ ques, ans, prog, tot, correctAns }) {
  const question = " איפה היה ארמון הורדוס בלה בלה בלה בלה ";
  const answersList = ["תשובה 1 בלה בלה", "תשובה 2 בלה בלה", "תשובה 3 בלה בלה", "תשובה 4 בלה בלה"];  //להחליף כשמגיע דאטה מהשרת
  const percentage = (1 / 10) * 100;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const correctAnswerIndex = 0; 

  const handleAnswerClick = (index) => {
    if (index === correctAnswerIndex) {
      // Correct answer selected
      setSelectedAnswer(index);
    } else {
      // Incorrect answer selected
      setSelectedAnswer(-1); // Marking the selected answer as incorrect
    }
  };


  return (
    <div className="trivia-game">
      <div className="quesProgress-container">
        <div className="quesProgress">Q1/10</div>
        <IconButton className="next-button-container" style={{ color: "#004a3a" }}> <ArrowForwardIosOutlinedIcon /> </IconButton>
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
          <button
          key={index}
          className={`buttons-game correct-ans ${selectedAnswer === index ? (index === correctAnswerIndex ? '' : 'wrong-ans') : ''}`}
          onClick={() => handleAnswerClick(index)}
        >
          {answer}
        </button>
        ))}
      </div>
    </div>
  );
}
