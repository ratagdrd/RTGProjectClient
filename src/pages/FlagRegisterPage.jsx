import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Header from '../FuncComp/Header';
import MainButton from '../FuncComp/MainButton';
import Webcam from "react-webcam";
import "@fontsource/roboto";
import "./../css/Flag.css";
import flag from "../images/flag.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Select, MenuItem } from "@mui/material";
import FooterGraphic from "../FuncComp/FooterGraphic";

function FlagRegisterPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [usingCamera, setUsingCamera] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const theme = createTheme({ direction: 'rtl' })
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    const txtToHeader = "יצירת דגל קבוצה";
    const txtToBtn = "שמור דגל";

    const groupCode = sessionStorage.getItem("groupCode");
    const webcamRef = React.useRef(null);
    const emojis = ["😀", "🐨", "🐶", "🐼", "👨‍👩‍👧‍👦", "😎"];


    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setSelectedEmoji(''); // Reset selected emoji when an image is selected
        setImageUrl(URL.createObjectURL(file)); // Generate URL for uploaded image to be shown
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
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setSelectedImage(imageSrc);
        setSelectedEmoji("");
        setUsingCamera(false);
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedImage && !selectedEmoji) {
            console.error('No image or emoji selected.');
            return;
        }
        const apiUrl = selectedImage ?
            `https://localhost:7052/api/Group/Upload?groupCode=${groupCode}` :
            `https://localhost:7052/api/Group/putEmoji?groupCode=${groupCode}&emoji=${selectedEmoji}`;


        const formData = new FormData();
        if (selectedImage) {
            formData.append('files', selectedImage);
        } else {
            formData.append('files', selectedEmoji || "😄");
        }

        fetch(apiUrl, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Image uploaded successfully:", result);
                    // Do something with the response
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
                                        onChange={handleFileSelect}
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
                                        <img src={imageUrl} alt="Uploaded" className="family-image" />
                                    )}
                                    {selectedEmoji && <span className="family-icon">{selectedEmoji}</span>}
                                </div>
                            )}
                            <div className="button-style">
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
}

export default FlagRegisterPage;
