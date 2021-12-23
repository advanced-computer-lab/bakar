import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	IconButton,
	Link,
	Paper,
	Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../components/Copyrights/Copyrights';
import axios from '../api';
import { UserType } from '../userType';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function SignInSide({ setUserType }) {
	let navigate = useNavigate();

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			let response = await axios.post('/users/login', {
				username: username,
				password: password,
			});
			localStorage.setItem('token', response.data);
			const token = localStorage.getItem('token');

			const test = JSON.parse(atob(token.split('.')[1]));
			if (test.isAdmin) {
				setUserType(UserType.admin);
			} else {
				setUserType(UserType.user);
			}

			navigate('/');
		} catch (err) {
			if (err.response.status === 401) {
				setError(true);
			}
		}
	};

	return (
		<Grid container component={Paper} sx={{ height: '100vh' }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage:
						'url(https://images.unsplash.com/photo-1551963837-2a42d66d39d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1816&q=80)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'left',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						alignContent: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<ValidatorForm
						onSubmit={handleSubmit}
						onError={(errors) => console.log(errors)}
						fullWidth
					>
						<TextValidator
							margin="normal"
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
							value={username}
							onChange={(event) => {
								setUsername(event.target.value);
								setError(false);
							}}
							error={error}
							validators={['required']}
							errorMessages={['this field is required']}
							sx={{ width: '550px' }}
						/>
						<TextValidator
							margin="normal"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
								setError(false);
							}}
							error={error}
							helperText={error ? 'incorrect username or password' : ''}
							validators={['required']}
							errorMessages={['this field is required']}
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</ValidatorForm>
					<br></br>
					<br></br>
					<Avatar sx={{ backgroundColor: '#CD5334', m: 1 }}>
						<IconButton href="/">
							<HomeIcon sx={{ color: '#ffffff' }}></HomeIcon>
						</IconButton>
					</Avatar>
					<Copyright sx={{ mt: 5 }} />
				</Box>
			</Grid>
		</Grid>
	);
}
