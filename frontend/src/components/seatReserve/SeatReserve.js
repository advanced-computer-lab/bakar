import { React, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import SeatItem from './SeatItem';
import SeatList from './SeatList';

export default function SeatReserve({
	flight,
	selectedCabin,
	number,
	open,
	setOpen,
	departureFlight,
	returnFlight,
	setDepartureFlight,
	ticket,
	setReturnFlight,
}) {
	const pickedSeats = useRef([]);
	const requestedSeats = number;
	const [seats, setSeats] = useState([]);
	const reservedSeats =
		selectedCabin === 'Economy' ? flight.seatsEconView : flight.seatsBusView;

	let navigate = useNavigate();
	const location = useLocation();
	const handleClose = () => {
		setOpen(false);
	};

	let rows = [];

	const populateSeats = () => {
		rows = [[]];
		reservedSeats.map((seat, index) => {
			if (index % 4 === 0) {
				rows.push([]);
			}
			return rows[Math.floor(index / 4)].push({
				seatStatus: seat,
				seatNo: index,
			});
		});
		setSeats(rows);
	};

	useEffect(() => populateSeats(), []);

	const handleSubmit = () => {
		console.log('picked seats = ', pickedSeats);
		if (pickedSeats.current.length < number) {
			alert(
				`You have picked ${pickedSeats.current.length} seat(s)\nPlease pick ${number} seat(s)`
			);
		} else {
			if (!departureFlight) {
				navigate('/flights', {
					replace: true,
					state: {
						...location.state,
						departureFlight: {
							...flight,
							seats: pickedSeats,
							cabin: selectedCabin,
						},
						returnFlight: returnFlight,
					},
				});
				setDepartureFlight({
					...flight,
					seats: pickedSeats,
					cabin: selectedCabin,
				});
			} else {
				navigate('/flights', {
					replace: true,
					state: {
						...location.state,
						departureFlight: departureFlight,
						returnFlight: {
							...flight,
							seats: pickedSeats,
							cabin: selectedCabin,
						},
					},
				});
				setReturnFlight({
					...flight,
					seats: pickedSeats,
					cabin: selectedCabin,
				});
			}
			setOpen(false);
		}
	};

	console.log(requestedSeats);
	console.log(pickedSeats);
	return (
		<Dialog open={open} onClose={handleClose}>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					padding: '50px',
				}}
			>
				<Grid
					container
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
					}}
				>
					<Typography
						variant="h4"
						sx={{
							mb: 2,
						}}
					>
						Seats Selection
					</Typography>
				</Grid>
				<Grid
					container
					direction="row"
					columnSpacing={2}
					mb={4}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
					}}
				>
					<Grid item>
						<Grid container direction="row">
							<Box
								sx={{
									mr: 1,
									py: 1.5,
									px: 1.5,
									backgroundColor: '#33CA7F',
								}}
							/>
							<Typography variant="caption">Available</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction="row">
							<Box
								sx={{
									mr: 1,
									py: 1.5,
									px: 1.5,
									backgroundColor: '#2196f3',
								}}
							/>
							<Typography variant="caption">Picked</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction="row">
							<Box
								sx={{
									mr: 1,
									py: 1.5,
									px: 1.5,
									backgroundColor: '#909FA5',
								}}
							/>
							<Typography variant="caption">Not Available</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					container
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
						ml: 1,
					}}
				>
					<SeatList
						ticket={ticket}
						flight={flight}
						departureFlight={departureFlight}
						returnFlight={returnFlight}
						seats={seats}
						reqSeats={requestedSeats}
						pickedSeats={pickedSeats}
					/>
				</Grid>
				<br />
				<br />
				<Grid container alignItems="center" justifyContent="center">
					<Button variant="contained" onClick={handleSubmit}>
						Done
					</Button>
				</Grid>
			</Box>
		</Dialog>
	);
}
