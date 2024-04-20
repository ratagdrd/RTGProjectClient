import React from "react";

import "./../css/GeneralPages.css";

import Rating from '@mui/material/Rating';

import Header from "../FuncComp/Header";
import FooterGraphic from "../FuncComp/FooterGraphic";

export default function RatingPage() {
    const txtToHeader = "דעתכם חשובה לנו! ";

    return (

        <div className="outer-container">
            <div className="inner-container">
                <Header textToHeader={txtToHeader} />
                <h5>נשמח אם תוכלו לדרג את הפעילויות בתחנות הבאות</h5>
            </div>
            <div className="rating-container">
                <p className="rating-station">
                    <Rating className="rating-stars" name="no-value" value={null} />
                    <span className="rating-text"> אמפי תיאטרון</span>
                </p>
                <p className="rating-station">
                    <Rating className="rating-stars" name="no-value" value={null} />
                    <span className="rating-text">היפודרום</span>
                </p>
                <p className="rating-station">
                    <Rating className="rating-stars" name="no-value" value={null} />
                    <span className="rating-text">ארמון הצוק</span>
                </p>
            </div>
            <div className="inner-container">
            <h5>תודה! נתראה בפעם הבאה!</h5>
            </div>
            <div><FooterGraphic /></div>
        </div>
    );
}