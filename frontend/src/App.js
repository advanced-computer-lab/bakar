import React from 'react';
import theme from './Theme';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Flights from './pages/Flights';

const generalTheme = createTheme(theme);

function App() {
	return (
		<ThemeProvider theme={generalTheme}>
			<div>
				<Flights />
			</div>
		</ThemeProvider>
	);
}

export default App;
