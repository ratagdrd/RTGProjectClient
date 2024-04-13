import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Header from '../FuncComp/Header';
import MainButton from '../FuncComp/MainButton';
import InfoIcon from '@mui/icons-material/Info';

export default function SignGroupPage() {

  const txtToHeader = "פרטי קבוצה";
  const txtToBtn = "צור קבוצה";

  const [showInfo, setShowInfo] = useState(false);
  const [NumOfParticipants, setNumOfParticipants] = useState('כמות משתתפים');

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  const handleInfoClose = () => {
    setShowInfo(false);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };


  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Header textToHeader={txtToHeader}></Header>
        </Grid>
        <Grid item>
          <TextField
            label="שם הקבוצה"
            type="groupName"
            variant="standard"
            fullWidth
            required
          />
        </Grid>
        <Grid item>
          <Select
            fullWidth
            value={NumOfParticipants}
            onChange={handleAgeChange}
            label="NumOfParticipants"
            variant="standard"
            required
          >
            <option value="NumOfParticipants">כמות משתתפים</option>
            {Array.from({ length: 14 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}

          </Select>
        </Grid>
        <Grid item container alignItems="center">
          <Grid item xs>
            <Select
              fullWidth
              label="roadType"
              variant="standard"
              defaultValue="type"
              required
            >
              <MenuItem value="type">בחר סוג מסלול</MenuItem>
              <MenuItem value="regular">רגיל</MenuItem>
              <MenuItem value="accessible">נגיש</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <IconButton onClick={handleInfoClick}>
              <InfoIcon />
            </IconButton>
            <Dialog open={showInfo} onClose={handleInfoClose}>
              <DialogTitle style={{ direction: "rtl", fontWeight: "bold" }}> סוגי מסלולים</DialogTitle>
              <DialogContent style={{ direction: "rtl" }}>
                <Typography> מסלול נגיש- מסלול המכיל תחנות נגישות* בלבד
                  <p style={{ fontSize: "12px" }}>*תחנות עם דרכי גישה נוחות וללא מכשולים לאנשים עם מגבלת ניידות</p>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleInfoClose} style={{ direction: "rtl", color: "#004a3a" }}>
                  סגור
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>

        <Grid item>
          <MainButton textToBtn={txtToBtn}></MainButton>
        </Grid>
      </Grid>
    </form>
  );
}
