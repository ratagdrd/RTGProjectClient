import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { TextField, Grid, Select, MenuItem } from '@mui/material';
import Header from '../FuncComp/Header';
import MainButton from '../FuncComp/MainButton';
import FooterGraphic from '../FuncComp/FooterGraphic';

function ImagePost() {
  const theme = createTheme({ direction: 'rtl' })
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const txtToHeader = "ניסיון העלאת תמונה או אימוגי";
  const txtToBtn = "המשך";
  const groupCode=1;
  const emojis = ["😀", "🐨", "🐶", "🦛", "👨‍👩‍👧‍👦"];

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const [imageUrl, setImageUrl] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setSelectedEmoji(''); // Reset selected emoji when an image is selected
    setImageUrl(URL.createObjectURL(file)); // Generate URL for uploaded image to be shown
  };

  const handleEmojiSelect = (e) => {
    setSelectedEmoji(e.target.value);
    setSelectedImage(null); // Reset selected image when an emoji is selected
    setImageUrl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedImage && !selectedEmoji) {
      console.error('No image or emoji selected.');
      return;
    }

    const apiUrl = 'https://localhost:7052/api/Group/Upload?groupCode='+groupCode;

    const formData = new FormData();

    if (selectedImage) {
      formData.append('files', selectedImage);
    } else {
      // Add logic to handle emoji selection
      const emojiIndex = emojis.indexOf(selectedEmoji);
      const emojiImagePath = `/images/emoji${emojiIndex}.png`; 
      formData.append('files', emojiImagePath);
    }
    fetch(apiUrl, {
      method: 'POST',
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
          <form onSubmit={handleSubmit} >
            <Row className="mb-3">
              <Header textToHeader={txtToHeader}></Header>
            </Row>
            <Row className="mb-3">
              <Col>
                <input type="file" accept="image/*" onChange={handleFileSelect} id="upload-file" />
              </Col>
            </Row>
            <Row className="mb-3">
                <Col>
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
              </Row>
            {selectedImage ? (
            <img src={imageUrl} alt="Uploaded Image" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100px", height: "100px", fontSize: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {selectedEmoji}
            </div>
          )}
             
            <Grid item style={{ marginTop: "40%" }}>
              <MainButton textToBtn={txtToBtn}></MainButton>
            </Grid>
          </form>
        </ThemeProvider>
        <FooterGraphic />
      </CacheProvider>
    </>
  );
}

export default ImagePost;
