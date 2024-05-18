import React from "react";

import MainButton from "../FuncComp/MainButton";
import Header from "../FuncComp/Header";

export default function AllGamesPage() {
  return (
    <>
      <div className="container" style={{ height: "100vh", marginTop: "10%" }}>
        <Header textToHeader={"משחקים"} />
        <MainButton
          textToBtn={"משחק המילים"}
          navigateTo={"/cgroup60/test2/tar3/WordGameInst"}
        />
        <MainButton
          textToBtn={"טריוויה"}
          navigateTo={"/cgroup60/test2/tar3/Trivia"}
        />
        <hr />
        <Header textToHeader={"AR"} />
        <MainButton
          textToBtn={"שחזור פסל הנואם"}
          navigateTo={"/cgroup60/test2/tar3/theSpeaker"}
        />
        <MainButton
          textToBtn={"שחזור ההיפודרום"}
          navigateTo={"/cgroup60/test2/tar3/hipodrom"}
        />
        <MainButton
          textToBtn={"שחזור נמל"}
          navigateTo={"/cgroup60/test2/tar3/port"}
        />
        <MainButton
          textToBtn={"צפייה באמפי ממבט עילי"}
          navigateTo={"/cgroup60/test2/tar3/amfi"}
        />
        <MainButton
          textToBtn={"שחזור ארמון הורדוס"}
          navigateTo={"/cgroup60/test2/tar3/Video"}
        />
        <hr />
        <Header textToHeader={"דירוג"} />
        <MainButton
          textToBtn={"דירוג התחנות"}
          navigateTo={"/cgroup60/test2/tar3/Rating"}
        />
      </div>
    </>
  );
}
