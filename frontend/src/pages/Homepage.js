import {
	Button,
	CssBaseline,
	Divider,
	Toolbar,
	Typography,
} from '@mui/material';
import { React } from 'react';
import TypeAnimation from 'react-type-animation';
import Logo from '../assets/Logo.svg';

const styles = {
	backgroundImage:
		'url(https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
	backgroundRepeat: 'no-repeat',
	backgroundColor: (t) =>
		t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
	backgroundSize: 'cover',
	height: '100vh',
};

export default function Homepage() {
	return (
		<div style={styles}>
			<CssBaseline />
			<Toolbar>
				<img
					alt="logo"
					src={Logo}
					style={{
						height: '100px',
						width: '100px',
						padding: '15px 15px 0 0',
						boxSizing: 'content-box',
					}}
				/>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1 }}
				></Typography>
				<Button color="inherit" href="/flights" sx={{ textTransform: 'none' }}>
					View Available Flights
				</Button>
				<Divider
					orientation="vertical"
					variant="middle"
					sx={{ height: '50px' }}
				/>
				<Button color="inherit" href="/login" sx={{ textTransform: 'none' }}>
					Login
				</Button>
			</Toolbar>
			<TypeAnimation
				item
				cursor={false}
				sequence={['React typing animation based on typical', 1000, '']}
				wrapper="h2"
			/>
		</div>
	);
}
