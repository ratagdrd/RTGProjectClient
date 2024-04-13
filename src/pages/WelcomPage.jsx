import React from "react";
import Header from "../FuncComp/Header";
import MainContent from "../FuncComp/MainContent";
import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";

export default function WelcomPage() {
  const txtToBtn = "יצירת קבוצה";
  const txtTomainContent = "!צרו קבוצה והתחילו לשחק";
  const txtToHeader = "ברוכים הבאים לאתר קיסריה";
  const question = "1234";
  const answersList = ["a", "b", "c", "d"];
  return (
    <div>
      <Header textToHeader={txtToHeader} />
      <MainContent textToMainContent={txtTomainContent} />
      <MainButton textToBtn={txtToBtn} navigateTo={"/register"} />
      <MainButton textToBtn={"התחל טריוויה"} navigateTo={"/Trivia"} />
      <FooterGraphic />
    </div>
  );
}
