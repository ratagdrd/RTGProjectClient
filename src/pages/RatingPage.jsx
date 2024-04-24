import React, { useState, useEffect } from "react";

import "./../css/GeneralPages.css";

import Rating from '@mui/material/Rating';

import Header from "../FuncComp/Header";
import FooterGraphic from "../FuncComp/FooterGraphic";
import { log } from "three/examples/jsm/nodes/Nodes.js";

export default function RatingPage() {

    const txtToHeader = "דעתכם חשובה לנו! ";

    const [activities, setActivities] = useState([]);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = () => {
        // Fetch from Activity Data table
        fetch("https://localhost:7052/api/Activity", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => res.json())
            .then(
                (activities) => {
                    console.log("Activities fetch result: ", activities);
                    setActivities(activities); // Set activities state based on the fetched data
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
         updateRatingInDatabase(activities[index].activitycode, value);
    };

    const updateRatingInDatabase = (activitycode, newRate) => {
        fetch(`https://localhost:7052/api/Activity/${activitycode}/${newRate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ rate: newRate }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update rating in the database');
                }
                console.log(`Rating for activity ${activitycode} updated successfully.`);
            })
            .catch(error => {
                console.error('Error updating rating in the database:', error);
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
                        />
                        <span className="rating-text">{activity.activityname}</span>
                    </p>
                ))}
            </div>
            <div className="inner-container">
                <h5>תודה! נתראה בפעם הבאה!</h5>
            </div>
            <div><FooterGraphic /></div>
        </div>
    );
}