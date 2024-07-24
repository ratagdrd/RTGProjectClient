import React, { useState, useEffect } from "react";

import MainButton from "../FuncComp/MainButton";

import NotAccessibleIcon from "@mui/icons-material/NotAccessible";
export default function AllGamesPage() {
  const [activityStatuses, setActivityStatuses] = useState({});
  const [groupRoadType, setgroupRoadType] = useState(null);
  const groupCode = sessionStorage.getItem("groupCode");
  const containerStyle = {
    backgroundImage: `url(https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/background/background5.webp)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    overflow: "auto",
  };

  const triviaButtonStyle = {
    position: "absolute",
    opacity: 0.85, // Adjust the opacity to make the buttons more transparent
    width: "115px",
    top: 60, // used to be 70
    right: 30,
  };
  const triviaIconStyle = {
    position: "relative",
    right: 15,
    backgroundColor: "rgba(26, 95, 85, 1)", // background with transparency
    borderRadius: "4px",
    padding: "2px",
  };

  const amfiButtonStyle = {
    position: "absolute",
    opacity: 0.85, // Adjust the opacity to make the buttons more transparent
    width: "115px",
    top: 510, //used to be 530
    left: 220,
  };
  const amfiIconStyle = {
    position: "relative",
    right: 15,
    backgroundColor: "rgba(26, 95, 85, 1)", // background with transparency
    borderRadius: "4px",
    padding: "2px",
  };

  const speakerButtonStyle = {
    position: "absolute",
    opacity: 0.85, // Adjust the opacity to make the buttons more transparent
    width: "115px",
    top: 180, //used to be 200
    left: 250,
  };
  const speakerIconStyle = {
    position: "relative",
    right: 5,
    backgroundColor: "rgba(26, 95, 85, 1)", // background with transparency
    borderRadius: "4px",
    padding: "2px",
  };

  const hipodromButtonStyle = {
    position: "absolute",
    opacity: 0.85, // Adjust the opacity to make the buttons more transparent
    width: "135px",
    top: 280, //used to be 330
    left: 60, //used to be 40
  };
  const hipodromIconStyle = {
    position: "relative",
    right: 5,
    backgroundColor: "rgba(26, 95, 85, 1)", // background with transparency
    borderRadius: "4px",
    padding: "2px",
  };

  const portButtonStyle = {
    position: "absolute",
    opacity: 0.85, // Adjust the opacity to make the buttons more transparent
    width: "115px",
    top: 550, //used to be 650
    left: 40,
  };
  const portIconStyle = {
    position: "relative",
    right: 15,
    backgroundColor: "rgba(26, 95, 85, 1)", // background with transparency
    borderRadius: "4px",
    padding: "2px",
  };

  const theaterButtonStyle = {
    position: "absolute",
    opacity: 0.85, // Adjust the opacity to make the buttons more transparent
    width: "115px",
    top: 360, //used to be 400
    left: 200,
  };
  const theaterIconStyle = {
    position: "relative",
    right: 6,
    backgroundColor: "rgba(26, 95, 85, 1)", // background with transparency
    borderRadius: "4px",
    padding: "2px",
  };

  const palaceButtonStyle = {
    position: "absolute",
    opacity: 0.85, // Adjust the opacity to make the buttons more transparent
    width: "100px",
    top: 60, //used to be 70
  };
  const palaceIconStyle = {
    position: "relative",
    right: 5,
    backgroundColor: "rgba(26, 95, 85, 1)", // background with transparency
    borderRadius: "4px",
    padding: "2px",
  };

  const rankButtonStyle = {
    position: "absolute",
    width: "250px",
    top: 640, //used to be 750
    right: 85, //used to be 70
    fontSize: "20px",
  };

  //fetch activity statuses and groupRoadType
  useEffect(() => {
    const fetchActivityStatuses = async () => {
      try {
        const activityCodes = [1, 2, 3, 4, 5, 6, 7];

        const promises = activityCodes.map(async (code) => {
          //https://localhost:7052/api/ActivityStatus?activitycode=${code}
          const response = await fetch(
            `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/ActivityStatus?activitycode=${code}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.json();
        });

        const results = await Promise.all(promises);
        console.log("Activity statuses fetched:", results);

        // Assuming results contain an array of objects with `code` and `data` properties
        const statuses = results.reduce((acc, result) => {
          acc[result.activitycode] = {
            isAccessible: result.isAccessible,
            isBlocked: result.isBlocked,
          };
          return acc;
        }, {});
        setActivityStatuses(statuses);
      } catch (error) {
        console.error("Error fetching activity statuses:", error);
        // Handle error scenarios (e.g., show an error message to the user)
      }
    };

    function fetchGroupRoadType() {
      if (groupCode) {
        fetch(
          `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/GetGroupByGroupCode?groupCode=${groupCode}`,
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json; charset=UTF-8",
              Accept: "application/json; charset=UTF-8",
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Group Details:", data);
            setgroupRoadType(data.roadType);
          })
          .catch((error) => {
            console.error("Error fetching group details:", error);
          });
      } else {
        console.log("No group code found in session storage.");
      }
    }

    fetchActivityStatuses();
    fetchGroupRoadType();
  }, []);

  // Function to check if activity is blocked
  const isActivityBlocked = (code) => {
    return activityStatuses[code] && activityStatuses[code].isBlocked === true;
  };

  // Function to check if activity is accessible
  const isActivityAccessible = (code) => {
    return (
      activityStatuses[code] && activityStatuses[code].isAccessible === true
    );
  };

  return (
    <>
      <div className="container AllGames-container " style={containerStyle}>
        {!isActivityBlocked(1) && (
          <div>
            <MainButton
              textToBtn={"טריוויה"}
              navigateTo={"/cgroup60/test2/tar3/Trivia"}
              style={triviaButtonStyle}
            >
              {groupRoadType === "A" && !isActivityAccessible(1) && (
                <NotAccessibleIcon style={triviaIconStyle} />
              )}
            </MainButton>
          </div>
        )}

        {!isActivityBlocked(2) && (
          <div>
            <MainButton
              textToBtn={"אמפי"}
              navigateTo={"/cgroup60/test2/tar3/WordGameInst"}
              style={amfiButtonStyle}
            >
              {groupRoadType === "A" && !isActivityAccessible(2) && (
                <NotAccessibleIcon style={amfiIconStyle} />
              )}
            </MainButton>
          </div>
        )}
        {!isActivityBlocked(3) && (
          <MainButton
            textToBtn={"הנואם"}
            navigateTo={"/cgroup60/test2/tar3/theSpeaker"}
            style={speakerButtonStyle}
          >
            {groupRoadType === "A" && !isActivityAccessible(3) && (
              <NotAccessibleIcon style={speakerIconStyle} />
            )}
          </MainButton>
        )}
        {!isActivityBlocked(4) && (
          <MainButton
            textToBtn={"ההיפודרום"}
            navigateTo={"/cgroup60/test2/tar3/hipodrom"}
            style={hipodromButtonStyle}
          >
            {groupRoadType === "A" && !isActivityAccessible(4) && (
              <NotAccessibleIcon style={hipodromIconStyle} />
            )}
          </MainButton>
        )}
        {!isActivityBlocked(5) && (
          <MainButton
            textToBtn={"נמל"}
            navigateTo={"/cgroup60/test2/tar3/port"}
            style={portButtonStyle}
          >
            {groupRoadType === "A" && !isActivityAccessible(5) && (
              <NotAccessibleIcon style={portIconStyle} />
            )}
          </MainButton>
        )}
        {!isActivityBlocked(6) && (
          <MainButton
            textToBtn={"תיאטרון"}
            navigateTo={"/cgroup60/test2/tar3/amfi"}
            style={theaterButtonStyle}
          >
            {groupRoadType === "A" && !isActivityAccessible(6) && (
              <NotAccessibleIcon style={theaterIconStyle} />
            )}
          </MainButton>
        )}
        {!isActivityBlocked(7) && (
          <MainButton
            textToBtn={"ארמון"}
            navigateTo={"/cgroup60/test2/tar3/Video"}
            style={palaceButtonStyle}
          >
            {groupRoadType === "A" && !isActivityAccessible(7) && (
              <NotAccessibleIcon style={palaceIconStyle} />
            )}
          </MainButton>
        )}
        <MainButton
          textToBtn={"סיום ודירוג התחנות"}
          navigateTo={"/cgroup60/test2/tar3/Rating"}
          style={rankButtonStyle}
        />
      </div>
    </>
  );
}
