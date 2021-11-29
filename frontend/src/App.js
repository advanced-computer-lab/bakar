import React from 'react';
import theme from './Theme';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Flights from './pages/Flights';
import Register from "./pages/Register";


const generalTheme = createTheme(theme);

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<ThemeProvider theme={generalTheme}>
				<CssBaseline />
				<Router>
					<div>
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
							<Route path="/flights" element={<Flights />} />
						</Routes>
					</div>
				</Router>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
