import { React, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import SeatItem from './SeatItem';
import SeatList from './SeatList';
import axios from '../../api';

export default function SeatReserve({
	flight,
	selectedCabin,
	number,
	alreadyPickedSeats,
	open,
	setOpen,
	departureFlight,
	returnFlight,
	setDepartureFlight,
	ticket,
	setReturnFlight,
}) {
	const pickedSeats = useRef(alreadyPickedSeats || []);
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

	const handleSubmit = async () => {
		console.log('picked seats = ', pickedSeats);
		if (pickedSeats.current.length < number) {
			alert(
				`You have picked ${pickedSeats.current.length} seat(s)\nPlease pick ${number} seat(s)`
			);
		} else {
			const newSeats = pickedSeats.current;
			console.log('new_seats ', newSeats);
			if (!departureFlight) {
				console.log('inside here');
				if (!location.pathname.includes('tickets')) {
					navigate('/flights', {
						replace: true,
						state: {
							...location.state,
							departureFlight: {
								...flight,
								seats: newSeats,
								cabin: selectedCabin,
							},
							returnFlight: returnFlight,
						},
					});
				} else if (ticket) {
					console.log('updateDep');
					await axios.put(`/tickets/${ticket._id}`, {
						seatsDeparture: newSeats,
					});
				}
				setDepartureFlight({
					...flight,
					seats: newSeats,
					cabin: selectedCabin,
				});
			} else {
				if (!location.pathname.includes('tickets')) {
					navigate('/flights', {
						replace: true,
						state: {
							...location.state,
							departureFlight: departureFlight,
							returnFlight: {
								...flight,
								seats: newSeats,
								cabin: selectedCabin,
							},
						},
					});
				} else if (ticket) {
					console.log('updateRet');
					await axios.put(`/tickets/${ticket._id}`, {
						seatsReturn: newSeats,
					});
					document.location.reload();
				}
				setReturnFlight({
					...flight,
					seats: newSeats,
					cabin: selectedCabin,
				});
			}
			setOpen(false);
		}
	};
	console.log('picked seats ', pickedSeats);
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
