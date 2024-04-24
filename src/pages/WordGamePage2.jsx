import React, { useState } from 'react';
import "./../css/Games.css";
import { useEffect } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FooterGraphic from "../FuncComp/FooterGraphic";
import InfoIcon from '@mui/icons-material/Info';

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
    const [darkenBackground, setDarkenBackground] = useState(false);

    const percentage = (quesNum / 5) * 100;


    useEffect(() => {
        onLoad();
    }, []);


    const onLoad = () => {
        fetch("https://localhost:7052/api/QuestionForActivity/2", {
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
                    fillWord(result);
                    const pointsFromDatabase = result[currentQues]["noOfPoints"];
                    setTotalPoints(pointsFromDatabase);
                    setPoints(pointsFromDatabase);
                    // Process the result as needed
                },
                (error) => {
                    console.log("Error fetching word data:", error);
                }
            );
        // Fetch from Activity Data table
        fetch("https://localhost:7052/api/Activity", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => res.json())
            .then(
                (activities) => {
                    console.log("Activities fetch result: ", activities);
                    // Filter activities to find the one with activity code 2
                    const activity = activities.find(activity => activity.activitycode === 2);
                    if (activity) {
                        console.log("Activity with code 2:", activity);
                        const instructions = activity && activity.instruction ? activity.instruction : '';
                        console.log(instructions);
                        setInstructions(instructions); // Set instructions state based on the fetched data
                    } else {
                        console.log("Activity with code 2 not found.");
                    }
                    // Process the result as needed
                },
                (error) => {
                    console.log("Error fetching activity data:", error);
                }
            );
    };


    const fillWord = (data) => {
        console.log("current before the if " + currentQues);
        if (currentQues == 5) {
            setGameOver(true);
            console.log(quesNum);
            setCurrentQues(quesNum);
            return;
        }
        console.log(currentQues);
        setWord(data[currentQues]["question"]);
        setQuesNum(data[currentQues]["questionNo"]);

    }
    useEffect(() => {
        if (currentQues !== 0) {
            fillWord(data);
        }
    }, [currentQues]);



    const handleAnswerClick = (event) => {
        const index = event.target.dataset.index;
        console.log(index);
        const message = index == 1 ? " כל הכבוד! זכיתם ב" + points + " נקודות " : "אולי בפעם הבאה";
        setPopupMessage(message);

        // Increment points if correct answer
        if (index == 1) {
            setTotalPoints(prevTotalPoints => prevTotalPoints + points);
            console.log("points:" + totalPoints);
        }

        // Hide the message after 3 seconds
        setTimeout(() => {
            setPopupMessage(null);
            if (currentQues < 5) {
                console.log("current on the if " + currentQues);
                setCurrentQues(prevCurrentQues => prevCurrentQues + 1);
            }
            console.log(currentQues);
        }, 3000);
    };



    const handleInfoClick = () => {
        setShowInfo(!showInfo);
    };
    const handleInfoClose = () => {
        setShowInfo(false);
    };

    useEffect(() => {
        if (gameOver) {
          setDarkenBackground(true);
        }
      }, [gameOver]);



    return (
        <>
            <div className={`container ${darkenBackground ? 'darken-background' : ''}`}>
                {popupMessage && <div className="popup-message">{popupMessage}</div>}
                <div className="quesProgress-container">
                    <IconButton onClick={handleInfoClick}>
                        <InfoIcon />
                    </IconButton>
                    <Dialog open={showInfo} onClose={handleInfoClose}>
                        <DialogTitle className="instructions" style={{ direction: "rtl", padding: "10px 14px" }}> הוראות</DialogTitle>
                        <DialogContent style={{ direction: "rtl", width: '350px', padding: "0px 14px 10px" }}>
                            <Typography className="instructions" > {Instructions} </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleInfoClose} style={{ direction: "rtl", color: "#004a3a" }}>
                                סגור
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className="quesProgress">Q{quesNum}/5</div>
                    <IconButton className="next-button-container" style={{ color: "#004a3a" }}> <ArrowForwardIosOutlinedIcon /> </IconButton>
                </div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }}>  </div>
            </div>

            <div className="words-container">
                {word}
            </div>

            <div className="answers-container">
                <button className="buttons-game correct-ans" data-index="1" onClick={handleAnswerClick}>מילה נכונה</button>
                <button className="buttons-game wrong-ans" data-index="0" onClick={handleAnswerClick}> טעות</button>
            </div>

            {gameOver && (
                <div className="game-over-popup" >
                    <div >
                        <h4 className='game-over-header'>התחנה הסתיימה</h4>
                        <p className='game-over-p'>קצת מידע על המילים:</p>
                        {data.map((item, index) => (
                            <div key={index}>
                                {console.log(item.answer1)}
                                <p className='game-over-p'> {item.question}: {item.answer1}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setGameOver(false)}>המשך </button>
                </div>
            )}
            <FooterGraphic />

        </>
    );
}
