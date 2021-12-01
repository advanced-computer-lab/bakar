import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../api';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { DateTimePicker } from '@mui/lab';

export default function EditFlight({ flight }) {
	const [open, setOpen] = React.useState(false);
	const [departureTime, setDepartureTime] = React.useState(
		flight.departureTime
	);
	const [arrivalTime, setArrivalTime] = React.useState(flight.arrivalTime);
	const [flightNo, setFlightNo] = React.useState(flight.flightNo);
	const [departureLocation, setDepartureLocation] = React.useState(
		flight.departureLocation
	);
	const [arrivalLocation, setArrivalLocation] = React.useState(
		flight.arrivalLocation
	);
	const [departureTerminal, setDepartureTerminal] = React.useState(
		flight.departureTerminal
	);
	const [arrivalTerminal, setArrivalTerminal] = React.useState(
		flight.arrivalTerminal
	);
	const [seatsEcon, setSeatsEcon] = React.useState(flight.seatsEcon);
	const [seatsBus, setSeatsBus] = React.useState(flight.seatsBus);
	const [priceEcon, setPriceEcon] = React.useState(flight.priceEcon);
	const [priceBus, setPriceBus] = React.useState(flight.priceBus);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			let data = {
				flightNo: flightNo,
				departureTime: departureTime,
				arrivalTime: arrivalTime,
				departureLocation: departureLocation,
				arrivalLocation: arrivalLocation,
				seatsEcon: seatsEcon,
				seatsBus: seatsBus,
				departureTerminal: departureTerminal,
				arrivalTerminal: arrivalTerminal,
				priceEcon: priceEcon,
				priceBus: priceBus,
			};
			await axios.put('/flights/' + flight.flightNo, data, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			setOpen(false);
			flight.getData('');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<IconButton onClick={handleOpen}>
				{' '}
				<EditIcon />{' '}
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<DialogTitle>Edit</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter flight data</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							name="flightNo"
							id="flightNo"
							label="Flight Number"
							type="text"
							value={flightNo}
							onChange={(event) => {
								setFlightNo(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<DateTimePicker
							renderInput={(props) => (
								<TextField {...props} margin="dense" fullWidth />
							)}
							label="Departure Time"
							value={departureTime}
							onChange={(newValue) => {
								setDepartureTime(
									new Date(new Date(newValue.setSeconds(0)).setMilliseconds(0))
								);
							}}
						/>
						<DateTimePicker
							renderInput={(props) => (
								<TextField {...props} margin="dense" fullWidth />
							)}
							label="Arrival Time"
							value={arrivalTime}
							onChange={(newValue) => {
								setArrivalTime(
									new Date(new Date(newValue.setSeconds(0)).setMilliseconds(0))
								);
							}}
						/>
						<TextField
							margin="dense"
							name="departureLocation"
							id="departureLocation"
							label="Departure Location"
							type="text"
							value={departureLocation}
							onChange={(event) => {
								setDepartureLocation(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<TextField
							margin="dense"
							name="departureTerminal"
							id="departureTerminal"
							label="Departure Terminal"
							type="text"
							value={departureTerminal}
							onChange={(event) => {
								setDepartureTerminal(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<TextField
							margin="dense"
							name="arrivalLocation"
							id="arrivalLocation"
							label="Arrival Location"
							type="text"
							value={arrivalLocation}
							onChange={(event) => {
								setArrivalLocation(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<TextField
							margin="dense"
							name="arrivalTerminal"
							id="arrivalTerminal"
							label="Arrival Terminal"
							type="text"
							value={arrivalTerminal}
							onChange={(event) => {
								setArrivalTerminal(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<TextField
							margin="dense"
							name="seatsEcon"
							id="seatsEcon"
							label="Number of Economy Seats"
							type="number"
							value={seatsEcon}
							onChange={(event) => {
								setSeatsEcon(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<TextField
							margin="dense"
							name="seatsBus"
							id="seatsBus"
							label="Number of Business Seats"
							type="number"
							value={seatsBus}
							onChange={(event) => {
								setSeatsBus(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<TextField
							margin="dense"
							name="priceEcon"
							id="priceEcon"
							label="Price of Economy Seats"
							type="number"
							value={priceEcon}
							onChange={(event) => {
								setPriceEcon(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<TextField
							margin="dense"
							name="priceBus"
							id="priceBus"
							label="Price of Business Seats"
							type="number"
							value={priceBus}
							onChange={(event) => {
								setPriceBus(event.target.value);
							}}
							fullWidth
							variant="outlined"
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
