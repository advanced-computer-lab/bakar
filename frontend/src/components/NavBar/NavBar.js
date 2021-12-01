import { React } from 'react';
import { useNavigate } from 'react-router';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../assets/Logo.svg';
import { UserType } from '../../userType';

export default function NavBar({ userType }) {
	let navigate = useNavigate();
	let flag = userType === UserType.guest;

	function handleClick(event) {
		if (event.target.name === 'log') {
			if (flag) {
				navigate('/login');
			} else {
				localStorage.removeItem('token');
				navigate('/');
			}
		} else {
			navigate('/flights');
		}
	}
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
				<Button
					color="inherit"
					name="viewFlights"
					onclick={handleClick}
					sx={{ textTransform: 'none' }}
				>
					View Available Flights
				</Button>
				<Button
					name="log"
					startIcon={flag ? <LoginIcon /> : <LogoutIcon />}
					color="primary"
					variant="contained"
					onClick={handleClick}
					sx={{ textTransform: 'none' }}
				>
					{flag ? 'Login' : 'Logout'}
				</Button>
			</Toolbar>
		</AppBar>
	);
}
