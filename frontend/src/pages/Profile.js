import { Button, Grid, Paper, TextField } from "@mui/material";
import { grid } from "@mui/system";
import axios from "../api";
import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { UserType } from "../userType";
const jwt = require  ("jsonwebtoken");

export default function Profile(){
	//const [user, setUser] = React.useState();
	console.log("test1")
	const token = jwt.verify(localStorage.getItem("token"), "jerry&tom"); 
    let username = token.username;
	let firstName = token.firstName;
    console.log(firstName)
    // const getData = async()=>{
	// 	console.log("test2")
	// 	let res = await axios.get("/users/");
	// 	setUser(res);
	// 	console.log(res)
	// 	setUser(await axios.get("/users/").data[0])
		 
    // }
	// React.useEffect(()=>getData(),[])
	
    const handleClick = async (event) => {
		event.preventDefault();
		
			
			// await axios.put('/flights/' + flight.flightNo, data, {
			// 	headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			// });
		
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
    return(
        <div style={styles}>
            <NavBar></NavBar>
            <Grid container alignItems="center" justifyContent="center" component={"div"} >
                <Grid item sx={{backgroundColor:"rgb(254, 239, 221)", padding:"20px", height:"75vh"}}>
                    <label> First Name </label>
					<TextField  margin="dense"
								name="firstName"
								value= {username}
								type="text"
								fullWidth
								variant="outlined">
                    </TextField>
					<label> Last Name </label>
                    <TextField disabled margin="dense"
								name="firstName"
								value= {firstName}
								type="text"
								fullWidth
								variant="outlined">
                    </TextField>
					<label> Email </label>
                    <TextField disabled margin="dense"
								name="firstName"
								label="First Name"
								type="text"
								fullWidth
								variant="outlined">
                    </TextField>
					<label> Passport Number </label>
                    <TextField 
								autoFocus
								margin="dense"
								name="flightNo"
								id="flightNo"
								label="Flight Number"
								type="text"
								fullWidth
								variant="outlined"
								fullWidth
								variant="outlined">
                    </TextField>
					<Grid container
						sx={{ alignItems: 'center', justifyContent: 'center' }}>
					<Button variant="contained"
							onClick={handelClick}
							color="primary"
							sx={{ ':hover': { backgroundColor: '#CD5334' } }}>
						Edit
					</Button>
					</Grid>
                    </Grid>
            </Grid>
        </div>
    )
}