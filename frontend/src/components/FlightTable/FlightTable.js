import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import FlightRow from './FlightRow';

function FlightTable(props) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					<FlightRow
						id={1}
						departDate={'1/11/2021'}
						arriveDate={'2/11/2021'}
						departLocation={'Cairo'}
						arriveLocation={'Berlin'}
						seats={'19'}
						price={'8850 EG'}
					/>
					{props.flights &&
						props.flights.map((flight) => (
							<FlightRow
								id={flight.flightNo}
								departDate={flight.departureTime}
								arriveDate={flight.arrivalTime}
								departLocation={flight.departureLocation}
								arriveLocation={flight.arrivalLocation}
								seats={flight.seats}
								price={flight.price}
							/>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default FlightTable;
