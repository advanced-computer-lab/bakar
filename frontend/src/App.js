import { React, useState } from 'react';
import theme from './Theme';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Flights from './pages/Flights';
import Tickets from './pages/Tickets';
import Register from './pages/Register';
import { UserType } from './userType';
const jwt = require('jsonwebtoken');

const generalTheme = createTheme(theme);

function App() {
	let token = '';
	function getToken() {
		token = localStorage.getItem('token');
		if (token == null) {
			return UserType.guest;
		}
		try {
			jwt.verify(token, 'tom&jerry');
			return UserType.admin;
		} catch (err) {
			console.log('hello2');
			jwt.verify(token, 'jerry&tom');
			return UserType.user;
		}
	}
	const [userType, setUserType] = useState(getToken());
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<ThemeProvider theme={generalTheme}>
				<CssBaseline />
				<Router>
					<div>
						<Routes>
							<Route path="/" element={<Homepage userType={userType} />} />
							<Route
								path="/login"
								element={<Login setUserType={setUserType} />}
							/>
							<Route
								path="/register"
								element={<Register setUserType={setUserType} />}
							/>
							<Route
								path="/flights"
								element={<Flights userType={userType} />}
							/>
							<Route
								path="/tickets"
								element={<Tickets userType={userType} />}
							/>
						</Routes>
						
					</div>
				</Router>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
