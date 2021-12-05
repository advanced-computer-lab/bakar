import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableRow,
	TableCell,
	TableHead,
} from '@mui/material';
import React from 'react';
import FlightRow from './FlightRow';
import { UserType } from '../../userType';

function FlightTable(props) {
	const style = {
		fontSize: 16,
		fontWeight: 'bold',
	};
	let flag = props.userType !== UserType.admin;

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						{!flag && (
							<TableCell style={style} align="center" colSpan={1}>
								Flight Number
							</TableCell>
						)}
						<TableCell style={style} align="center" colSpan={1}>
							Departure Time - Arrival Time
						</TableCell>
						<TableCell style={style} align="center" colSpan={1}>
							Departure Location - Arrival Location <br /> Departure Terminal -
							Arrival Terminal
						</TableCell>
						{!flag && (
							<TableCell style={style} align="center" colSpan={1}>
								Number of Seats
							</TableCell>
						)}
						<TableCell style={style} align="center" colSpan={1}>
							Price of Economy Seats
						</TableCell>
						<TableCell style={style} align="center" colSpan={1}>
							Price of Business Seats
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.flights &&
						props.flights.map((flight) => (

							<FlightRow
								
								key={flight.flightNo}
								userType={props.userType}
								flightNo={flight.flightNo}
								departureTime={flight.departureTime}
								arrivalTime={flight.arrivalTime}
								departureLocation={flight.departureLocation}
								departureTerminal={flight.departureTerminal}
								arrivalLocation={flight.arrivalLocation}
								arrivalTerminal={flight.arrivalTerminal}
								seatsEcon={flight.seatsEcon}
								seatsBus={flight.seatsBus}
								priceEcon={flight.priceEcon}
								priceBus={flight.priceBus}
								noBagsEcon={flight.noBagsEcon}
								noBagsBus={flight.noBagsBus}
								weightEcon={flight.weightEcon}
								weightBus={flight.weightBus}
								priceFactor={props.priceFactor}
								checks={props.checks}
								setChecks={props.setChecks}
								getData={props.getData}
								setClicked={props.setClicked}
							/>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default FlightTable;
