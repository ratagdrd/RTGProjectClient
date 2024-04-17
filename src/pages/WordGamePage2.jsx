import React, { useState } from 'react';
import "./../css/Games.css";

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FooterGraphic from "../FuncComp/FooterGraphic";
import InfoIcon from '@mui/icons-material/Info';

export default function WordGamePage2() {

    const handleInfoClick = () => {
        setShowInfo(!showInfo);
    };
    const handleInfoClose = () => {
        setShowInfo(false);
    };


    const [showInfo, setShowInfo] = useState(false);
    const percentage = (1 / 5) * 100;
    const Word = ["היפודרום"];
    const Instructions = "נציג מהמקריאים אומר בקול את המילה הכתובה על המסך (שימו לב- המטרה שהמנחשים ישמעו את המילה גם בלי שתצעקו!). קבוצת השומעים תשלח נציג לבמה שיאמר את המילה ששמעו בכל שלב החליפו נציגים. ";

    return (
        <>
            <div className="container">

                <div className="quesProgress-container">
                    <IconButton onClick={handleInfoClick}>
                        <InfoIcon />
                    </IconButton>
                    <Dialog open={showInfo} onClose={handleInfoClose}>
                        <DialogTitle className="instructions" style={{ direction: "rtl" ,padding:"10px 14px" }}> הוראות</DialogTitle>
                        <DialogContent style={{ direction: "rtl", width: '350px' , padding:"0px 14px 10px"}}>
                            <Typography className="instructions" > {Instructions} </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleInfoClose} style={{ direction: "rtl", color: "#004a3a" }}>
                                סגור
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className="quesProgress">Q1/5</div>
                    <IconButton className="next-button-container" style={{ color: "#004a3a" }}> <ArrowForwardIosOutlinedIcon /> </IconButton>
                </div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }}>  </div>
            </div>

            <div className="words-container">
                {Word}
            </div>

            <div className="answers-container">
                <button className="buttons-game correct-ans">מילה נכונה</button>
                <button className="buttons-game wrong-ans"> טעות</button>
            </div>


            <FooterGraphic />

        </>
    );
}
