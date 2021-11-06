import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../api';
import Box from '@mui/material/Box';

export default function CreateFlight() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		const data = new FormData(event.currentTarget);
		let response = await axios.post('/flights', {
			flightNo: data.get('flightNo'),
			departureTime: data.get('departureTime'),
			arrivalTime: data.get('arrivalTime'),
			departureLocation: data.get('departureLocation'),
			arrivalLocation: data.get('arrivalLocation'),
			seatsEcon: data.get('seatsEcon'),
			seatsBus: data.get('seatsBus'),
			departureTerminal: data.get('departureTerminal'),
			arrivalTerminal: data.get('arrivalTerminal'),
			priceEcon: data.get('priceEcon'),
			priceBus: data.get('priceBus'),
		});
		console.log(data);
		console.log(response);
		if (response.status === 200) {
			setOpen(false);
		} else {
			//TODO: Handle failure in creation of flight.
		}
	};

	return (
		<div>
			<Button
				variant="contained"
				startIcon={<AddIcon />}
				onClick={handleClickOpen}
			>
				Add a flight
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<DialogTitle>Create</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter flight data</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							name="flightNo"
							id="flightNo"
							label="Flight Number"
							type="text"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="departureTime"
							id="departureTime"
							label="Departure Time"
							type="datetime-local"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="arrivalTime"
							id="arrivalTime"
							label="Arrival Time"
							type="datetime-local"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="departureLocation"
							id="departureLocation"
							label="Departure Location"
							type="text"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="departureTerminal"
							id="departureTerminal"
							label="Departure Terminal"
							type="Number"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="arrivalLocation"
							id="arrivalLocation"
							label="Arrival Location"
							type="text"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="arrivalTerminal"
							id="arrivalTerminal"
							label="Arrival Terminal"
							type="Number"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="seatsEcon"
							id="seatsEcon"
							label="Number of Economy Seats"
							type="number"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="seatsBus"
							id="seatsBus"
							label="Number of Business Seats"
							type="number"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="priceEcon"
							id="priceEcon"
							label="Price of Economy Seats"
							type="number"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							name="priceBus"
							id="priceBus"
							label="Price of Business Seats"
							type="number"
							fullWidth
							variant="standard"
						/>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleClose} variant="contained">
							Cancel
						</Button>
						<Button type="submit" variant="contained">
							Submit
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
}
