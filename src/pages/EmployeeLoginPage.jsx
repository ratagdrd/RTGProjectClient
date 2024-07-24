import React, { useState, useEffect } from "react";
import { Box, TextField, Grid } from "@mui/material";
import "./../css/AdminPages.css";
import MainButton from "../FuncComp/MainButton";
import Header from "../FuncComp/Header";
import FooterGraphic from "../FuncComp/FooterGraphic";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { useNavigate } from "react-router-dom";

export default function EmployeeLoginPage() {
  const txtToBtn = " התחברות";
  const txtToHeader = "מערכת ניהול";
  const theme = createTheme({ direction: "rtl" });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Add the 'employeePage' class to the body element when the component mounts
    document.body.className = "adminPage";

    // Remove the 'employeePage' class from the body element when the component unmounts
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleLogin = (event) => {
    console.log("Username:", username);
    console.log("Password:", password);

    event.preventDefault(); // Prevent the default form submission behavior

    const loginData = {
      username: username,
      password: password,
      role: "",
    };
    console.log("login data:", loginData);
    //https://localhost:7052/api/Employee
    fetch("https://proj.ruppin.ac.il/cgroup60/test2/tar1/api/Employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          return response.text().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          navigate("/cgroup60/test2/tar3/DataTablePage"); // Navigate to the admin page
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          alert("שם משתמש או סיסמא לא נכונים");
        } else {
          console.error("Error during login:", error);
          alert("An unexpected error occurred. Please try again later.");
        }
      });
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="loginContainer">
          <div className="inner-loginContainer">
            <div className="headerLogin">
              {" "}
              <Header textToHeader={txtToHeader} />
            </div>
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
                    InputLabelProps={{ dir: "rtl" }}
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
                    InputLabelProps={{ dir: "rtl" }}
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
