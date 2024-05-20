import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./../css/Games.css";
const ImgTrivia1 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia1.jpg";
const ImgTrivia2 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia2.jpg";
const ImgTrivia3 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia3.jpg";
const ImgTrivia4 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia4.jpg";
const ImgTrivia5 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia5.jpg";
const ImgTrivia6 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia6.jpg";
const ImgTrivia7 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia7.jpg";
const ImgTrivia8 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia8.jpg";
const ImgTrivia9 =
  "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/trivia/ImgTrivia9.jpg";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { IconButton } from "@mui/material";
import FooterGraphic from "../FuncComp/FooterGraphic";

export default function TriviaPage() {
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [ansList, setAnsList] = useState([]);
  const [correctAns, setCorrectAns] = useState(0);
  const [quesNum, setQuesNum] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [currentQues, setCurrentQues] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const groupCode = sessionStorage.getItem("groupCode");
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const apiUrlQuestion = `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/QuestionForActivity/1`;
  // const apiUrlQuestion =
  //   location.hostname === "localhost" || location.hostname === "127.0.0.1"
  //     ? `https://localhost:7052/api/QuestionForActivity/1`
  //     : `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/QuestionForActivity/1`;

  const apiUrlPoints = `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/${groupCode}/${totalPoints}`;

  // const apiUrlPoints =
  //   location.hostname === "localhost" || location.hostname === "127.0.0.1"
  //     ? `https://localhost:7052/api/Group/${groupCode}/${totalPoints}`
  //     : `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/${groupCode}/${totalPoints}`;

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
    fetch(apiUrlQuestion, {
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
          setPoints(pointsFromDatabase);
        },
        (error) => {
          console.log("Error fetching trivia data:", error);
        }
      );
  };

  const fillTrivia = (queArr) => {
    if (currentQues > queArr.length - 1) {
      setGameOver(true);

      // Update group points
      fetch(apiUrlPoints, {
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
    setQuestion(queArr[currentQues]["question"]);
    setAnsList([
      queArr[currentQues]["answer1"],
      queArr[currentQues]["answer2"],
      queArr[currentQues]["answer3"],
      queArr[currentQues]["answer4"],
    ]);
    setCorrectAns(queArr[currentQues]["correctedAnswer"]);
    setQuesNum(queArr[currentQues]["questionNo"]);
  };
  useEffect(() => {
    if (currentQues !== 0) {
      fillTrivia(data);
    }
  }, [currentQues]);
  // data?.length accesses the length of the data array, ensuring that if data is null or undefined,
  // the expression returns undefined instead of causing an error.
  const percentage = (quesNum / data?.length) * 100;

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    console.log("selected");
    console.log(selectedAnswer);
    console.log("correct");
    console.log(correctAns);
    setIsButtonDisabled(true);

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
    }

    // Hide the message after 3 seconds and remove the red background
    setTimeout(() => {
      setPopupMessage(null);
      setCurrentQues((prevCurrentQues) => prevCurrentQues + 1);
      setIsButtonDisabled(false); // Re-enable the buttons for the next question
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
    navigate("/cgroup60/test2/tar3/BonusStation", {
      state: { source: "tsuk" },
    });
  };

  const handleNextClick = () => {
    console.log("Next button clicked");
    setShowExitModal(true);
  };

  const handleExitYes = () => {
    navigate("/cgroup60/test2/tar3/AllGamesPage"); // Navigate to AllGamesPage
  };

  const handleExitNo = () => {
    setShowExitModal(false); // Close exit modal
  };

  return (
    <div className="trivia">
      <div className="trivia-game">
        {popupMessage && <div className="popup-message">{popupMessage}</div>}
        <div className="quesProgress-container">
          <div className="quesProgress">
            Q{quesNum}/{data?.length}
          </div>
          <IconButton
            className="next-button-container"
            style={{ color: "#004a3a" }}
            onClick={handleNextClick}
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
              disabled={isButtonDisabled}
            >
              {answer}
            </button>
          ))}
        </div>

        <FooterGraphic />
      </div>
      {gameOver && (
        <div className="popup popup-trivia" style={{ fontWeight: "100" }}>
          <div>
            <h4 className="popup-header">התחנה הסתיימה</h4>
          </div>
          <button onClick={handleFinish}>המשך </button>
        </div>
      )}
      {/* Exit Popup */}
      {showExitModal && (
        <div className="popup exit-popup">
          <h4 className="popup-header">האם אתם בטוחים שברצונכם לצאת מהמשחק?</h4>
          <p>שימו לב❣ במידה ויצאתם באמצע הניקוד שצברתם עד כה לא יישמר</p>
          <div className="exit-buttons">
            <button onClick={handleExitYes}>חזרה למפה</button>
            <button onClick={handleExitNo}>המשך במשחק</button>
          </div>
        </div>
      )}
    </div>
  );
}
