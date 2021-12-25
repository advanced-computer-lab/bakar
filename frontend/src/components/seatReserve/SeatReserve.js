import { React, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
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
		console.log(rows);
	};

	useEffect(() => populateSeats(), []);

	const handleSubmit = () => {
		if (pickedSeats.length < number) {
			alert(
				`You have picked ${pickedSeats.length} seat(s)\nPlease pick ${number} seat(s)`
			);
		} else {
			if (!departureFlight) {
				console.log('wadda');
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
				console.log('noway');
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
			<Box sx={{ width: '100%', height: '100%', padding: '50px' }}>
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 1, md: 1 }}
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
