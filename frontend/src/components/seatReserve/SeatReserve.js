import { React, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import SeatItem from './SeatItem';

export default function SeatReserve({
	flight,
	selectedCabin,
	number,
	open,
	setOpen,
	departureFlight,
	returnFlight,
	setDepartureFlight,
	setReturnFlight,
}) {
	const [pickedSeats, setPickedSeats] = useState([]);
	const [requestedSeats, setRequestedSeats] = useState(number);
	const reservedSeats =
		selectedCabin === 'economy' ? flight.seatsEconView : flight.seatsBusView;

	let navigate = useNavigate();
	const location = useLocation();
	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		if (pickedSeats.length < number) {
			alert(
				`You have picked ${pickedSeats.length} seat(s)\nPlease pick ${number} seat(s)`
			);
		} else {
			if (!departureFlight) {
				console.log('wadda');
				navigate("/flights", 
				{
					replace: true,
					state: {
						...location.state,
						departureFlight: { ...flight, seats: pickedSeats, cabin: selectedCabin  },
						returnFlight: returnFlight,
					}
				});
				setDepartureFlight({ ...flight, seats: pickedSeats, cabin: selectedCabin });
			}
			else {
				console.log('noway');
				navigate("/flights", 
				{
					replace: true,
					state: {
						...location.state,
						departureFlight: departureFlight,
						returnFlight: { ...flight, seats: pickedSeats, cabin: selectedCabin  },
					}
				});
				setReturnFlight({ ...flight, seats: pickedSeats, cabin: selectedCabin  });
			}
			setOpen(false);
		}
	};

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
	);
}
