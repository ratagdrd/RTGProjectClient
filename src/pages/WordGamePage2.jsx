import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./../css/Games.css";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import {
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import FooterGraphic from "../FuncComp/FooterGraphic";

export default function WordGamePage2() {
  const [data, setData] = useState(null);
  const [word, setWord] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [quesNum, setQuesNum] = useState(0);
  const [currentQues, setCurrentQues] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [Instructions, setInstructions] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const groupCode = sessionStorage.getItem("groupCode");
  const percentage = (quesNum / 5) * 100;
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  console.log(quesNum);
  console.log(percentage);
  console.log(groupCode);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    fetch("https://localhost:7052/api/QuestionForActivity/2", {
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
          fillWord(result);
          const pointsFromDatabase = result[currentQues]["noOfPoints"];
          //   setTotalPoints(pointsFromDatabase);
          setPoints(pointsFromDatabase);
          // Process the result as needed
        },
        (error) => {
          console.log("Error fetching word data:", error);
        }
      );

    // Fetch from Activity Data table
    fetch("https://localhost:7052/api/Activity/2", {
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
        (activity) => {
          console.log("Activity fetch result: ", activity);
          if (activity) {
            console.log("Activity with code 2:", activity);
            const instructions = activity.instruction || "";
            console.log("Instructions:", instructions);
            setInstructions(instructions);
          } else {
            console.log("Activity with code 2 not found.");
          }
        },
        (error) => {
          console.log("Error fetching Activity data:", error);
        }
      );
  };

  const fillWord = (data) => {
    console.log("current before the if " + currentQues);
    if (currentQues == 5) {
      setGameOver(true);
      console.log(quesNum);
      setCurrentQues(quesNum);

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
    console.log(currentQues);
    setWord(data[currentQues]["question"]);
    setQuesNum(data[currentQues]["questionNo"]);
  };
  useEffect(() => {
    if (currentQues !== 0) {
      fillWord(data);
    }
  }, [currentQues]);

  const handleAnswerClick = (event) => {
    const index = event.target.dataset.index;
    console.log(index);

    setIsButtonDisabled(true);
    const message =
      index == 1
        ? " כל הכבוד! זכיתם ב" + points + " נקודות "
        : "אולי בפעם הבאה";
    setPopupMessage(message);

    // Increment points if correct answer
    if (index == 1) {
      setTotalPoints((prevTotalPoints) => prevTotalPoints + points);
      console.log("points:" + totalPoints);
    }

    // Hide the message after 3 seconds
    setTimeout(() => {
      setPopupMessage(null);
      if (currentQues < 5) {
        console.log("current on the if " + currentQues);
        setCurrentQues((prevCurrentQues) => prevCurrentQues + 1);
      }
      console.log(currentQues);
      setIsButtonDisabled(false);
    }, 3000);
  };

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  const handleInfoClose = () => {
    setShowInfo(false);
  };

  const handleFinish = () => {
    setGameOver(false);
    navigate("/BonusStation", { state: { source: "amfi" } });
    //need to use the points
  };

  const handleNextClick = () => {
    console.log("Next button clicked");
    setShowExitModal(true);
  };

  const handleExitYes = () => {
    navigate("/AllGamesPage"); // Navigate to AllGamesPage
  };

  const handleExitNo = () => {
    setShowExitModal(false); // Close exit modal
  };

  return (
    <>
      <div className="container">
        {popupMessage && <div className="popup-message">{popupMessage}</div>}
        <div className="quesProgress-container">
          <IconButton onClick={handleInfoClick}>
            <InfoIcon />
          </IconButton>
          <Dialog open={showInfo} onClose={handleInfoClose}>
            <DialogTitle
              className="instructions"
              style={{ direction: "rtl", padding: "10px 14px" }}
            >
              {" "}
              הוראות
            </DialogTitle>
            <DialogContent
              style={{
                direction: "rtl",
                width: "350px",
                padding: "0px 14px 10px",
              }}
            >
              <Typography className="instructions"> {Instructions} </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleInfoClose}
                style={{ direction: "rtl", color: "#004a3a" }}
              >
                סגור
              </Button>
            </DialogActions>
          </Dialog>
          <div className="quesProgress">Q{quesNum}/5</div>
          <IconButton
            className="next-button-container"
            style={{ color: "#004a3a" }}
            onClick={handleNextClick}
          >
            {" "}
            <ArrowForwardIosOutlinedIcon />{" "}
          </IconButton>
        </div>
      </div>

      <div className="progress-bar-container">
        {console.log(percentage)}
        <div className="progress-bar" style={{ width: `${percentage}%` }}>
          {" "}
        </div>
      </div>

      <div className="words-container">{word}</div>

      <div className="answers-container">
        <button
          className="buttons-game correct-ans"
          data-index="1"
          onClick={handleAnswerClick}
          disabled={isButtonDisabled}
        >
          מילה נכונה
        </button>
        <button
          className="buttons-game wrong-ans"
          data-index="0"
          onClick={handleAnswerClick}
          disabled={isButtonDisabled}
        >
          {" "}
          טעות
        </button>
      </div>

      {gameOver && (
        <div className="popup">
          <div>
            <h4 className="popup-header">התחנה הסתיימה</h4>
            <p className="popup-p">קצת מידע על המילים:</p>
            {data.map((item, index) => (
              <div key={index}>
                {console.log(item.answer1)}
                <p className="popup-p">
                  {" "}
                  {item.question}: {item.answer1}
                </p>
              </div>
            ))}
          </div>
          <button onClick={handleFinish}>המשך </button>
        </div>
      )}
      {/* Exit Popup */}
      {showExitModal && (
        <div className="popup">
          <div className="exit-popup">
            <h4 className="popup-header">
              האם אתם בטוחים שברצונכם לצאת מהמשחק?
            </h4>
            <p>שימו לב❣ במידה ויצאתם באמצע הניקוד שצברתם עד כה לא יישמר</p>
            <div className="exit-buttons">
              <button onClick={handleExitYes}>חזרה למפה</button>
              <button onClick={handleExitNo}>המשך במשחק</button>
            </div>
          </div>
        </div>
      )}
      <FooterGraphic />
    </>
  );
}
