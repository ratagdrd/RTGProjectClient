import React, { useState } from "react";
import "./../css/Games.css";
import pic1 from "../images/HordusPort.jpg";

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { IconButton } from "@mui/material";
import FooterGraphic from "../FuncComp/FooterGraphic";
import { useEffect } from "react";

export default function TriviaPage() {
  const [question, setQuestion] = useState("");
  const [ansList, setAnsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correctAns, setCorrectAns] = useState(0);
  const [quesNum, setQuesNum] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  useEffect(() => {
    onLoad();
  }, []);


  const onLoad = () => {
    fetch("https://localhost:7052/api/QuestionForActivity/1", {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch result: ", result);
          fillTrivia(result);
          // Process the result as needed
        },
        (error) => {
          console.log("Error fetching trivia data:", error);
        }
      );
  };


  const fillTrivia = (data) => {
    setQuestion(data[0]["question"]);
    setAnsList([data[0]["answer1"], data[0]["answer2"], data[0]["answer3"], data[0]["answer4"]]);
    setCorrectAns(data[0]["correctedAnswer"]);
    setQuesNum(data[0]["questionNo"]);

  }


  const percentage = (quesNum / 10) * 100;


  const handleAnswerClick = (index) => {
    debugger
    setSelectedAnswer(index);
    const buttons = document.querySelectorAll('.buttons-game');
    buttons.forEach((button, i) => {
      if (i !== correctAns) {
        button.classList.add('wrong-ans');
      }
    });

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
        {ansList.map((answer, index) => (
          <button
            key={index}
            className={`buttons-game correct-ans`}
            onClick={() => handleAnswerClick(index)}
          >
            {answer}
          </button>
        ))}
      </div>
      <FooterGraphic />
    </div>
  );
}
