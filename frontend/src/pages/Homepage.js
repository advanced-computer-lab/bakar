import { Button, Divider, Grid, Toolbar, Typography } from '@mui/material';
import { React } from 'react';
import { useNavigate } from 'react-router';
import TypeAnimation from 'react-type-animation';
import Logo from '../assets/Logo.svg';
import SearchFlightUser from '../components/SearchFlightUser/SearchFlightUser';
import { UserType } from '../userType';

const styles = {
	backgroundImage:
		'url(https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
	backgroundRepeat: 'no-repeat',
	backgroundColor: (t) =>
		t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
		backgroundSize: 'cover',
	height: '100vh',
};

export default function Homepage({ userType }) {
	let flag = userType === UserType.guest;
	let navigate = useNavigate();
	function handleClick(event) {
		if (event.target.name === 'log') {
			if (flag) {
				navigate('/login');
			} else {
				localStorage.removeItem('token');
				document.location.reload();
			}
		} else {
			navigate('/flights?');
		}
	}
	return (
		<div style={styles}>
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
				<Button
					name="log"
					color="primary"
					variant="text"
					onClick={handleClick}
					sx={{ textTransform: 'none' }}
				>
					{flag ? 'Login' : 'Logout'}
				</Button>
			</Toolbar>
			<TypeAnimation
				item
				cursor={false}
				sequence={['Book a flight', 1000, 'It is simple with us.']}
				wrapper="h2"
			/>
			<Grid container alignItems="center" justifyContent="center">
				<Grid item>
					<SearchFlightUser></SearchFlightUser>
				</Grid>
			</Grid>
		</div>
	);
}
