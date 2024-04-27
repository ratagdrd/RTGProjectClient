import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import {
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Groups2Icon from "@mui/icons-material/Groups2";
import InfoIcon from "@mui/icons-material/Info";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";

import Header from "../FuncComp/Header";
import MainButton from "../FuncComp/MainButton";
import FooterGraphic from "../FuncComp/FooterGraphic";

export default function SignTest() {
  const theme = createTheme({ direction: "rtl" });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const txtToHeader = "פרטי קבוצה";
  const txtToBtn = "צור קבוצה";

  const [showInfo, setShowInfo] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [numOfParticipants, setNumOfParticipants] = useState("");
  const [minAge, setminAge] = useState("");
  const [maxAge, setmaxAge] = useState("");
  const [roadTypeUi, setRoadTypeUi] = useState("בחר סוג מסלול");
  const [roadType, setRoadType] = useState("");

  const navigate = useNavigate();

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  const handleInfoClose = () => {
    setShowInfo(false);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value); // Update state with the value from the TextField
  };

  const handleNumOfParticipantsChange = (event) => {
    setNumOfParticipants(event.target.value);
  };

  const handleMinAge = (event) => {
    setminAge(event.target.value);
  };

  const handleMaxAge = (event) => {
    setmaxAge(event.target.value);
  };

  const handleRoadType = (event) => {
    if (event.target.value == "רגיל") {
      setRoadTypeUi("רגיל");
      setRoadType("R");
    } else {
      //if the user want accessibale road
      setRoadTypeUi("נגיש");
      setRoadType("A");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const groupData = {
      groupName: groupName,
      numOfParticipants: numOfParticipants,
      minAge: minAge,
      maxAge: maxAge,
      roadType: roadType,
      photo: "", //its empty string untill the user will enter photo in the flag register page component
    };
    console.log(groupData);
    navigate("/flagRegister", { state: { groupData } });

    //this is post that work but we dont use it because the post will be from flagRegister:
    // const apiUrl = "https://localhost:7052/api/Group";

    // fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(groupData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //     // Handle success here, perhaps navigating to another page or showing a success message.
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     // Handle errors here, perhaps showing an error message to the user.
    //   });
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
              <Col xs={9}>
                <TextField
                  label="שם הקבוצה"
                  type="groupName"
                  variant="standard"
                  fullWidth
                  required
                  style={{ textAlign: "center" }}
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
              </Col>
              <Col xs={3} className="d-flex align-items-center">
                <Groups2Icon style={{ marginTop: "25px" }} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={9}>
                <Select
                  fullWidth
                  value={numOfParticipants}
                  onChange={handleNumOfParticipantsChange}
                  label="NumOfParticipants"
                  variant="standard"
                  defaultValue="NumOfParticipants"
                  required
                  displayEmpty
                  renderValue={(value) => value || "כמות משתתפים "}
                >
                  <MenuItem value="NumOfParticipants" disabled>
                    כמות משתתפים
                  </MenuItem>
                  {Array.from({ length: 14 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </Col>
              <Col xs={3} className="d-flex align-items-center">
                <GroupAddIcon />
              </Col>
            </Row>
            <Row className="mb-3" style={{ position: "relative" }}>
              <IconButton
                onClick={handleInfoClick}
                style={{
                  position: "absolute",
                  right: "50%",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <InfoIcon />
              </IconButton>
              <Dialog open={showInfo} onClose={handleInfoClose}>
                <DialogTitle style={{ direction: "rtl", fontWeight: "bold" }}>
                  {" "}
                  סוגי מסלולים
                </DialogTitle>
                <DialogContent style={{ direction: "rtl" }}>
                  <Typography>
                    {" "}
                    מסלול נגיש- מסלול המכיל תחנות נגישות* בלבד
                    <p style={{ fontSize: "12px" }}>
                      *תחנות עם דרכי גישה נוחות וללא מכשולים לאנשים עם מגבלת
                      ניידות
                    </p>
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleInfoClose}
                    style={{ direction: "rtl", color: "#004a3a" }}
                  >
                    סגור
                  </Button>
                </DialogActions>
              </Dialog>
              <Col xs={9}>
                <Select
                  fullWidth
                  value={roadTypeUi}
                  onChange={handleRoadType}
                  label="roadType"
                  variant="standard"
                  required
                  renderValue={(value) => value || "בחר סוג מסלול"}
                >
                  <MenuItem value="" disabled>
                    בחר סוג מסלול
                  </MenuItem>
                  <MenuItem value="רגיל">רגיל</MenuItem>
                  <MenuItem value="נגיש">נגיש</MenuItem>
                </Select>
              </Col>
              <Col xs={3} className="d-flex align-items-center">
                <AltRouteIcon />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={9}>
                <Select
                  fullWidth
                  value={minAge}
                  onChange={handleMinAge}
                  label="minAge"
                  variant="standard"
                  defaultValue="minAge"
                  required
                  displayEmpty
                  renderValue={(value) => value || "גיל מינימלי"}
                >
                  <MenuItem value="minAge" disabled>
                    גיל מינימלי{" "}
                  </MenuItem>
                  {Array.from({ length: 100 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </Col>
              <Col xs={3} className="d-flex align-items-center">
                <EscalatorWarningIcon />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={9}>
                <Select
                  fullWidth
                  value={maxAge}
                  onChange={handleMaxAge}
                  variant="standard"
                  defaultValue="minAge"
                  required
                  displayEmpty
                  label="maxAge"
                  renderValue={(value) => value || "גיל מקסימלי"}
                >
                  <MenuItem value="" disabled>
                    גיל מקסימלי
                  </MenuItem>
                  {Array.from({ length: 100 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </Col>
              <Col xs={3} className="d-flex align-items-center">
                <EscalatorWarningIcon />
              </Col>
            </Row>
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
