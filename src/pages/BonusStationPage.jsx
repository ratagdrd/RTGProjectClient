import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";

import Header from "../FuncComp/Header";
import MainContent from "../FuncComp/MainContent";

import ConfettiExplosion from "react-confetti-explosion";

import "./../css/BonusStation.css";

export default function BonusStationPage() {
  const [groupData, setGroupData] = useState(null);
  const [ageDifference, setAgeDifference] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
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

  const groupCode = sessionStorage.getItem("groupCode");

  const apiUrl = `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/GetGroupByGroupCode?groupCode=${groupCode}`;
  // const apiUrl =
  //   window.location.hostname === "localhost" ||
  //   location.hostname === "127.0.0.1"
  //     ? `https://localhost:7052/api/Group/GetGroupByGroupCode?groupCode=${groupCode}`
  //     : `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/GetGroupByGroupCode?groupCode=${groupCode}`;

  useEffect(() => {
    function fetchGroupDetails() {
      if (groupCode) {
        fetch(apiUrl, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
        })
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
            setTotalPoints(data.totalPoints);
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

  //handle the source we get from game or from the register page
  useEffect(() => {
    switch (source) {
      case "register":
        setTxtToMainContent(`הגעתם בהרכב מאוד מגוון. 
        הפרש הגילאים בין האדם המבוגר ביותר לצעיר ביותר הינו
        ${ageDifference} 
        שנים 
      `);

        setPointsContent(`זכיתם ב ${totalPoints} נקודות`);

        setTxtToBtn("המשך");
        break;

      case "amfi":
        setTxtToMainContent("השלמתם את אתגר האמפי");
        setPointsContent(`צברתם עד כה ${totalPoints} נקודות`);
        setTxtToBtn("המשך");
        break;
      case "tsuk":
        setTxtToMainContent("השלמתם את אתגר הצוק");
        setPointsContent(`צברתם עד כה ${totalPoints} נקודות`);
        setTxtToBtn("המשך");
        break;
      default:
        break;
    }
  }, [source, ageDifference, totalPoints]);

  // check if the user insert photo or emoji to the family photo
  const isImageUrl = (photoName) => {
    // Checks if the URL is likely an image URL by looking for image file extensions
    console.log(photoName);
    return /\.(jpeg|jpg|gif|png|svg)$/.test(photoName);
  };

  //Construct the URL to fetch the group photo from the appropriate server (local or Ruppin) based on the environment
  // let groupPhotoUrl = "";
  // if (groupData && groupData.photo) {
  //   groupPhotoUrl =
  //     window.location.hostname === "localhost" ||
  //     window.location.hostname === "127.0.0.1"
  //       ? `https://localhost:7052/Images/${groupData.photo}`
  //       : `https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/${groupData.photo}`;
  // }
  return (
    <div className="bonus-container">
      {groupData && (
        <>
          <Header textToHeader={` כל הכבוד  ${groupData.groupName}`} />
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
                  colors={pastelColors}
                  angle={90} // Adjust the angle to control the direction of confetti fall
                />
              </div>
            )}
            {isImageUrl(groupData.photo) ? (
              <img
                // src={`https://localhost:7052/Images/${groupData.photo}`}
                // src={groupPhotoUrl}
                // `https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/${groupData.photo}`

                src={`https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/${groupData.photo}`}
                alt="familyPhoto"
                className="family-image-bonus"
              />
            ) : (
              <div className="family-emoji-bonus">{groupData.photo}</div>
            )}
          </div>
          <MainButton
            textToBtn={txtToBtn}
            navigateTo={"/cgroup60/test2/tar3/AllGamesPage"}
          />
        </>
      )}
      {!groupData && (
        <div>
          <h2>...טוען את פרטי הקבוצה</h2>
        </div>
      )}
      <FooterGraphic />
    </div>
  );
}
