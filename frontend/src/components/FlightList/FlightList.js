import { Paper, Grid, Card, Box, Button} from '@mui/material';
import React from 'react';
import { UserType } from '../../userType';
import FlightItem from './FlightItem';
import FlightDetails from '../FlightList/FlightDetails';
import { useNavigate, useLocation } from 'react-router-dom';

function FlightList(props) {
	let flag = props.userType !== UserType.admin;
	const { departureFlight, returnFlight, setDepartureFlight, setReturnFlight } = props
	const navigate = useNavigate();
	const location = useLocation();
	console.log('seats', props.noOfSeats);
	const changeDep = () => {
		navigate("/flights", 
				{
					replace: true,
					state: {
						...location.state,
						departureFlight: null,
						returnFlight: returnFlight,
					}
			});
		setDepartureFlight(null);
	}
	const changeReturn = () => {
		navigate("/flights", 
				{
					replace: true,
					state: {
						...location.state,
						departureFlight: departureFlight,
						returnFlight: null,
					}
			});
		setReturnFlight(null);
	}
	const handleCheckout = () => {
		navigate();
	}
	return (
		<div>
			{(departureFlight || returnFlight) &&
				<Grid container direction="column" rowSpacing={1} item xs>
					<Grid item xs>
					<Card
						sx={{
							display: 'flex',
							backgroundColor: 'rgb(254, 239, 221, 0.5)',
							padding: '10px',
						}}
						>
							{departureFlight &&
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Grid item xs>
									<h3>Selected Departure</h3>
								</Grid>
									<FlightDetails
										flight={departureFlight}
										selectedCabin={departureFlight.cabin}
										onClick={changeDep}
										text="Change"
									/>
								</Box>
							}
							{returnFlight &&
							
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Grid item xs>
								<h3>Selected Return</h3>
							</Grid>
									<FlightDetails
										flight={returnFlight}
										selectedCabin={returnFlight.cabin}
										onClick={changeReturn}
										text="Change"
									/>
							</Box>}
						</Card>
					</Grid>
					{(departureFlight && returnFlight) &&
						<Button
							variant="contained"
							color="primary"
							sx={{
								':hover': { backgroundColor: '#CD5334' },
								mt: 2,
								mb: 1.5,
							}}
							onClick={handleCheckout}
						>
						Check Out
						</Button>}
				</Grid>}
			{!(departureFlight && returnFlight) &&
				<div>
					<h2 style={{ textAlign: 'center' }}>
				{departureFlight == null
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
									departureFlight={departureFlight}
									setDepartureFlight={setDepartureFlight}
									setReturnFlight={setReturnFlight}
								></FlightItem>
							</Grid>
						))}
				</Grid>
			</Grid>
				</div>}
			
		</div>
	);
}

export default FlightList;
