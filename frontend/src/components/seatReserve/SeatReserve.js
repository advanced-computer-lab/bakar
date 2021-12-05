/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-loop-func */
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Air from '@mui/icons-material/AirlineSeatReclineNormal';
import CheckOut from '../CheckOut/CheckOut';
import SeatItem from "./SeatItem";

export default function SeatReserve({seats, number, openSeats, setOpenSeats, setSeats, closeFlightDetails}) {
	const [pickedSeats, setPickedSeats] = React.useState([]);
	const [requestedSeats, setRequestedSeats] = React.useState(number);
	const reservedSeats = seats;
	const open = openSeats;
	const setOpen = setOpenSeats;



	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		console.log(pickedSeats);
		if (pickedSeats.length < number) {
			alert(`You have picked ${pickedSeats.length} seat(s)\nPlease pick ${number} seat(s)`);
		}
		else {
			setSeats((flight) => ({...flight, seats: pickedSeats}));
			setOpen(false);
			closeFlightDetails(null) // closes flight details page since we check if it's equal to null
		}
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<Box sx={{ width: '100%', height: '100%', padding: '50px' }}>
					<Grid
						container
						alignItems="center"
						justifyContent="center"
						rowSpacing={1}
						columnSpacing={{ xs: 1, sm: 1, md: 1 }}
					>
						
						{reservedSeats.map((seat, index) => (<SeatItem seatStatus={seat} index={index} requestedSeats={requestedSeats} setRequestedSeats={setRequestedSeats} setPickedSeats={setPickedSeats}/>))}
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
		</div>
	);
}
