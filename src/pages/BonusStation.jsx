import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";
import GlitterSky from "../FuncComp/GlitterSky";
import Header from "../FuncComp/Header";
import MainContent from "../FuncComp/MainContent";

import ConfettiExplosion from "react-confetti-explosion";

import "./../css/BonusStation.css";

export default function BonusStation({ familyImg, MaxAgediffrence }) {
  const [groupData, setGroupData] = useState(null);
  const [ageDifference, setAgeDifference] = useState(0);
  const [txtToMainContent, setTxtToMainContent] = useState("");
  const [pointsContent, setPointsContent] = useState("");
  const [txtToBtn, setTxtToBtn] = useState("");

  const location = useLocation();
  const { source } = location.state || { source: null }; // Default to null if source is not provided

  const pastelColors = [
    "#8ACDD7",
    "#C3E2C2",
    "#FF90BC",
    "#FF8080",
    "#BEADFA",
    "#FDFFAE",
  ];
  const [showConfetti, setShowConfetti] = useState(true);
  // const txtToHeader = `!כל הכבוד משפחת ${groupData.groupName}`;
  //   let txtTomainContent = `הגעתם בהרכב מאוד מגוון.
  //   הפרש הגילאים בין האדם המבוגר ביותר לצעיר ביותר הינו
  //   ${ageDifference}
  //   שנים
  // `;

  // const bonusContent = `זכיתם ב ${ageDifference * 10} נקודות`;

  useEffect(() => {
    function fetchGroupDetails() {
      const groupCode = sessionStorage.getItem("groupCode");

      if (groupCode) {
        fetch(
          `https://localhost:7052/api/Group/GetGroupByGroupCode?groupCode=${groupCode}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Group Details:", data);
            setGroupData(data);

            //calculate the maximun age diffrence
            if (data.minAge && data.maxAge) {
              const diff = Math.abs(data.maxAge - data.minAge); //in abs value for consider if the user made mistake and inster min age bigger the max age
              setAgeDifference(diff);
            }
          })
          .catch((error) => {
            console.error("Error fetching group details:", error);
          });
      } else {
        console.log("No group code found in session storage.");
      }
    }

    // Call the function to fetch group details
    fetchGroupDetails();

    // Set up a timer to hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  //handle the source we get from game or from the register
  useEffect(() => {
    switch (source) {
      case "register":
        setTxtToMainContent(`הגעתם בהרכב מאוד מגוון. 
        הפרש הגילאים בין האדם המבוגר ביותר לצעיר ביותר הינו
        ${ageDifference} 
        שנים 
      `);

        setPointsContent(`זכיתם ב ${ageDifference * 10} נקודות`);

        setTxtToBtn("התחל במשחק");
        break;

      case "amfi":
        setTxtToMainContent("השלמתם את אתגר האמפי");
        setPointsContent(`זכיתם ב ${ageDifference * 10} נקודות`);
        break;
      default:
        break;
    }
  }, [source, ageDifference]); // Dependency array to ensure effect runs only when source changes

  //check if the user insert photo or emoji to the family photo
  const isImageUrl = (url) => {
    // Checks if the URL is likely an image URL by looking for image file extensions or a base64 data URI pattern
    return (
      /\.(jpeg|jpg|gif|png|svg)$/.test(url) ||
      /^data:image\/[a-zA-Z]+;base64,/.test(url)
    );
  };

  return (
    <div className="bonus-container">
      {groupData && (
        <>
          <Header textToHeader={` כל הכבוד משפחת ${groupData.groupName}`} />
          <div className="bonus-content">
            <MainContent textToMainContent={txtToMainContent} />
            <div className="points-content">
              <MainContent textToMainContent={pointsContent} />
            </div>
          </div>
          <div className="bonus-station-container">
            {showConfetti && (
              <div className="confetti-container">
                <ConfettiExplosion
                  colors={pastelColors} // Use pastel colors
                  angle={90} // Adjust the angle to control the direction of confetti fall
                />
              </div>
            )}
            {isImageUrl(groupData.photo) ? (
              <img
                src={groupData.photo}
                alt="familyPhoto"
                className="family-image"
              />
            ) : (
              <div className="family-emoji">{groupData.photo}</div>
            )}
          </div>
          <MainButton textToBtn={txtToBtn} />
        </>
      )}
      {!groupData && <h2>...טוען את פרטי הקבוצה</h2>}
      <FooterGraphic />
    </div>
  );
}
