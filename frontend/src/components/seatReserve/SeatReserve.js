import { React, useState } from 'react';
import { useNavigate } from 'react-router';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Air from '@mui/icons-material/AirlineSeatReclineNormal';
import CheckOut from '../CheckOut/CheckOut';
import SeatItem from './SeatItem';

export default function SeatReserve({
	flight,
	selectedCabin,
	number,
	transaction,
}) {
	const [pickedSeats, setPickedSeats] = useState([]);
	const [requestedSeats, setRequestedSeats] = useState(number);
	const reservedSeats =
		selectedCabin === 'economy' ? flight.seatsEconView : flight.seatsBusView;
	const [open, setOpen] = useState(true);

	let navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		if (pickedSeats.length < number) {
			alert(
				`You have picked ${pickedSeats.length} seat(s)\nPlease pick ${number} seat(s)`
			);
		} else {
			navigate('flights/', {
				state: {
					//...data,
					transaction: {
						searchStep: [],
					},
				},
			});
			setOpen(false);
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
						{reservedSeats.map((seat, index) => (
							<SeatItem
								seatStatus={seat}
								index={index}
								requestedSeats={requestedSeats}
								setRequestedSeats={setRequestedSeats}
								setPickedSeats={setPickedSeats}
							/>
						))}
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
