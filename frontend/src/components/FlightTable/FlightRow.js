import React from 'react';
import { TableRow, Checkbox, TableCell } from '@mui/material';
import EditFlight from '../EditFlight/EditFlight';
import { UserType } from '../../userType';
import './style.css';

function FlightRow(props) {
	let flag = props.userType !== UserType.admin;

	function handleChange(event) {
		let newChecks = { ...props.checks, [props.flightNo]: event.target.checked };
		props.setChecks(newChecks);
		console.log(newChecks);
	}

	const departureTime = new Date(props.departureTime);
	const arrivalTime = new Date(props.arrivalTime);

	return (
		<TableRow hover onClick={() => props.setClicked(props.flightNo)}>
			{!flag && <TableCell align="center">{props.flightNo}</TableCell>}
			<TableCell align="center">
				{departureTime.toLocaleDateString()}{' '}
				{departureTime.toLocaleTimeString()} -{' '}
				{arrivalTime.toLocaleDateString()} {arrivalTime.toLocaleTimeString()}
			</TableCell>
			<TableCell align="center">
				{props.departureLocation} - {props.arrivalLocation} <br />{' '}
				{props.departureTerminal} - {props.arrivalTerminal}
			</TableCell>
			{!flag && (
				<TableCell align="center">{props.seatsEcon + props.seatsBus}</TableCell>
			)}
			<TableCell align="center">{props.priceEcon * props.noOfSeats}</TableCell>
			<TableCell align="center">{props.priceBus * props.noOfSeats}</TableCell>
			<TableCell>{!flag && <EditFlight flight={props} />}</TableCell>
			<TableCell>{!flag && <Checkbox onChange={handleChange} />}</TableCell>
		</TableRow>
	);
}

export default FlightRow;
