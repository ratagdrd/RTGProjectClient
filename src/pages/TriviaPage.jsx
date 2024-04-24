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
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [ansList, setAnsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correctAns, setCorrectAns] = useState(0);
  const [quesNum, setQuesNum] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [currentQues, setCurrentQues] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [darkenBackground, setDarkenBackground] = useState(false);

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
          const pointsFromDatabase = result[currentQues]["noOfPoints"];
          setTotalPoints(pointsFromDatabase);
          setPoints(pointsFromDatabase);
          // Process the result as needed
        },
        (error) => {
          console.log("Error fetching trivia data:", error);
        }
      );
  };


  const fillTrivia = (data) => {

    if (currentQues > 8) {
      // יהיו 10 שאלות, צריך לעבוד מעבר לעמוד אחר ולהחליף ל9 וגם לעשות פוסט לניקוד
      setGameOver(true);
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

  const percentage = (quesNum / 9) * 100;

  useEffect(() => {
    if (gameOver) {
      setDarkenBackground(true);
    }
  }, [gameOver]);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    console.log("selected");
    console.log(selectedAnswer);
    console.log("correct");
    console.log(correctAns);

    const buttons = document.querySelectorAll('.buttons-game');
    buttons.forEach((button, i) => {
      if (i !== (correctAns - 1)) {
        button.classList.add('wrong-ans');
      }
    });
    const message = index === (correctAns - 1) ? " כל הכבוד! זכיתם ב" + points + " נקודות " : "אולי בפעם הבאה";
    setPopupMessage(message);

    // Increment points if correct answer
    if (index == correctAns) {
      setTotalPoints(prevTotalPoints => prevTotalPoints + points);
      console.log("points:" + totalPoints);
    }

    // Hide the message after 3 seconds and remove the red background
    setTimeout(() => {
      setPopupMessage(null);
      setCurrentQues(prevCurrentQues => prevCurrentQues + 1);

      console.log(currentQues);
      buttons.forEach((button, i) => {
        if (i !== (correctAns - 1)) {
          button.classList.remove('wrong-ans');
        }
      });
    }, 3000);
  };

 


  return (
    <div>
    <div className={`trivia-game ${darkenBackground ? 'darken-background' : ''}`}>
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
      <div className="quesProgress-container">
        <div className="quesProgress">Q{quesNum}/9</div>
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
    {gameOver && (
        <div className="game-over-popup" style={{ fontWeight: "100" }}>
          <div>
            <h4 className='game-over-header'>התחנה הסתיימה</h4>
          </div>
          <button onClick={() => setGameOver(false)}>המשך </button>
        </div>
      )}
      </div>
  );
}
