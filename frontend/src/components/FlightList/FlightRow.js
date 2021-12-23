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
		<TableRow hover>
			{!flag && (
				<TableCell
					align="center"
					onClick={() => props.setClicked(props.flightNo)}
				>
					{props.flightNo}
				</TableCell>
			)}
			<TableCell
				align="center"
				onClick={() => props.setClicked(props.flightNo)}
			>
				{departureTime.toLocaleDateString()}{' '}
				{departureTime.toLocaleTimeString()} -{' '}
				{arrivalTime.toLocaleDateString()} {arrivalTime.toLocaleTimeString()}
			</TableCell>
			<TableCell
				align="center"
				onClick={() => props.setClicked(props.flightNo)}
			>
				{props.departureLocation} - {props.arrivalLocation} <br />{' '}
				{props.departureTerminal} - {props.arrivalTerminal}
			</TableCell>
			{!flag && (
				<TableCell
					align="center"
					onClick={() => props.setClicked(props.flightNo)}
				>
					{props.seatsEcon + props.seatsBus}
				</TableCell>
			)}
			<TableCell
				align="center"
				onClick={() => props.setClicked(props.flightNo)}
			>
				{props.priceEcon * props.priceFactor}
			</TableCell>
			<TableCell
				align="center"
				onClick={() => props.setClicked(props.flightNo)}
			>
				{props.priceBus * props.priceFactor}
			</TableCell>
			<TableCell>{!flag && <EditFlight flight={props} />}</TableCell>
			<TableCell>{!flag && <Checkbox onChange={handleChange} />}</TableCell>
		</TableRow>
	);
}

export default FlightRow;
