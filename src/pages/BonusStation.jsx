import React from "react";

import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";
import GlitterSky from "../FuncComp/GlitterSky";
import Header from "../FuncComp/Header";
import MainContent from "../FuncComp/MainContent";

import "./../css/BonusStation.css";

export default function BonusStation({ familyImg, MaxAgediffrence }) {
  const txtToHeader = "!כל הכבוד משפחת שנהב";
  let txtTomainContent = `הגעתם בהרכב מאוד מגוון. 
  הפרש הגילאים בין האדם המבוגר ביותר לצעיר ביותר הינו
  ${MaxAgediffrence} 
  שנים 
`;
  const bonusContent = `זכיתם ב ${MaxAgediffrence * 10} נקודות`;
  return (
    <div>
      <Header textToHeader={txtToHeader} />
      <MainContent textToMainContent={txtTomainContent} />
      <MainContent textToMainContent={bonusContent} />
      <div className="bonus-station-container">
        <GlitterSky />
        <img src={familyImg} alt="familyPhoto" className="family-image" />
      </div>
      <MainButton textToBtn={"התחל במשחק"} />
      <FooterGraphic />
    </div>
  );
}
