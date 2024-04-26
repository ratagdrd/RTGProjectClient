import React, { useState, useEffect } from "react";

import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";
import GlitterSky from "../FuncComp/GlitterSky";
import Header from "../FuncComp/Header";
import MainContent from "../FuncComp/MainContent";

import ConfettiExplosion from 'react-confetti-explosion';

import "./../css/BonusStation.css";

export default function BonusStation({ familyImg, MaxAgediffrence }) {
  const pastelColors = ['#8ACDD7', '#C3E2C2', '#FF90BC', '#FF8080', '#BEADFA', '#FDFFAE']; // Example pastel colors
  const [showConfetti, setShowConfetti] = useState(true);
  const txtToHeader = "!כל הכבוד משפחת שנהב";
  let txtTomainContent = `הגעתם בהרכב מאוד מגוון. 
  הפרש הגילאים בין האדם המבוגר ביותר לצעיר ביותר הינו
  ${MaxAgediffrence} 
  שנים 
`;
  const bonusContent = `זכיתם ב ${MaxAgediffrence * 10} נקודות`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 50000); // Hide confetti after 5 seconds
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bonus-container">
      <Header textToHeader={txtToHeader} />
      <div className="bonus-content">
        <MainContent textToMainContent={txtTomainContent} />
      <MainContent textToMainContent={bonusContent} /></div>
      <div className="bonus-station-container">
        {showConfetti && (
          <div className="confetti-container">
            <ConfettiExplosion
              colors={pastelColors} // Use pastel colors
              angle={90} // Adjust the angle to control the direction of confetti fall
            />
          </div>
        )}
        <img src={familyImg} alt="familyPhoto" className="family-image" />
      </div>
      <MainButton textToBtn={"התחל במשחק"} />
      <FooterGraphic />
    </div>
  );
}
