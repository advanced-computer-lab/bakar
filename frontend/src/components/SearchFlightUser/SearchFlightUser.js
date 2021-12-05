import * as React from 'react';
import { DateTimePicker } from '@mui/lab';
import NumberCounter from './NumberCounter';
import {
	Grid,
	Box,
	DialogTitle,
	DialogContentText,
	DialogContent,
	TextField,
	Button,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function SearchFlightUser({ getData, detailsOnly }) {
	const [departureTime, setDepartureTime] = React.useState(null);
	const [arrivalTime, setArrivalTime] = React.useState(null);
	const [departureTerminal, setDepartureTerminal] = React.useState();
	const [arrivalTerminal, setArrivalTerminal] = React.useState();
	const [cabin, setCabin] = React.useState('Economy');
	const [adults, setAdults] = React.useState(1);
	const [children, setChildren] = React.useState(0);

	let navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			let data = {
				departureTime: departureTime,
				arrivalTime: arrivalTime,
				departureTerminal: departureTerminal,
				arrivalTerminal: arrivalTerminal,
				cabin: cabin === 'availableEcon' ? 'Economy' : 'Business',
			};
			data[cabin] = adults + children;
			let requested = Object.fromEntries(
				Object.entries(data).filter(([_, v]) => v != null)
			);
			let searchParams = new URLSearchParams(requested);
			let searchQuery = searchParams.toString();
			setDepartureTime(null);
			setArrivalTerminal(null);
			setDepartureTerminal(null);
			setArrivalTime(null);
			setCabin(null);
			navigate(`/flights?nA=${adults}&nC=${children}&` + searchQuery);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Box
				onSubmit={handleSubmit}
				sx={{
					mt: 1,
					backgroundColor: 'rgb(254, 239, 221, 0.7)',
				}}
			>
				<ValidatorForm
					onSubmit={handleSubmit}
					onError={(errors) => console.log(errors)}
				>
					<DialogTitle>Book a flight</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter flight data</DialogContentText>
						<Grid
							container
							direction="row"
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item>
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
							</Grid>
							<Grid item>
								<FormLabel component="legend">Cabin</FormLabel>
								<RadioGroup
									row
									name="row-radio-buttons-group"
									onChange={(event) => {
										setCabin(event.target.value);
									}}
									defaultValue="availableEcon"
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
								<NumberCounter
									value={adults}
									setValue={setAdults}
								></NumberCounter>
								<label>Children</label>{' '}
								<NumberCounter
									value={children}
									setValue={setChildren}
								></NumberCounter>
							</Grid>
						</Grid>
						<br />
						{!detailsOnly && (
							<Button
								type="submit"
								variant="contained"
								fullWidth
								startIcon={<KeyboardArrowDownIcon />}
							>
								Search flights
							</Button>
						)}
					</DialogContent>
				</ValidatorForm>
			</Box>
		</div>
	);
}
