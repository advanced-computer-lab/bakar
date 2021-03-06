import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from '../components/Copyrights/Copyrights';
import axios from '../api';
import { useNavigate } from 'react-router';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { IconButton, Link } from '@mui/material';

export default function SignUpSide() {
	let navigate = useNavigate();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();
	const [homeAddress, setHomeAddress] = useState();
	const [passport, setPassport] = useState();
	const [countryCode, setCountryCode] = useState();
	const [phoneNumber, setPhoneNumber] = useState();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			let response = await axios.post('/users/register', {
				firstName: firstName,
				lastName: lastName,
				username: username,
				password: password,
				email: email,
				homeAddress: homeAddress,
				passport: passport,
				countryCode: countryCode,
				phone: phoneNumber,
			});
			navigate('/');
			localStorage.setItem('token', response.data);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
			}
		}
	};
	return (
		<Grid container component={Paper} sx={{ height: '100vh' }}>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<ValidatorForm
						onSubmit={handleSubmit}
						onError={(errors) => console.log(errors)}
					>
						<Grid
							container
							direction="row"
							rowSpacing={2}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item xs>
								<TextValidator
									margin="normal"
									fullWidth
									required
									id="firstName"
									label="First Name"
									name="firstName"
									autoComplete="firstName"
									autoFocus
									value={firstName}
									onChange={(event) => {
										setFirstName(event.target.value);
									}}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
							</Grid>
							<Grid item xs>
								<TextValidator
									margin="normal"
									fullWidth
									required
									id="lastName"
									name="lastName"
									label="Last Name"
									value={lastName}
									onChange={(event) => {
										setLastName(event.target.value);
									}}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
							</Grid>
						</Grid>
						<Grid
							container
							direction="row"
							rowSpacing={2}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item xs>
								<TextValidator
									margin="normal"
									required
									fullWidth
									name="username"
									label="Username"
									id="username"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
							</Grid>
							<Grid item xs>
								<TextValidator
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									value={password}
									onChange={(event) => {
										setPassword(event.target.value);
									}}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
							</Grid>
						</Grid>
						<TextValidator
							margin="normal"
							required
							fullWidth
							name="email"
							label="Email"
							id="email"
							value={email}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							validators={['required', 'isEmail']}
							errorMessages={['this field is required', 'not a valid email']}
						/>
						<TextValidator
							margin="normal"
							required
							fullWidth
							name="homeAddress"
							label="Home Address"
							id="homeAddress"
							value={homeAddress}
							onChange={(event) => {
								setHomeAddress(event.target.value);
							}}
							validators={['required']}
							errorMessages={['this field is required']}
						/>
						<TextValidator
							margin="normal"
							required
							fullWidth
							name="passport"
							label="Passport Number"
							id="passport"
							value={passport}
							onChange={(event) => {
								setPassport(event.target.value);
							}}
							validators={['required']}
							errorMessages={['this field is required']}
						/>
						<Grid
							container
							direction="row"
							rowSpacing={2}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item xs={4}>
								<TextValidator
									margin="normal"
									fullWidth
									required
									name="countryCode"
									label="Country Code"
									id="countryCode"
									value={countryCode}
									onChange={(event) => {
										setCountryCode(event.target.value);
									}}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
							</Grid>
							<Grid item xs>
								<TextValidator
									margin="normal"
									required
									fullWidth
									name="phoneNumber"
									label="Phone Number"
									id="phoneNumber"
									value={phoneNumber}
									onChange={(event) => {
										setPhoneNumber(event.target.value);
									}}
									validators={['required', 'isNumber']}
									errorMessages={[
										'this field is required',
										'not a valid number',
									]}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid
							container
							sx={{ textAlign: 'center', justifyContent: 'center' }}
						>
							<Link href="/login" variant="body2">
								{'Have an account? Sign In'}
							</Link>
						</Grid>
					</ValidatorForm>
					<br></br>
					<br></br>
					<Avatar sx={{ backgroundColor: '#CD5334', m: 1 }}>
						<IconButton href="/">
							<HomeOutlinedIcon sx={{ color: '#ffffff' }}></HomeOutlinedIcon>
						</IconButton>
					</Avatar>
					<Copyright sx={{ mt: 5 }} />
				</Box>
			</Grid>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage:
						'url(https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'right',
				}}
			/>
		</Grid>
	);
}
