import React from "react";
import "./../css/Games.css";

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { IconButton } from "@mui/material";
import FooterGraphic from "../FuncComp/FooterGraphic";

export default function WordGamePage2() {

    const percentage = (1 / 5) * 100;
    const Word = ["היפודרום"]

    return (
        <>
            <div className="container">
                
                <div className="quesProgress-container">
                    <div className="quesProgress">Q1/10</div>
                    <IconButton className="next-button-container" style={{color:"#004a3a"}}> <ArrowForwardIosOutlinedIcon /> </IconButton>
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
