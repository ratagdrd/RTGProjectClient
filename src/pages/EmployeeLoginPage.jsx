import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid } from '@mui/material';
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
        document.body.className = 'adminPage';

        // Remove the 'employeePage' class from the body element when the component unmounts
        return () => {
            document.body.className = '';
        };
    }, []);


    const handleLogin = (event) => {
        console.log('Username:', username);
        console.log('Password:', password);

        event.preventDefault(); // Prevent the default form submission behavior

        // fetch(`https://localhost:7052/api/Employee/LogIn?username=${username}&password=${password}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data === 1) {
        //             console.log('Login successful');
        //             // You can redirect the user to another page or perform other actions here
        //         } else {
        //             console.log('Invalid username or password');
        //             // Show an error message to the user
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error during fetch:', error);
        //         // Handle errors such as network issues
        //     });

        const loginData = {
            username: username,
            password: password
        };

        console.log('Sending login request with data:', loginData);

        fetch('https://localhost:7052/api/Employee/LogIn', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json; charset=UTF-8",
              },
            body: JSON.stringify(loginData),
        })
        .then(res => {
            console.log('res=', res);
            return res.json();
        })
        .then(
            (result) => {
                console.log("fetch POST= ", result);
                if (result === 1) {
                    console.log('Login successful');
                    // You can redirect the user to another page or perform other actions here
                } else {
                    console.log('Invalid username or password');
                }
            },
            (error) => {
                console.log("err post=", error);
            }
        );
    
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