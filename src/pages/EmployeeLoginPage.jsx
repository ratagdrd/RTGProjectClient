import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Grid, Paper } from '@mui/material';
import "./../css/AdminPages.css";
import MainButton from "../FuncComp/MainButton";
import Header from "../FuncComp/Header";
import FooterGraphic from "../FuncComp/FooterGraphic";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function EmployeeLoginPage() {
    const txtToBtn = " התחברות";
    const txtToHeader = "מערכת ניהול";
    const theme = createTheme({ direction: "rtl" });

    const cacheRtl = createCache({
      key: "muirtl",
      stylisPlugins: [prefixer, rtlPlugin],
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Add the 'employeePage' class to the body element when the component mounts
        document.body.className = 'employeePage';

        // Remove the 'employeePage' class from the body element when the component unmounts
        return () => {
            document.body.className = '';
        };
    }, []);


    const handleLogin = () => {
        // Handle login logic here, such as calling an API to verify credentials
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
        <div className='loginContainer'>
            <div className='inner-loginContainer'>
                <div className='headerLogin'> <Header textToHeader={txtToHeader} /></div>
                <Box component="form" onSubmit={handleLogin} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="שם משתמש"
                                type="text"
                                variant="outlined"
                                fullWidth
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                InputLabelProps={{ dir: 'rtl' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="סיסמה"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputLabelProps={{ dir: 'rtl' }}
                            />
                        </Grid>
                    </Grid>
                    <MainButton textToBtn={txtToBtn}></MainButton>
                </Box>
                <FooterGraphic />
            </div>
        </div>
        </ThemeProvider>
        </CacheProvider>
    );
}