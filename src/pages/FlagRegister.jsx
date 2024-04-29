import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

import { useNavigate, useLocation } from "react-router-dom";

import "@fontsource/roboto";
import "./../css/Flag.css";
import flag from "../images/flag.png";

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { Button, Select, MenuItem } from "@mui/material";

import Header from "../FuncComp/Header";
import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";

const FlagRegisterComp = () => {
  const [image, setImage] = useState(null);
  const [emoji, setEmoji] = useState("");
  const [usingCamera, setUsingCamera] = useState(false);
  const [groupData, setGroupData] = useState({});

  const webcamRef = React.useRef(null);

  const emojis = ["😀", "🐨", "🐶", "🦛", "👨‍👩‍👧‍👦"];

  const theme = createTheme({ direction: "rtl" });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const txtToHeader = "יצירת דגל קבוצה";
  const txtToBtn = "שמור דגל";

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.groupData) {
      setGroupData(location.state.groupData);
      console.log(
        "Group data set from location state:",
        location.state.groupData
      );
    }
  }, [location.state]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setEmoji("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (event) => {
    const selectedEmoji = event.target.value;
    setEmoji(selectedEmoji);
    setImage(null);
  };

  const handleStartCamera = () => {
    setUsingCamera(!usingCamera);
    setEmoji("");
    setImage(null);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setEmoji("");
    setUsingCamera(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const defaultEmoji = "😄";
    // // //if the user dont choose emoji or photo he gets the default one
    // // if (!emoji && !image) {
    // //   setEmoji(defaultEmoji);
    // // }

    let photoData = image; // Prioritize the image first
    if (!photoData) {
      // If the user dont choose image, we check for emoji
      photoData = emoji || "😄"; // we use the emoji if available, otherwise we use the default emoji
    }

    console.log(typeof groupData);
    console.log("this is the group data", groupData);
    const updateGroupData = { ...groupData, photo: photoData };
    console.log("update dada:", updateGroupData);

    const apiUrl = "https://localhost:7052/api/Group/postTest";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json; charset=UTF-8",
      },
      body: JSON.stringify(updateGroupData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        const groupCode = data;
        console.log("Inserted groupCode:", groupCode);
        sessionStorage.setItem("groupCode", groupCode);

        //navigate to the add points page
        navigate("/bonusStation", { state: { source: "register" } });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("error");
        // Handle errors here, perhaps showing an error message to the user.
      });

    // console.log("Selected Image or Emoji:", image || emoji || "😄");
  };

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Header textToHeader={txtToHeader}></Header>
            </Row>
            <div style={{ marginLeft: 50 }}>
              <Row className="mb-3 " style={{ marginTop: "50px" }}>
                <Col xs={9} className="d-flex align-items-center">
                  <Select
                    fullWidth
                    value={emoji}
                    onChange={handleEmojiSelect}
                    label="Emoji"
                    variant="standard"
                    displayEmpty
                    renderValue={(selected) => selected || "בחר אימוג'י"}
                  >
                    <MenuItem value="" disabled>
                      בחר אימוג'י
                    </MenuItem>
                    {emojis.map((emojiValue, index) => (
                      <MenuItem key={index} value={emojiValue}>
                        {emojiValue}
                      </MenuItem>
                    ))}
                  </Select>
                </Col>
                <Col xs={3} className="d-flex align-items-center">
                  <AddReactionOutlinedIcon />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={9}>
                  <input
                    className="font-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <hr />
                </Col>
                <Col xs={3} className=" d-flex align-items-center">
                  <AddAPhotoOutlinedIcon />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={9}>
                  <input
                    className="font-input"
                    type="button"
                    style={{
                      color: "black",
                      fontFamily: "Rubik",
                      fontSize: "16px",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    value={usingCamera ? "סגור תמונה" : "צלם תמונה"}
                    onClick={handleStartCamera}
                  />
                  <hr />
                </Col>
                <Col xs={3} className=" d-flex align-items-center">
                  <CameraAltOutlinedIcon />
                </Col>
              </Row>
            </div>
            {usingCamera && (
              <div>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{ width: "100%" }}
                />
                <Button
                  onClick={capturePhoto}
                  style={{ color: "black", border: "1px solid black" }}
                >
                  <PanoramaFishEyeOutlinedIcon />
                </Button>
              </div>
            )}

            <div>
              {(image || emoji) && (
                <div className="flag-container">
                  <img src={flag} alt="Flag" className="flag-image" />
                  {image && (
                    <img src={image} alt="Uploaded" className="family-image" />
                  )}
                  {emoji && <span className="family-icon">{emoji}</span>}
                </div>
              )}
              <div className="button-style" style={{ marginTop: "100px" }}>
                <MainButton textToBtn={txtToBtn} />
              </div>
            </div>
          </form>

          <div className="footer-style">
            <FooterGraphic />
          </div>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default FlagRegisterComp;
