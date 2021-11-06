import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../api';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';

export default function EditFlight({flight}) {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleSubmit = async (event) => {
		const data = new FormData(event.currentTarget);
		try {
			let response = await axios.put(`/flights/${flight.flightNo}`, {
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
			setOpen(false);
			console.log(data);
			console.log(response);
		} catch(err) {
			console.log(err);
		}
    }

	console.log(flight);
	return (
		<div>
			<Button
				startIcon={<EditIcon />}
				onClick={handleOpen}
			/>
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
							value={flight.flightNo}
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
							value={flight.departureTime}
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
							value={flight.arrivalTime}
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
							value={flight.departureLocation}
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
							value={flight.departureTerminal}
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
							value={flight.arrivalLocation}
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
							value={flight.arrivalTerminal}
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
							value={flight.seatsEcon}
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
							value={flight.seatsBus}
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
							value={flight.priceEcon}
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
							value={flight.priceBus}
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
