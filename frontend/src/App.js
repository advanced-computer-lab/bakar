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
import Profile from './pages/Profile';
import { UserType } from './userType';
import ProtectedRoute from './components/protectedRoutes/protectedRoute';
import { Scrollbars } from 'react-custom-scrollbars';
import Payment from './pages/Payment';

const generalTheme = createTheme(theme);

function App() {
	let style = {};

	let token = '';
	function getToken() {
		token = localStorage.getItem('token');
		if (token == null) {
			return UserType.guest;
		} else {
			const test = JSON.parse(atob(token.split('.')[1]));
			if (test.isAdmin) {
				return UserType.admin;
			} else {
				return UserType.user;
			}
		}
	}
	const [userType, setUserType] = useState(getToken());

	return (
		<Scrollbars style={{ width: '100vw', height: '100vh' }}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<ThemeProvider theme={generalTheme}>
					<CssBaseline />
					<Router>
						<div style={style}>
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
								<Route path="/tickets" element={<ProtectedRoute />}>
									<Route
										path="/tickets"
										element={<Tickets userType={userType} />}
									/>
								</Route>
								<Route path="/profile" element={<ProtectedRoute />}>
									<Route
										path="/profile"
										element={<Profile userType={userType} />}
									/>
								</Route>
								<Route path="/payments" element={<ProtectedRoute />}>
									<Route
										path="/payments"
										element={<Payment userType={userType} />}
									/>
								</Route>
							</Routes>
						</div>
					</Router>
				</ThemeProvider>
			</LocalizationProvider>
		</Scrollbars>
	);
}

export default App;
