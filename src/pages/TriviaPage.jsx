import React, { useState } from "react";
import "./../css/Games.css";
import pic1 from "../images/HordusPort.jpg";
import { useNavigate } from "react-router-dom";


import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { IconButton } from "@mui/material";
import FooterGraphic from "../FuncComp/FooterGraphic";
import { useEffect } from "react";
import { IndeterminateCheckBox } from "@mui/icons-material";

export default function TriviaPage() {
  const [data,setData]=useState(null);
  const [question, setQuestion] = useState("");
  const [ansList, setAnsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correctAns, setCorrectAns] = useState(0);
  const [quesNum, setQuesNum] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [currentQues, setCurrentQues] = useState(0);
  
//TODO להוסיף רנדום בתשובות וניקוד

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
          setData(result);
          fillTrivia(result);
          // Process the result as needed
        },
        (error) => {
          console.log("Error fetching trivia data:", error);
        }
      );
  };


  const fillTrivia = (data) => {
    
    if(currentQues>1){
      // יש 10 שאלות, צריך לעבוד מעבר לעמוד אחר ולהחליף ל10 וגם לעשות פוסט לניקוד
      window.location.href = 'http://localhost:5173';
        return;
    }
    setQuestion(data[currentQues]["question"]);
    setAnsList([data[currentQues]["answer1"], data[currentQues]["answer2"], data[currentQues]["answer3"], data[currentQues]["answer4"]]);
    setCorrectAns(data[currentQues]["correctedAnswer"]);
    setQuesNum(data[currentQues]["questionNo"]);

  }
  useEffect(() => {
    if (currentQues !== 0) {
      fillTrivia(data);
    }
  }, [currentQues]);

  const percentage = (quesNum / 10) * 100;


  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    console.log(selectedAnswer); 
    console.log(correctAns);

    const buttons = document.querySelectorAll('.buttons-game');
    buttons.forEach((button, i) => {
      if (i !== correctAns) {
        button.classList.add('wrong-ans');
      }
    });
    const message = index === correctAns ? "תשובה נכונה" : "טעות, נסה בפעם הבאה";
  setPopupMessage(message);

  // Hide the message after 3 seconds
  setTimeout(() => {
    setPopupMessage(null);
    setCurrentQues(prevCurrentQues => prevCurrentQues + 1);
    
    console.log(currentQues);
    buttons.forEach((button, i) => {
      if (i !== correctAns) {
        button.classList.remove('wrong-ans');
      }
    });
  }, 3000);
  };


  return (
    <div className="trivia-game">
    {popupMessage && <div className="popup-message">{popupMessage}</div>}
      <div className="quesProgress-container">
        <div className="quesProgress">Q{currentQues+1}/10</div>
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
      {/* <FooterGraphic /> */}
    </div>
  );
}
