import { React } from 'react';
import { useNavigate } from 'react-router';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../assets/Bakar-Logo.svg';
import { UserType } from '../../userType';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

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
			navigate('/flights?');
			document.location.reload();
		}
	}
	return (
		<AppBar
			item="true"
			color="inherit"
			sx={{
				marginBottom: '20px',
				position: 'fixed',
				top: 0,
			}}
		>
			<Toolbar>
				<Button href="/">
					<img
						alt="logo"
						src={Logo}
						style={{
							height: '60px',
							padding: '10px 0',
							boxSizing: 'content-box',
						}}
					/>
				</Button>
				<Button
					color="inherit"
					name="viewFlights"
					href="/"
					sx={{ textTransform: 'none', mx: 1 }}
				>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Home
					</Typography>
				</Button>

				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1 }}
				></Typography>
				{isAdmin && (
					<Button
						color="inherit"
						name="viewFlights"
						onClick={handleClick}
						sx={{ textTransform: 'none' }}
					>
						View Available Flights
					</Button>
				)}
				{!flag && !isAdmin && (
					<Button
						color="primary"
						href="/tickets"
						onClick={handleClick}
						sx={{ textTransform: 'none' }}
						variant="contained"
						startIcon={<AirplaneTicketIcon />}
					>
						View Reserved Flights
					</Button>
				)}

				{!flag && !isAdmin && (
					<Button
						color="primary"
						href="/profile"
						sx={{ textTransform: 'none', mx: 1.5 }}
						variant="contained"
						startIcon={<AccountBoxIcon />}
					>
						Profile
					</Button>
				)}
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
