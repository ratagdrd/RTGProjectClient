import React from "react";

import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";
import MainContent from "../FuncComp/MainContent";
import Header from "../FuncComp/Header";

export default function AllGamesPage() {
  return (
    <>
      <Header textToHeader={"משחקים"} />
      <MainButton textToBtn={"משחק המילים"} navigateTo={"/WordGameInst"} />
      <MainButton textToBtn={"טריוויה"} navigateTo={"/Trivia"} />
      <hr />
      <Header textToHeader={"AR"} />
      <MainButton textToBtn={"שחזור פסל הנואם"} navigateTo={"/theSpeaker"} />
      <MainButton textToBtn={"שחזור ההיפודרום"} navigateTo={"/hipodrom"} />
      <MainButton textToBtn={"שחזור נמל"} navigateTo={"/port"} />
      <MainButton textToBtn={"צפייה באמפי ממבט עילי"} navigateTo={"/amfi"} />
      <MainButton textToBtn={"שחזור ארמון הורדוס"} navigateTo={"/Video"} />
      <hr />
      <Header textToHeader={"דירוג"} />
      <MainButton textToBtn={"דירוג התחנות"} navigateTo={"/Rating"} />

      <FooterGraphic />
    </>
  );
}
