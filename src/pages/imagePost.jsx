import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { TextField, Grid } from '@mui/material';
import Header from '../FuncComp/Header';
import MainButton from '../FuncComp/MainButton';
import FooterGraphic from '../FuncComp/FooterGraphic';

function ImagePost() {
  const theme = createTheme({ direction: 'rtl' })
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const txtToHeader = "ניסיון העלאת תמונה";
  const txtToBtn = "המשך";
  const groupCode=1;

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file)); // Generate URL for uploaded image to be shown
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedImage) {
      console.error('No image selected.');
      return;
    }

    const apiUrl = 'https://localhost:7052/api/Group/Upload?groupCode='+groupCode;

    const formData = new FormData();
    formData.append('files', selectedImage);

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
            {imageUrl && ( // Display the uploaded image if imageUrl is not null
              <Row className="mb-3">
                <Col>
                  <img src={imageUrl} alt="Uploaded Image" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                </Col>
              </Row>
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
