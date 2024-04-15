import React from "react";
import "./../css/GlitterSky.css";

// Function to generate a random color
const generateColor = () => {
  const hexCode = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function GlitterSky() {
  const glitterLength = 300;
  const glitters = Array.from({ length: glitterLength }, (_, index) => (
    <div
      key={index}
      className={`glitter`}
      style={{
        backgroundColor: generateColor(),
        left: `${Math.random() * 100}vw`,
      }}
    />
  ));

  return <div className="glitter-sky">{glitters}</div>;
}
