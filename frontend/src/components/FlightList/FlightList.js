import { Paper, Grid } from '@mui/material';
import React from 'react';
import { UserType } from '../../userType';
import FlightItem from './FlightItem';

function FlightList(props) {
	let flag = props.userType !== UserType.admin;

	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>
				{props.transaction.searchSteps[0] === 'departure'
					? 'Departure Flights'
					: 'Return Flights'}
			</h2>
			<Grid container alignItems="center" justifyContent="center">
				<Grid
					container
					component={Paper}
					direction="column"
					rowSpacing={3}
					sx={{
						mt: 1,
						backgroundColor: 'rgb(254, 239, 221, .50)',
						maxWidth: '700px',
						p: 2,
					}}
					alignItems="center"
					justifyContent="center"
				>
					{props.flights &&
						props.flights.map((flight) => (
							<Grid item key={flight.flightNo}>
								<FlightItem
									key={flight.flightNo}
									flight={flight}
									cabin={props.cabin}
									priceFactor={props.priceFactor}
									userType={props.userType}
									noOfSeats={props.noOfSeats}
									transaction={props.transaction}
								></FlightItem>
							</Grid>
						))}
				</Grid>
			</Grid>
		</div>
	);
}

export default FlightList;
