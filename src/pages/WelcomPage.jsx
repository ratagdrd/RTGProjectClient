import React, { useState, useEffect } from "react";
import Header from "../FuncComp/Header";
import MainContent from "../FuncComp/MainContent";
import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";
import Button from "@mui/material/Button";

import "./../css/Games.css";
import "./../css/GeneralPages.css";

export default function WelcomPage() {
  const [siteDetails, setSiteDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    fetch("https://localhost:7052/api/Site/1", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (site) => {
          console.log("fetch result: ", site);
          setSiteDetails(site);
        },
        (error) => {
          console.log("Error fetching word data:", error);
        }
      );
  };
  const txtToBtn = "יצירת קבוצה";
  const txtTomainContent = "!צרו קבוצה והתחילו לשחק";
  const txtToHeader = "ברוכים הבאים לאתר קיסריה";

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div>
      <div className="welcome-header">
        <Header textToHeader={txtToHeader} />
      </div>
      <div className="welcome-content">
        <MainContent textToMainContent={txtTomainContent} />
      </div>
      <div className="welcome-buttons">
        <MainButton textToBtn={txtToBtn} navigateTo={"/signTest"} />
      </div>
      <Button
        variant="text"
        className="welcome-site"
        onClick={handleShowDetails}
      >
        לחצו לצפייה בפרטי האתר
      </Button>
      <FooterGraphic />
      {showDetails && (
        <div className="popup">
          <div>
            <h4 className="popup-header">פרטי האתר</h4>
            <p className="popup-p">
              <span className="bold-text">שם האתר:</span>{" "}
              {siteDetails?.siteName}
            </p>
            <p className="popup-p">
              <span className="bold-text">תיאור:</span>{" "}
              {siteDetails?.sDescription}
            </p>
            <p className="popup-p">
              <span className="bold-text">טלפון:</span> {siteDetails?.phoneNo}
            </p>
            <p className="popup-p">
              <span className="bold-text">שעות פתיחה:</span>{" "}
              {siteDetails?.openingHours}
            </p>
            <p className="popup-p">
              <span className="bold-text">אתר אינטרנט:</span>{" "}
              <a href={siteDetails?.webSite} target="_blank">
                {siteDetails?.webSite}
              </a>
            </p>
          </div>

          <button onClick={handleCloseDetails}>סגור</button>
        </div>
      )}
    </div>
  );
}
