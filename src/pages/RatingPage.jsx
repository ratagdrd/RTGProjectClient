import React, { useState, useEffect } from "react";

import "./../css/GeneralPages.css";

import Rating from "@mui/material/Rating";

import Header from "../FuncComp/Header";
import FooterGraphic from "../FuncComp/FooterGraphic";

const apiUrlActivity = location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
  `https://localhost:7052/api/Activity` :
  `https://proj.ruppin.ac.il/cgroup60/test2/tar4/api/Activity`;


export default function RatingPage() {
  const txtToHeader = "דעתכם חשובה לנו! ";

  const [activities, setActivities] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    // Fetch from Activity Data table
    fetch(apiUrlActivity, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((res) => res.json())
      .then(
        (activities) => {
          console.log("Activities fetch result: ", activities);
          setActivities(activities); // Set activities state based on the fetched data
          setRatings(new Array(activities.length).fill(0)); // Initialize ratings array based on number of activities
        },
        (error) => {
          console.log("Error fetching activity data:", error);
        }
      );
  };

  const handleRatingChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
    console.log(newRatings);

    // Update rating in the database
    // updateRatingInDatabase(activities[index].activitycode, value);
  };

  const submitRatings = () => {
    ratings.forEach((rating, index) => {
      if (rating > 0) {
        // Only update if rating is greater than 0
        updateRatingInDatabase(activities[index].activitycode, rating);
      }
    });
    setSubmitted(true);
  };

  const updateRatingInDatabase = (activitycode, newRate) => {
    const apiUrlRate = location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
  `https://localhost:7052/api/Activity/${activitycode}/${newRate}` :
  `https://proj.ruppin.ac.il/cgroup60/test2/tar4/api/Activity/${activitycode}/${newRate}`;

    fetch(apiUrlRate, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ rate: newRate }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update rating in the database");
        }
        console.log(
          `Rating for activity ${activitycode} updated successfully.`
        );
      })
      .catch((error) => {
        console.error("Error updating rating in the database:", error);
      });
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <Header textToHeader={txtToHeader} />
        <h5>נשמח אם תוכלו לדרג את הפעילויות בתחנות הבאות</h5>
      </div>
      <div className="rating-container">
        {activities.map((activity, index) => (
          <p className="rating-station" key={index}>
            <Rating
              className="rating-stars"
              name={`rating-${index}`}
              value={ratings[index] || 0} // Default to 0 if the rating is not yet defined
              onChange={(event, value) => handleRatingChange(index, value)}
              precision={1} // Allow rating to be selected in increments of 1
              readOnly={submitted} // Make rating read-only after submission
            />
            <span className="rating-text">{activity.activityname}</span>
          </p>
        ))}
      </div>
      <div className="inner-container">
        {!submitted && (
          <button className="ranking-btn" onClick={submitRatings}>
            דרג את התחנות
          </button>
        )}
        {submitted && <h5 className="ranking-finish">תודה! נתראה בפעם הבאה!</h5>}
      </div>
      <div>
        <FooterGraphic />
      </div>
    </div>
  );
}
