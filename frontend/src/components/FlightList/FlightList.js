import { Paper, Grid, Divider } from '@mui/material';
import React from 'react';
import { UserType } from '../../userType';
import FlightItem from './FlightItem';

function FlightList(props) {
	let flag = props.userType !== UserType.admin;

	return (
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
						<Grid item>
							<FlightItem
								flight={flight}
								cabin={props.cabin}
								priceFactor={props.priceFactor}
							></FlightItem>
						</Grid>
					))}
			</Grid>
		</Grid>
	);
}

export default FlightList;
