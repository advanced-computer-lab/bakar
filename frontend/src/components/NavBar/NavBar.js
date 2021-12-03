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
	let isAdmin = userType === UserType.admin;

	function handleClick(event) {
		if (event.target.name === 'log') {
			if (flag) {
				navigate('/login');
			} else {
				localStorage.removeItem('token');
				navigate('/');
				document.location.reload();
			}
		} else {
			console.log('hoho');
			navigate('/flights');
			document.location.reload();
		}
	}
	return (
		<AppBar
			item="true"
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
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Button
						color="inherit"
						name="viewFlights"
						href="/"
						sx={{ textTransform: 'none' }}
					>
						Home
					</Button>
				</Typography>
				<Button
					color="inherit"
					name="viewFlights"
					onClick={handleClick}
					sx={{ textTransform: 'none' }}
				>
					View Available Flights
				</Button>
				{!flag && !isAdmin &&(
					<Button
					color="inherit"
					name="viewFlights"
					onclick={handleClick}
					sx={{ textTransform: 'none' }}
				>
					View Reserved Flights
				</Button>)}
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
