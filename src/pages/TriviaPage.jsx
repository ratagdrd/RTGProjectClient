import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./../css/Games.css";

import ImgTrivia1 from "../images/ImgTrivia1.jpg";
import ImgTrivia2 from "../images/ImgTrivia2.jpg";
import ImgTrivia3 from "../images/ImgTrivia3.jpg";
import ImgTrivia4 from "../images/ImgTrivia4.jpg";
import ImgTrivia5 from "../images/ImgTrivia5.jpg";
import ImgTrivia6 from "../images/ImgTrivia6.jpg";
import ImgTrivia7 from "../images/ImgTrivia7.jpg";
import ImgTrivia8 from "../images/ImgTrivia8.jpg";
import ImgTrivia9 from "../images/ImgTrivia9.jpg";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import { IconButton } from "@mui/material";

import { IndeterminateCheckBox } from "@mui/icons-material";

import FooterGraphic from "../FuncComp/FooterGraphic";

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
  const groupCode = sessionStorage.getItem("groupCode");
  const navigate = useNavigate();

  const triviaImages = [
    ImgTrivia1,
    ImgTrivia2,
    ImgTrivia3,
    ImgTrivia4,
    ImgTrivia5,
    ImgTrivia6,
    ImgTrivia7,
    ImgTrivia8,
    ImgTrivia9,
  ];

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    fetch("https://localhost:7052/api/QuestionForActivity/1", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
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

      // Update group points
      fetch(`https://localhost:7052/api/Group/${groupCode}/${totalPoints}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
        body: JSON.stringify({
          TotalPoints: totalPoints,
        }),
      })
        .then((res) => {
          console.log("res=", res);
          console.log("res.status", res.status);
          console.log("res.ok", res.ok);
          return res.json();
        })
        .then((data) => {
          console.log("Group points fetch result: ", data);
          if (data) {
            console.log("Group points:", data.totalPoints);
            setTotalPoints(data.totalPoints);
          } else {
            console.log("Group points not found.");
          }
        })
        .catch((error) => {
          console.log("Error fetching Group points:", error);
        });
      return;
    }
    setQuestion(data[currentQues]["question"]);
    setAnsList([
      data[currentQues]["answer1"],
      data[currentQues]["answer2"],
      data[currentQues]["answer3"],
      data[currentQues]["answer4"],
    ]);
    setCorrectAns(data[currentQues]["correctedAnswer"]);
    setQuesNum(data[currentQues]["questionNo"]);
  };
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

    const buttons = document.querySelectorAll(".buttons-game");
    buttons.forEach((button, i) => {
      if (i !== correctAns - 1) {
        button.classList.add("wrong-ans");
      }
    });
    const message =
      index === correctAns - 1
        ? " כל הכבוד! זכיתם ב" + points + " נקודות "
        : "אולי בפעם הבאה";
    setPopupMessage(message);

    // Increment points if correct answer
    console.log(index, correctAns - 1);
    if (index == correctAns - 1) {
      setTotalPoints((prevTotalPoints) => prevTotalPoints + points);
      console.log("points:" + totalPoints);
    }

    // Hide the message after 3 seconds and remove the red background
    setTimeout(() => {
      setPopupMessage(null);
      setCurrentQues((prevCurrentQues) => prevCurrentQues + 1);

      console.log(currentQues);
      buttons.forEach((button, i) => {
        if (i !== correctAns - 1) {
          button.classList.remove("wrong-ans");
        }
      });
    }, 3000);
  };

  const handleFinish = () => {
    setGameOver(false);
    navigate("/AllGamesPage");
    //need to use the points
  };
  return (
    <div>
      <div
        className={`trivia-game ${darkenBackground ? "darken-background" : ""}`}
      >
        {popupMessage && <div className="popup-message">{popupMessage}</div>}
        <div className="quesProgress-container">
          <div className="quesProgress">Q{quesNum}/9</div>
          <IconButton
            className="next-button-container"
            style={{ color: "#004a3a" }}
          >
            {" "}
            <ArrowForwardIosOutlinedIcon />{" "}
          </IconButton>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="question-container">
          <div className="question-text">{question}</div>
          <img
            src={triviaImages[currentQues]}
            alt="Trivia"
            className="trivia-image"
          />
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
            <h4 className="game-over-header">התחנה הסתיימה</h4>
          </div>
          <button onClick={handleFinish}>המשך </button>
        </div>
      )}
    </div>
  );
}
