import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { DateTimePicker } from '@mui/lab';
import NumberCounter from './NumberCounter';
import {
	Grid,
	Box,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
	Dialog,
	TextField,
	Button,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
} from '@mui/material';

export default function SearchFlightUser({ getData }) {
	const [open, setOpen] = React.useState(false);
	const [departureTime, setDepartureTime] = React.useState(null);
	const [arrivalTime, setArrivalTime] = React.useState(null);
	const [departureTerminal, setDepartureTerminal] = React.useState();
	const [arrivalTerminal, setArrivalTerminal] = React.useState();
	const [cabin, setCabin] = React.useState();
	const [adults, setAdults] = React.useState(0);
	const [children, setChildren] = React.useState(0);

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
				departureTime: departureTime,
				arrivalTime: arrivalTime,
				departureTerminal: departureTerminal,
				arrivalTerminal: arrivalTerminal,
			};
			data[cabin] = adults + children;
			console.log(data[cabin]);
			let requested = Object.fromEntries(
				Object.entries(data).filter(([_, v]) => v != null)
			);
			let searchParams = new URLSearchParams(requested);
			let searchQuery = searchParams.toString();
			setOpen(false);
			getData(searchQuery);
			setDepartureTime(null);
			setArrivalTerminal(null);
			setDepartureTerminal(null);
			setArrivalTime(null);
			setCabin(null);
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
					<DialogTitle>Book a flight</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter flight data</DialogContentText>
						<Grid
							container
							direction="row"
							rowSpacing={2}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item xs>
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
							</Grid>{' '}
							<Grid item xs>
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
							</Grid>
						</Grid>
						<TextField
							margin="dense"
							name="departureTerminal"
							id="departureTerminal"
							label="Departure Terminal"
							type="text"
							onChange={(event) => {
								setDepartureTerminal(event.target.value);
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
							onChange={(event) => {
								setArrivalTerminal(event.target.value);
							}}
							fullWidth
							variant="outlined"
						/>
						<FormLabel component="legend">Cabin</FormLabel>
						<RadioGroup
							row
							name="row-radio-buttons-group"
							onChange={(event) => {
								setCabin(event.target.value);
							}}
						>
							<FormControlLabel
								value="availableEcon"
								control={<Radio />}
								label="Economy"
							/>
							<FormControlLabel
								value="availableBus"
								control={<Radio />}
								label="Business"
							/>
						</RadioGroup>
						<label>Adults</label>{' '}
						<NumberCounter value={adults} setValue={setAdults}></NumberCounter>
						<label>Children</label>{' '}
						<NumberCounter
							value={children}
							setValue={setChildren}
						></NumberCounter>
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
