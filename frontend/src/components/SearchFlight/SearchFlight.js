import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { DateTimePicker } from '@mui/lab';

export default function SearchFlight({ getData }) {
	const [open, setOpen] = React.useState(false);
	const [departureTime, setDepartureTime] = React.useState(null);
	const [arrivalTime, setArrivalTime] = React.useState(null);
	const [flightNo, setFlightNo] = React.useState();
	const [departureLocation, setDepartureLocation] = React.useState();
	const [arrivalLocation, setArrivalLocation] = React.useState();
	const [departureTerminal, setDepartureTerminal] = React.useState();
	const [arrivalTerminal, setArrivalTerminal] = React.useState();
	const [seatsEcon, setSeatsEcon] = React.useState();
	const [seatsBus, setSeatsBus] = React.useState();
	const [priceEcon, setPriceEcon] = React.useState();
	const [priceBus, setPriceBus] = React.useState();
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
			let requested = Object.fromEntries(
				Object.entries(data).filter(([_, v]) => v != null)
			);
			let searchParams = new URLSearchParams(requested);
			let searchQuery = searchParams.toString();
			setOpen(false);
			getData(searchQuery);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Button
				variant="contained"
				startIcon={<SearchIcon />}
				onClick={handleOpen}
			>
				Search
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<DialogTitle>Search</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter flight data</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							name="flightNo"
							id="flightNo"
							label="Flight Number"
							value={flightNo}
							type="text"
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
							clearable
							onChange={(newValue) => {
								setDepartureTime(newValue);
							}}
						/>
						<DateTimePicker
							renderInput={(props) => (
								<TextField {...props} margin="dense" fullWidth />
							)}
							label="Arrival Time"
							value={arrivalTime}
							clearable
							onChange={(newValue) => {
								setArrivalTime(newValue);
							}}
						/>
						<TextField
							margin="dense"
							name="departureLocation"
							id="departureLocation"
							label="Departure Location"
							value={departureLocation}
							type="text"
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
							value={arrivalLocation}
							type="text"
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
							value={arrivalTerminal}
							type="text"
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
							value={seatsEcon}
							type="number"
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
							value={seatsBus}
							type="number"
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
							value={priceEcon}
							type="number"
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
							value={priceBus}
							type="number"
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
