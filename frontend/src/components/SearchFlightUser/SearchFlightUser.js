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

export default function SearchFlightUser({ detailsOnly }) {
	const [departureTime, setDepartureTime] = React.useState(
		new Date(Date.now() + 3600 * 1000 * 3)
	);
	const [returnTime, setReturnTime] = React.useState(
		new Date(Date.now() + 3600 * 1000 * 24)
	);
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
				returnTime: returnTime,
				departureTerminal: departureTerminal == null ? departureTerminal:departureTerminal.toUpperCase(),
                arrivalTerminal: arrivalTerminal == null ? arrivalTerminal:arrivalTerminal.toUpperCase(),
				cabin: cabin,
				adults: adults,
				children: children,
			};

			const requestedSeats = adults + children;

			if (data.cabin === 'Economy') {
				data.availableEcon = requestedSeats;
			} else {
				data.availableBus = requestedSeats;
			}

			navigate(`/flights`, {
				state: {
					...data,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Box
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
						<br></br>
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
											minDateTime={new Date()}
										/>
									</Grid>{' '}
									<Grid item xs>
										<DateTimePicker
											renderInput={(props) => (
												<TextField {...props} margin="dense" fullWidth />
											)}
											label="Return Time"
											value={returnTime}
											clearable
											onChange={(newValue) => {
												setReturnTime(newValue);
											}}
											minDateTime={departureTime}
										/>
									</Grid>
								</Grid>
								<TextValidator
									margin="dense"
									name="departureTerminal"
									id="departureTerminal"
									label="Departure Terminal"
									type="text"
									value={departureTerminal}
									onChange={(event) => {
										setDepartureTerminal(event.target.value);
									}}
									variant="outlined"
									validators={['required']}
									errorMessages={['this field is required']}
									fullWidth
								/>
								<TextValidator
									margin="dense"
									name="arrivalTerminal"
									id="arrivalTerminal"
									label="Arrival Terminal"
									type="text"
									value={arrivalTerminal}
									onChange={(event) => {
										setArrivalTerminal(event.target.value);
									}}
									variant="outlined"
									validators={['required']}
									errorMessages={['this field is required']}
									fullWidth
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
									value={cabin}
								>
									<FormControlLabel
										value="Economy"
										control={<Radio />}
										label="Economy"
									/>
									<FormControlLabel
										value="Business"
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
