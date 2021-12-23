/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { grid } from "@mui/system";
import axios from "../api";
import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { UserType } from "../userType";
import { useNavigate } from 'react-router';
const jwt = require("jsonwebtoken");

export default function Profile() {
  //const [user, setUser] = React.useState();
    let navigate = useNavigate();
    let test;
  let token = localStorage.getItem("token");
  console.log(token);
  try{
    test = JSON.parse(atob(token.split(".")[1]));
    console.log(test);
  } catch(err){
    console.log(err);
  }
  let username = test.username;
  let firstName = test.firstName;
  let lastName = test.lastName;
  let email = test.email;
  let passport = test.passport;
  const [firstNameEdit, setFirstNameEdit] = React.useState(true);
  const [lastNameEdit, setLastNameEdit] = React.useState(true);
  const [emailEdit, setEmailEdit] = React.useState(true);
  const [passportEdit, setPassportEdit] = React.useState(true);
  const [firstNameValue, setFirstNameValue] = React.useState(firstName);
  const [lastNameValue, setLastNameValue] = React.useState(lastName);
  const [emailValue, setEmailValue] = React.useState(email);
  const [passportValue, setPassportValue] = React.useState(passport);

  const handleClick = async () => {
	  
  console.log(test);
  console.log(username);
    let data = {
      username: test.username,
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      passport: passportValue,
    };
	console.log(data);
   let res = await axios.put("/users", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
	console.log(res);
	localStorage.setItem("token", res.data);
	
	 token = localStorage.getItem("token");
	 test = JSON.parse(atob(token.split(".")[1]));
	 username = test.username;
	 firstName = test.firstName;
	 console.log(test);
	 lastName = test.lastName;
	 email = test.email;
	 passport = test.passport;
  document.location.reload();
  };

  const handleSubmit = (event) => {
	if (event.currentTarget.name === "firstName") {
		setFirstNameEdit(false);
		return;
	}
	else if (event.currentTarget.name === "lastName"){
		setLastNameEdit(false);
	}
	else if (event.currentTarget.name === "email"){
		setEmailEdit(false);
	}
	else{
		setPassportEdit(false);
	}
  }
  const styles = {
    backgroundImage:
      "url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2017%2F03%2F15%2F96135-airplane-landing-sky.jpg&f=1&nofb=1)",
    backgroundRepeat: "no-repeat",
    backgroundColor: (t) =>
      t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: "cover",
    height: "100vh",
  };
  return (
    <div style={styles}>
      <NavBar></NavBar>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        component={"div"}
      >
        <Grid
          item
          sx={{
            backgroundColor: "rgb(254, 239, 221)",
            padding: "20px",
            height: "75vh",
          }}
        >
          <label> First Name </label>
          <Grid container direction="row">
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton name ="firstName" onClick={handleSubmit}>
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={firstNameEdit}
              margin="dense"
              name="firstName"
              defaultValue={firstName}
              fullWidth
              type="text"
              variant="outlined"
              onChange={(event) => setFirstNameValue(event.target.value)}
            ></TextField>
          </Grid>
          <label> Last Name </label>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton name="lastName" onClick={handleSubmit}>
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={lastNameEdit}
            margin="dense"
            name="lastName"
            defaultValue={lastName}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setLastNameValue(event.target.value)}
          ></TextField>
          <label> Email </label>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton name="email" onClick={handleSubmit}>
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={emailEdit}
            margin="dense"
            name="email"
            defaultValue={email}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setEmailValue(event.target.value)}
          ></TextField>
          <label> Passport Number </label>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton name="passport" onClick={handleSubmit}>
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={passportEdit}
            name="passport"
            id="flightNo"
            defaultValue={passport}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setPassportValue(event.target.value)}
          ></TextField>
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button
              variant="contained"
              onClick={handleClick}
              color="primary"
              sx={{ ":hover": { backgroundColor: "#CD5334" } }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
