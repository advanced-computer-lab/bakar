import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import FlightRow from './FlightRow';

function FlightTable(props) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{props.flights &&
						props.flights.map((flight) => (
							<FlightRow
								key={flight.flightNo}
								flightNo={flight.flightNo}
								departureTime={flight.departureTime}
								arrivalTime={flight.arrivalTime}
								departureLocation={flight.departureLocation}
								arrivalLocation={flight.arrivalLocation}
								seats={flight.seatsEcon + flight.seatsBus}
								priceEcon={flight.priceEcon}
								checks={props.checks}
								setChecks={props.setChecks}
							/>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default FlightTable;
