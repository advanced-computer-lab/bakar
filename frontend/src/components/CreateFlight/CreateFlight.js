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
import { DateTimePicker } from '@mui/lab';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function CreateFlight({ getData }) {
	const [open, setOpen] = React.useState(false);
	const [departureTime, setDepartureTime] = React.useState(
		new Date(Date.now())
	);
	const [arrivalTime, setArrivalTime] = React.useState(new Date(Date.now()));
	const [flightNo, setFlightNo] = React.useState();
	const [departureLocation, setDepartureLocation] = React.useState();
	const [arrivalLocation, setArrivalLocation] = React.useState();
	const [departureTerminal, setDepartureTerminal] = React.useState();
	const [arrivalTerminal, setArrivalTerminal] = React.useState();
	const [seatsEcon, setSeatsEcon] = React.useState();
	const [seatsBus, setSeatsBus] = React.useState();
	const [priceEcon, setPriceEcon] = React.useState();
	const [priceBus, setPriceBus] = React.useState();
	const [noBagsEcon, setNoBagsEcon] = React.useState();
	const [noBagsBus, setNoBagsBus] = React.useState();
	const [weightEcon, setWeightEcon] = React.useState();
	const [weightBus, setWeightBus] = React.useState();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(
				'/flights',
				{
					flightNo: flightNo.toUpperCase(),
					departureTime: departureTime,
					arrivalTime: arrivalTime,
					departureLocation: departureLocation.charAt(0).toUpperCase()+departureLocation.slice(1).toLowerCase(),
					arrivalLocation: arrivalLocation.charAt(0).toUpperCase()+arrivalLocation.slice(1).toLowerCase(),
					seatsEcon: seatsEcon,
					seatsBus: seatsBus,
					departureTerminal: departureTerminal.toUpperCase(),
					arrivalTerminal: arrivalTerminal.toUpperCase(),
					priceEcon: priceEcon,
					priceBus: priceBus,
					noBagsEcon: noBagsEcon,
					noBagsBus: noBagsBus,
					weightEcon: weightEcon,
					weightBus: weightBus,
				},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				}
			);
			console.log(departureTime);
			setOpen(false);
			getData('');
		} catch (err) {
			console.log(err);
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
				<ValidatorForm
					onSubmit={handleSubmit}
					onError={(errors) => console.log(errors)}
				>
					<DialogTitle>Create</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter flight data</DialogContentText>
						<TextValidator
							autoFocus
							margin="dense"
							name="flightNo"
							id="flightNo"
							label="Flight Number"
							type="text"
							fullWidth
							variant="outlined"
							value={flightNo}
							onChange={(event) => {
								setFlightNo(event.target.value);
							}}
							validators={['required']}
							errorMessages={['this field is required']}
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
						<TextValidator
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
							validators={['required']}
							errorMessages={['this field is required']}
						/>
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
							fullWidth
							variant="outlined"
							validators={['required']}
							errorMessages={['this field is required']}
						/>
						<TextValidator
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
							validators={['required']}
							errorMessages={['this field is required']}
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
							fullWidth
							variant="outlined"
							validators={['required']}
							errorMessages={['this field is required']}
						/>
						<TextValidator
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
							validators={['required', 'isNumber']}
							errorMessages={['this field is required', 'must be a number']}
						/>
						<TextValidator
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
							validators={['required', 'isNumber']}
							errorMessages={['this field is required', 'must be a number']}
						/>
						<TextValidator
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
							validators={['required', 'isNumber']}
							errorMessages={['this field is required', 'must be a number']}
						/>
						<TextValidator
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
							validators={['required', 'isNumber']}
							errorMessages={['this field is required', 'must be a number']}
						/>
						<TextValidator
							autoFocus
							margin="dense"
							name="noBagsEcon"
							id="noBagsEcon"
							label="Economy Bags"
							type="tel"
							value={noBagsEcon}
							onChange={(event) => {
								setNoBagsEcon(event.target.value);
							}}
							fullWidth
							variant="outlined"
							validators={['required', 'isNumber']}
							errorMessages={['this field is required', 'must be a number']}
						/>
						<TextValidator
							autoFocus
							margin="dense"
							name="noBagsBus"
							id="noBagsBus"
							label="Business Bags"
							type="text"
							value={noBagsBus}
							onChange={(event) => {
								setNoBagsBus(event.target.value);
							}}
							fullWidth
							variant="outlined"
							validators={['required', 'isNumber']}
							errorMessages={['this field is required', 'must be a number']}
						/>
						<TextValidator
							autoFocus
							margin="dense"
							name="weightEcon"
							id="weightEcon"
							label="Economy Bag Weight"
							type="tel"
							value={weightEcon}
							onChange={(event) => {
								setWeightEcon(event.target.value);
							}}
							fullWidth
							variant="outlined"
							validators={['required', 'isNumber']}
							errorMessages={['this field is required', 'must be a number']}
						/>
						<TextValidator
							autoFocus
							margin="dense"
							name="weightBus"
							id="weightBus"
							label="Business Bag Weight"
							type="text"
							value={weightBus}
							onChange={(event) => {
								setWeightBus(event.target.value);
							}}
							fullWidth
							variant="outlined"
							validators={['required', 'isNumber']}
							errorMessages={['this field is required', 'must be a number']}
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
				</ValidatorForm>
			</Dialog>
		</div>
	);
}
