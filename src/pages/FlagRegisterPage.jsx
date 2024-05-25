import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import Webcam from "react-webcam";

import "@fontsource/roboto";
import "./../css/Flag.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";

import { Button, Select, MenuItem } from "@mui/material";

import Header from "../FuncComp/Header";
import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";

function FlagRegisterPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [usingCamera, setUsingCamera] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  const navigate = useNavigate();


  //Adding a 100px margin-top when the user opens the camera, else 0px
  const changeCSS = (property, value) => {
    const header = document.querySelector(".header");
    if (header) {
      header.style[property] = value;
    }
  };

  const theme = createTheme({ direction: "rtl" });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const txtToHeader = "יצירת דגל קבוצה";
  const txtToBtn = "שמור דגל";

  const groupCode = sessionStorage.getItem("groupCode");
  const webcamRef = React.useRef(null);
  const emojis = ["😀", "🐨", "🐶", "🐼", "👨‍👩‍👧‍👦", "😎"];
  const flag =
    "https://proj.ruppin.ac.il/cgroup60/test2/tar1/Images/flag/flag.png";

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const uniqueFileName = `${timestamp}-${file.name}`;

      // Create a new File object with the unique name
      const fileWithNewName = new File([file], uniqueFileName, {
        type: file.type,
      });

      setSelectedImage(fileWithNewName);
      setSelectedEmoji("");
      setImageUrl(URL.createObjectURL(file)); // Create a URL for preview

      console.log("Unique filename:", uniqueFileName);
    }
  };

  const handleEmojiSelect = (e) => {
    setSelectedEmoji(e.target.value);
    console.log(selectedEmoji);
    setSelectedImage(null); // Reset selected image when an emoji is selected
    setImageUrl(null);
  };

  const handleStartCamera = () => {
    setUsingCamera(!usingCamera);
    setSelectedEmoji("");
    setSelectedImage(null);
    setIsFooterVisible(usingCamera);
    changeCSS("marginTop", !usingCamera ? "100px" : "0");
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `webcam-photo-${timestamp}.jpg`;
    fetch(imageSrc)
      .then((res) => res.blob()) //convert the photo from base64 to blob so are server will know to handle the file
      .then((blob) => {
        const file = new File([blob], fileName, {
          type: "image/jpeg",
        });
        setSelectedImage(file);
        setImageUrl(imageSrc);
        setSelectedEmoji("");
        setUsingCamera(false);
        changeCSS("marginTop", "0");
      });
    setIsFooterVisible(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Used when the user does not select an emoji or photo.
    const defaultEmoji = "😄";
    let apiUrl;
    let formData = new FormData();

    if (selectedImage) {
      apiUrl = `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/Upload?groupCode=${groupCode}`;
      // apiUrl =
      //   location.hostname === "localhost" || location.hostname === "127.0.0.1"
      //     ? `https://localhost:7052/api/Group/Upload?groupCode=${groupCode}`
      //     : `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/Upload?groupCode=${groupCode}`;

      formData.append("files", selectedImage);
    } else {
      const emojiToSend = selectedEmoji || defaultEmoji;
      apiUrl = `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/putEmoji?groupCode=${groupCode}&emoji=${emojiToSend}`;
      // apiUrl =
      //   location.hostname === "localhost" || location.hostname === "127.0.0.1"
      //     ? `https://localhost:7052/api/Group/putEmoji?groupCode=${groupCode}&emoji=${emojiToSend}`
      //     : `https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Group/putEmoji?groupCode=${groupCode}&emoji=${emojiToSend}`;
      formData.append("files", emojiToSend);
    }

    fetch(apiUrl, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Image uploaded successfully:", result);
          navigate("/cgroup60/test2/tar3/bonusStation", {
            state: { source: "register" },
          });
        },
        (error) => {
          console.error("Error uploading image:", error);
        }
      );
  };

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Header textToHeader={txtToHeader}></Header>
            </Row>
            <Row className="mb-3">
              <h6>בחרו אימוג'י או תמונה קבוצתית</h6>
            </Row> 
            <div style={{ marginLeft: 50 }}>
              <Row className="mb-3 " style={{ marginTop: "50px" }}>
                <Col xs={9} className="d-flex align-items-center">
                  <Select
                    fullWidth
                    value={selectedEmoji}
                    onChange={handleEmojiSelect}
                    label="Emoji"
                    variant="standard"
                    displayEmpty
                    renderValue={(selected) => selected || "בחרו אימוג'י"}
                    disabled={usingCamera} // Disable when using camera
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
                    onChange={handleFileSelect}
                    disabled={usingCamera} // Disable when using camera
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
              {(selectedImage || selectedEmoji) && (
                <div className="flag-container">
                  <img src={flag} alt="Flag" className="flag-image" />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="family-image"
                    />
                  )}
                  {selectedEmoji && (
                    <span className="family-icon">{selectedEmoji}</span>
                  )}
                </div>
              )}
              <div className="button-style">
                <MainButton textToBtn={txtToBtn} />
              </div>
            </div>
          </form>

          <div
            className={`footer-style ${!isFooterVisible && "footer-hidden"}`}
          >
            <FooterGraphic />
          </div>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default FlagRegisterPage;
