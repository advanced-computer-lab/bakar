/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { grid } from "@mui/system";
import axios from "../api";
import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { UserType } from "../userType";
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
   let res = await axios.put("/users", data);
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
		if (event.currentTarget.name === 'firstName') {
			setFirstNameEdit(false);
			return;
		} else if (event.currentTarget.name === 'lastName') {
			setLastNameEdit(false);
		} else if (event.currentTarget.name === 'email') {
			setEmailEdit(false);
		} else {
			setPassportEdit(false);
		}
	};
	const styles = {
		backgroundImage:
			'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2017%2F03%2F15%2F96135-airplane-landing-sky.jpg&f=1&nofb=1)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: (t) =>
			t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
		backgroundSize: 'cover',
		height: '100vh',
	};

	const itemStyle = {
		pl: 10,
		pr: 10,
	};

	return (
		<div style={styles}>
			<NavBar />

			<div>
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					alignSelf="center"
				>
					<Grid
						container
						component={Paper}
						direction="column"
						rowSpacing={2}
						sx={{
							mt: 1,
							backgroundColor: 'rgb(254, 239, 221, .75)',
							maxWidth: '700px',
							p: 2,
						}}
					>
						<Grid container direction="row">
							<Grid item>
								<AccountCircleIcon sx={{ width: '50px', height: '50px' }} />
							</Grid>
							<Grid item alignSelf="center" sx={{ pl: 2 }}>
								<Typography component="p" variant="h6" color="#183642">
									Profile Details
								</Typography>
							</Grid>
						</Grid>

						<Grid item sx={itemStyle}>
							<label> First Name </label>
							<TextField
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton name="firstName" onClick={handleSubmit}>
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
							/>
						</Grid>

						<Grid item sx={itemStyle}>
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
							/>
						</Grid>

						<Grid item sx={itemStyle}>
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
							/>
						</Grid>

						<Grid item sx={itemStyle}>
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
							/>
						</Grid>

						<Grid item alignSelf="center">
							<Button
								variant="contained"
								onClick={handleClick}
								color="primary"
								sx={{ ':hover': { backgroundColor: '#CD5334' }, mt: 3 }}
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
