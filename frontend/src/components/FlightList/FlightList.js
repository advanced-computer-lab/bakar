import {
	Paper,
	Grid,
	Card,
	Box,
	Button,
	Typography,
	Divider,
} from '@mui/material';
import React from 'react';
import { UserType } from '../../userType';
import FlightItem from './FlightItem';
import FlightDetails from '../FlightList/FlightDetails';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';

function FlightList(props) {
	let flag = props.userType === UserType.guest;
	const {
		departureFlight,
		returnFlight,
		setDepartureFlight,
		setReturnFlight,
		ticket,
	} = props;
	const navigate = useNavigate();
	const location = useLocation();

	const changeDep = () => {
		navigate('/flights', {
			replace: true,
			state: {
				...location.state,
				departureFlight: null,
				returnFlight: returnFlight,
			},
		});
		setDepartureFlight(null);
	};
	const changeReturn = () => {
		navigate('/flights', {
			replace: true,
			state: {
				...location.state,
				departureFlight: departureFlight,
				returnFlight: null,
			},
		});
		setReturnFlight(null);
	};
	const handleCheckout = async () => {
		console.log('token ', localStorage.getItem('token'));
		if (flag) {
			navigate('/login');
		}
		try {
			console.log(location.state);
			let res = await axios.post('/payments/checkout', {
				amount:
					departureFlight.cabin === 'Economy'
						? (departureFlight.priceEcon + returnFlight.priceEcon) *
						  props.priceFactor
						: (departureFlight.priceBus + returnFlight.priceBus) *
						  props.priceFactor,
				ticketBody: {
					departureFlightNo: departureFlight.flightNo,
					returnFlightNo: returnFlight.flightNo,
					cabin: departureFlight.cabin,
					seatsDeparture: departureFlight.seats,
					seatsReturn: returnFlight.seats,
					priceDeparture:
						departureFlight.cabin === 'Economy'
							? departureFlight.priceEcon * props.priceFactor
							: departureFlight.priceBus * props.priceFactor,
					priceReturn:
						departureFlight.cabin === 'Economy'
							? returnFlight.priceEcon * props.priceFactor
							: returnFlight.priceBus * props.priceFactor,
				},
			});
			window.location.replace(res.data.url);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			{(departureFlight || returnFlight) && (
				<Card
					sx={{
						display: 'flex',
						backgroundColor: 'rgb(254, 239, 221, 0.5)',
						padding: '10px',
						alignSelf: 'center',
						alignItems: 'center',
						alignContent: 'center',
						justifyContent: 'center',
					}}
				>
					<Grid
						container
						direction="column"
						alignItems="center"
						alignContent="center"
						justifyContent="center"
						rowSpacing={1}
					>
						<Grid item>
							<Grid
								container
								direction="row"
								rowSpacing={1}
								columnSpacing={3}
								alignItems="center"
								alignContent="center"
								justifyContent="center"
							>
								<Grid item>
									{departureFlight && (
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<Grid
												container
												direction="column"
												alignContent="center"
												alignItems="center"
											>
												<Grid item>
													<h3>Selected Departure</h3>
												</Grid>
												<FlightDetails
													flight={departureFlight}
													selectedCabin={departureFlight.cabin}
													onClick={changeDep}
													text="Change"
												/>
											</Grid>
										</Box>
									)}
								</Grid>

								<Grid item>
									{returnFlight && (
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<Grid
												container
												direction="column"
												alignContent="center"
												alignItems="center"
											>
												<Grid item>
													<h3>Selected Return</h3>
												</Grid>
												<FlightDetails
													flight={returnFlight}
													selectedCabin={returnFlight.cabin}
													onClick={changeReturn}
													text="Change"
												/>
											</Grid>
										</Box>
									)}
								</Grid>
							</Grid>
						</Grid>
						{departureFlight && returnFlight && (
							<Grid item>
								<Card
									sx={{
										display: 'flex',
										backgroundColor: 'rgb(45, 72, 83, 0.5)',
										padding: '10px',
										width: '400px',
									}}
								>
									<Grid container direction="column">
										<Grid item>
											<Grid container direction="row" columnSpacing={10}>
												<Grid item ml={2}>
													<Grid container direction="column">
														<Grid item>
															<Typography variant="h5">
																Departure Seat(s)
															</Typography>
															<Typography variant="h6">
																{departureFlight.seats.join(', ')}
															</Typography>
														</Grid>

														<Divider
															orientation="vertical"
															variant="middle"
															sx={{ margin: '0 10px 0 10px' }}
														/>
														<Grid item mt={2}>
															<Typography variant="h5">
																Return Seat(s)
															</Typography>
															<Typography variant="h6">
																{returnFlight.seats.join(', ')}
															</Typography>
														</Grid>
													</Grid>
												</Grid>
												<Grid item>
													<Grid container direction="column">
														<Grid item>
															<PaymentsTwoToneIcon
																sx={{ width: '50px', height: '50px' }}
															/>
														</Grid>
														<Grid item>
															<Typography>Total Price</Typography>
															<Typography variant="h5">
																{departureFlight.cabin === 'Economy'
																	? (departureFlight.priceEcon +
																			returnFlight.priceEcon) *
																	  props.priceFactor
																	: (departureFlight.priceBus +
																			returnFlight.priceBus) *
																	  props.priceFactor}
																$
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
										<Grid
											item
											alignItems="center"
											alignContent="center"
											justifyContent="center"
											alignSelf="center"
										>
											<Button
												variant="contained"
												color="primary"
												sx={{
													':hover': { backgroundColor: '#CD5334' },
													mt: 2,
													mb: 1.5,
													width: '350px',
												}}
												onClick={handleCheckout}
											>
												Check Out
											</Button>
										</Grid>
									</Grid>
								</Card>
							</Grid>
						)}
					</Grid>
				</Card>
			)}
			{!(departureFlight && returnFlight) && (
				<div>
					<h2 style={{ textAlign: 'center' }}>
						{departureFlight == null ? 'Departure Flights' : 'Return Flights'}
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
											ticket={ticket}
										></FlightItem>
									</Grid>
								))}
						</Grid>
					</Grid>
				</div>
			)}
		</div>
	);
}

export default FlightList;
