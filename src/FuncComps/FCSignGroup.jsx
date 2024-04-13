import React from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem } from '@mui/material';

export default function FCSignGroup() {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
      };


  return (
   <form onSubmit={handleSubmit}> 
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h5" align="center"> פרטי קבוצה</Typography>
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
            label="סוג מסלול"
            variant="standard"
            defaultValue="סוג מסלול"
            required
          >
            <MenuItem value="type">בחר סוג מסלול</MenuItem>
            <MenuItem value="regular">מנהל</MenuItem>
            <MenuItem value="accessible">משתמש</MenuItem>
            <MenuItem value="both">משתמש</MenuItem>
          </Select>
        </Grid>
       
        <Grid item>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
  