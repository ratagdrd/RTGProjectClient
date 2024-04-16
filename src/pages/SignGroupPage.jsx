import React, { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import {
  TextField, Button, Grid, Typography, Select, MenuItem,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import Groups2Icon from '@mui/icons-material/Groups2';
import InfoIcon from '@mui/icons-material/Info';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import Header from '../FuncComp/Header';
import MainButton from '../FuncComp/MainButton';
import FooterGraphic from '../FuncComp/FooterGraphic';

export default function SignGroupPage() {

  const theme = createTheme({ direction: 'rtl' })

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

  const txtToHeader = "פרטי קבוצה";
  const txtToBtn = "צור קבוצה";

  const [showInfo, setShowInfo] = useState(false);
  const [numOfParticipants, setNumOfParticipants] = useState('');
  const [minAge, setminAge] = useState('');
  const [maxAge, setmaxAge] = useState('');

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  const handleInfoClose = () => {
    setShowInfo(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <form onSubmit={handleSubmit} >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Header textToHeader={txtToHeader}></Header>
              </Grid>
              <Grid container alignItems="center" spacing={2}>
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
                  <Groups2Icon style={{ marginTop: "25px" }} />
                </Grid>
              </Grid>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item>
                  <Select
                    fullWidth
                    value={numOfParticipants}
                    onChange={handleNumOfParticipantsChange}
                    label="NumOfParticipants"
                    variant="standard"
                    defaultValue="NumOfParticipants"
                    required
                    displayEmpty
                    renderValue={value => value || 'כמות משתתפים '}
                  >
                    <MenuItem value="NumOfParticipants" disabled>כמות משתתפים</MenuItem>
                    {Array.from({ length: 14 }, (_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item>
                  <GroupAddIcon />
                </Grid>
              </Grid>
              <Grid item  alignItems="center">
                <Grid item>
                  <AltRouteIcon />
                </Grid>
                <Grid item xs>
                  <Select
                    fullWidth
                    label="roadType"
                    variant="standard"
                    defaultValue="type"
                    required
                  >
                    <MenuItem value="type" disabled>בחר סוג מסלול</MenuItem>
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
                <Typography variant="caption" >:הזן טווח גילאים</Typography>
              </Grid>
              <Grid item>
                <Select
                  fullWidth
                  value={minAge}
                  onChange={handleMinAge}
                  label="minAge"
                  variant="standard"
                  defaultValue="minAge"
                  required
                  displayEmpty
                  renderValue={value => value || 'גיל מינימלי'}
                >
                  <MenuItem value="minAge" disabled>גיל מינימלי </MenuItem>
                  {Array.from({ length: 100 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item>
                <Select
                  fullWidth
                  value={maxAge}
                  onChange={handleMaxAge}
                  variant="standard"
                  defaultValue="minAge"
                  required
                  displayEmpty
                  label="maxAge"
                  renderValue={value => value || 'גיל מקסימלי'}

                >
                  <MenuItem value="" disabled>גיל מקסימלי </MenuItem>
                  {Array.from({ length: 100 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item>
                <MainButton textToBtn={txtToBtn}></MainButton>
              </Grid>
            </Grid>
          </form>
        </ThemeProvider>
        <FooterGraphic />
      </CacheProvider>
    </>
  );
}
