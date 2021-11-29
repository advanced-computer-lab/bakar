import { React } from 'react';
import { AppBar, Button, Divider, Toolbar, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Logo from '../../assets/Logo.svg';

export default function NavBar() {
	return (
		<AppBar
			item
			position="static"
			color="inherit"
			sx={{ marginBottom: '20px' }}
		>
			<Toolbar>
				<img
					alt="logo"
					src={Logo}
					style={{
						height: '75px',
						width: '75px',
						padding: '15px 0 0 0',
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
				<Button
					startIcon={<LoginIcon />}
					color="primary"
					variant="contained"
					href="/login"
					sx={{ textTransform: 'none' }}
				>
					Login
				</Button>
			</Toolbar>
		</AppBar>
	);
}
