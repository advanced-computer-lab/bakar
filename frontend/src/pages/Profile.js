import {
	Button,
	Grid,
	IconButton,
	Paper,
	TextField,
	InputAdornment,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import axios from '../api';
import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const itemStyle = {
	pl: 10,
	pr: 10,
};

function ChangePassword({ setIsChangePassword }) {
	const [oldPassword, setOldPassword] = useState();
	const [newPassword, setNewPassword] = useState();
	const [reNewPassword, setReNewPassword] = useState();
	const [error, setError] = useState(false);

	const handleSubmit = async () => {
		try {
			let res = await axios.put('/users/password', {
				oldpassword: oldPassword,
				newpassword: newPassword,
			});
		} catch (err) {
			if (err.response.status === 401) {
				setError(true);
				console.log('habd4');
			}
		}
	};

	ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
		if (value !== newPassword) {
			return false;
		}
		return true;
	});

	return (
		<ValidatorForm
			onSubmit={handleSubmit}
			onError={(errors) => console.log(errors)}
			fullWidth
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
							Change Password
						</Typography>
					</Grid>
				</Grid>

				<Grid item sx={itemStyle}>
					<label> Old Password </label>
					<TextValidator
						error={error}
						helperText={error ? 'wrong password' : ''}
						value={oldPassword}
						margin="dense"
						name="oldPassword"
						fullWidth
						type="password"
						variant="outlined"
						onChange={(event) => {
							setOldPassword(event.target.value);
							setError(false);
						}}
						validators={['required']}
						errorMessages={['this field is required']}
					/>
				</Grid>

				<Grid item sx={itemStyle}>
					<label> New Password </label>
					<TextValidator
						value={newPassword}
						margin="dense"
						name="newPassword"
						type="password"
						fullWidth
						variant="outlined"
						onChange={(event) => setNewPassword(event.target.value)}
						validators={['required']}
						errorMessages={['this field is required']}
						sx={{ width: '500px' }}
					/>
				</Grid>

				<Grid item sx={itemStyle}>
					<label> Re-enter New Password </label>
					<TextValidator
						value={reNewPassword}
						margin="dense"
						name="reNewPassword"
						type="password"
						fullWidth
						variant="outlined"
						onChange={(event) => setReNewPassword(event.target.value)}
						validators={['required', 'isPasswordMatch']}
						errorMessages={['this field is required', "passwords don't match"]}
					/>
				</Grid>

				<Grid item alignSelf="center">
					<Button
						variant="contained"
						type="submit"
						color="primary"
						sx={{ ':hover': { backgroundColor: '#CD5334' }, mt: 3 }}
					>
						Submit
					</Button>
					<br></br>
					<Button
						variant="contained"
						onClick={() => {
							setIsChangePassword(false);
						}}
						color="primary"
						sx={{ ':hover': { backgroundColor: '#CD5334' }, mt: 3 }}
					>
						Cancel
					</Button>
				</Grid>
			</Grid>
		</ValidatorForm>
	);
}

function ProfileDetails({ setIsChangePassword }) {
	let token = localStorage.getItem('token');
	let test = JSON.parse(atob(token.split('.')[1]));
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
	const [disabled, setDisabled] = useState(true);

	const handleSubmit = async () => {
		console.log('test');
		let data = {
			firstName: firstNameEdit ? firstName : firstNameValue,
			lastName: lastNameEdit ? lastName : lastNameValue,
			email: emailEdit ? email : emailValue,
			passport: passportEdit ? passport : passportValue,
		};
		console.log(data);
		let res = await axios.put('/users', data, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
		console.log(res);
		localStorage.setItem('token', res.data);

		token = localStorage.getItem('token');
		test = JSON.parse(atob(token.split('.')[1]));
		username = test.username;
		firstName = test.firstName;
		console.log(test);
		lastName = test.lastName;
		email = test.email;
		passport = test.passport;
		document.location.reload();
	};

	const handleClick = (event) => {
		if (event.currentTarget.name === 'firstName') {
			setDisabled(!disabled);
			setFirstNameEdit(!firstNameEdit);
		} else if (event.currentTarget.name === 'lastName') {
			setDisabled(!disabled);
			setLastNameEdit(!lastNameEdit);
		} else if (event.currentTarget.name === 'email') {
			setDisabled(!disabled);
			setEmailEdit(!emailEdit);
		} else {
			setDisabled(!disabled);
			setPassportEdit(!passportEdit);
		}
	};

	return (
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
				<Grid sx={{ pl: '250px' }}>
					<Button
						variant="contained"
						onClick={() => {
							setIsChangePassword(true);
						}}
						color="primary"
						sx={{ ':hover': { backgroundColor: '#CD5334' }, mt: 3 }}
					>
						Change Password
					</Button>
				</Grid>
			</Grid>
			<Grid item sx={itemStyle}>
				<label> First Name </label>
				<TextField
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton name="firstName" onClick={handleClick}>
									{firstNameEdit ? <EditIcon /> : <EditOffIcon />}
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
					value={firstNameEdit ? firstName : firstNameValue}
					onChange={(event) => setFirstNameValue(event.target.value)}
				/>
			</Grid>
			<Grid item sx={itemStyle}>
				<label> Last Name </label>
				<TextField
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton name="lastName" onClick={handleClick}>
									{lastNameEdit ? <EditIcon /> : <EditOffIcon />}
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
								<IconButton name="email" onClick={handleClick}>
									{emailEdit ? <EditIcon /> : <EditOffIcon />}
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
								<IconButton name="passport" onClick={handleClick}>
									{passportEdit ? <EditIcon /> : <EditOffIcon />}
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
					onClick={handleSubmit}
					color="primary"
					disabled={disabled}
					sx={{ ':hover': { backgroundColor: '#CD5334' }, mt: 3 }}
				>
					Submit
				</Button>
			</Grid>{' '}
		</Grid>
	);
}

export default function Profile() {
	const [isChangePassword, setIsChangePassword] = useState(false);

	const styles = {
		backgroundImage:
			'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2017%2F03%2F15%2F96135-airplane-landing-sky.jpg&f=1&nofb=1)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: (t) =>
			t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
		backgroundSize: 'cover',
		height: '100vh',
	};

	return (
		<div style={styles}>
			<NavBar />

			<div style={{ padding: '10px', paddingTop: '100px' }}>
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					alignSelf="center"
				>
					{isChangePassword ? (
						<ChangePassword setIsChangePassword={setIsChangePassword} />
					) : (
						<ProfileDetails setIsChangePassword={setIsChangePassword} />
					)}
				</Grid>
			</div>
		</div>
	);
}
