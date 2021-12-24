import { React, useState, useEffect } from 'react';
import {
	Card,
	Divider,
	Typography,
	Box,
	Grid,
	Collapse,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	IconButton,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import FlightClassIcon from '@mui/icons-material/FlightClass';
import FlightIcon from '@mui/icons-material/Flight';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import DeleteIcon from '@mui/icons-material/Delete';
import PriceTag from '../FlightList/PriceTag';
import FlightTimeline from '../FlightList/FlightTimeline';
import FlightDetails from '../FlightList/FlightDetails';
import axios from '../../api';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Tickets from '../../pages/Tickets';

function FlightNoButton({ flightNo, type }) {

	return (
		<Card
			sx={{
				display: 'flex',
				backgroundColor: 'rgb(254, 239, 221, 0.5)',
				p: 2,
				color: '#183642',
				':hover': {
					backgroundColor: '#183642',
					color: 'background.paper',
				},
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Grid container direction="column">
					<Grid item>
						<FlightIcon
							sx={{
								height: 38,
								width: 38,
								transform: type === 'departure' ? '' : 'rotate(180deg)',
							}}
						/>
					</Grid>
					<Grid item>
						<Typography component="div" variant="h6">
							{flightNo}
						</Typography>
					</Grid>
					<Grid item>
						<Typography component="div" variant="caption" noWrap>
							{`${
								type === 'departure' ? 'Departure ' : 'Return '
							}Flight Number`}
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
}

export default function TicketItem({ ticket, triggerDep, triggerRet }) {
	const [flightDeparture, setFlightDeparture] = useState();
	const [flightReturn, setFlightReturn] = useState();

	const [expandedDeparture, setExpandedDeparture] = useState(false);
	const [expandedReturn, setExpandedReturn] = useState(false);

	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const getFlights = async () => {
		let flightDeparture = (
			await axios.get(`/flights/${ticket.departureFlightNo}`)
		).data;
		setFlightDeparture(flightDeparture);

		let flightReturn = (await axios.get(`/flights/${ticket.returnFlightNo}`))
			.data;
		setFlightReturn(flightReturn);
	};

	const handleDelete = async () => {
		await axios.delete(`/tickets/${ticket._id}`);
		setOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		getFlights();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Grid container direction="column" rowSpacing={1}>
			<Grid item xs>
				<Card
					sx={{
						display: 'flex',
						backgroundColor: 'rgb(254, 239, 221, 0.5)',
						padding: '10px',
					}}
				>
					<Box sx={{ display: 'flex' }}>
						<Grid container direction="row" alignItems="center">
							<Grid item>
								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<AirplaneTicketIcon
										sx={{ height: 50, width: 50, color: '#183642' }}
									/>
									<Typography component="div" variant="h6" color="#183642">
										{ticket._id}
									</Typography>

									<Typography
										component="div"
										variant="caption"
										color="text.secondary"
									>
										Ticket ID
									</Typography>
								</Grid>
							</Grid>

							<Divider
								orientation="vertical"
								variant="middle"
								sx={{ margin: '0 10px 0 10px' }}
							/>

							<Grid item>
								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<Button
										onClick={() => {
											setExpandedReturn(false);
											setExpandedDeparture(!expandedDeparture);
										}}
									>
										<FlightNoButton
											flightNo={ticket.departureFlightNo}
											cabin={ticket.cabin}
											type="departure"
										/>
									</Button>
								</Grid>
							</Grid>

							<Divider
								orientation="vertical"
								variant="middle"
								sx={{ margin: '0 10px 0 10px' }}
							/>

							<Grid item>
								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<Button
										onClick={() => {
											setExpandedDeparture(false);
											setExpandedReturn(!expandedReturn);
										}}
									>
										<FlightNoButton
											flightNo={ticket.returnFlightNo}
											cabin={ticket.cabin}
											type="return"
										/>
									</Button>
								</Grid>
							</Grid>

							<Divider
								orientation="vertical"
								variant="middle"
								sx={{ margin: '0 10px 0 10px' }}
							/>

							<Grid item>
								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<Grid
										container
										direction="row"
										alignItems="center"
										justifyContent="center"
									>
										<Grid item>
											<FlightClassIcon
												sx={{ height: 38, width: 38, color: '#183642' }}
											/>
										</Grid>

										<Grid item>
											<Typography
												component="div"
												variant="h6"
												sx={{ mb: 0.75, ml: 0.5 }}
												noWrap
											>
												{ticket.cabin}
											</Typography>
										</Grid>
									</Grid>

									<Grid item sx={{ ml: 2 }}>
										<Typography component="div" variant="subtitle1" noWrap>
											{ticket.seatsDeparture.join(', ')}
											<IconButton>
												<EditIcon
													sx={{
														width: '20px',
														height: '20px',
														color: 'secondary.main',
													}}
												/>
											</IconButton>
										</Typography>
									</Grid>

									<Grid item>
										<Typography
											component="div"
											color="text.secondary"
											variant="caption"
											noWrap
										>
											Departure Seat(s)
										</Typography>
									</Grid>

									<Grid item sx={{ ml: 2 }}>
										<Typography component="div" variant="subtitle1" noWrap>
											{ticket.seatsReturn.join(', ')}
											<IconButton>
												<EditIcon
													sx={{
														width: '20px',
														height: '20px',
														color: 'secondary.main',
													}}
												/>
											</IconButton>
										</Typography>
									</Grid>

									<Grid item>
										<Typography
											component="div"
											color="text.secondary"
											variant="caption"
											noWrap
										>
											Return Seat(s)
										</Typography>
									</Grid>
								</Grid>
							</Grid>

							<Divider
								orientation="vertical"
								variant="middle"
								sx={{ margin: '0 10px 0 10px' }}
							/>

							<Grid item>
								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<Grid item>
										<PaymentsTwoToneIcon
											sx={{ height: 38, width: 38, color: '#183642' }}
										/>
									</Grid>
									<Grid item>
										<Typography variant="subtitle1" component="div">
											{ticket.priceDeparture + ticket.priceReturn}$
										</Typography>
									</Grid>

									<Grid item>
										<Typography
											variant="caption"
											color="text.secondary"
											component="div"
										>
											Total Ticket Price
										</Typography>
									</Grid>
								</Grid>
							</Grid>

							<Divider
								orientation="vertical"
								variant="middle"
								sx={{ margin: '0 10px 0 10px' }}
							/>
							<Grid
								item
								alignContent="center"
								justifyContent="center"
								alignItems="center"
							>
								<Grid item>
									<Button
										variant="contained"
										sx={{
											backgroundColor: 'background.paper',
											//height: '60x',
											color: 'primary.main',
											':hover': { color: 'background.paper' },
										}}
										onClick={() => {
											setOpen(true);
										}}
									>
										<MailIcon
											sx={{ height: 50, width: 50, color: 'inherit' }}
										/>
									</Button>
								</Grid>
								<Divider
									orientation="horizontal"
									variant="middle"
									sx={{ margin: '5px' }}
								/>
								<Grid item>
									<Button
										variant="contained"
										sx={{
											backgroundColor: 'secondary.main',
											//height: '60px',
											color: 'primary.main',
											':hover': { color: 'background.paper' },
										}}
										onClick={() => {
											setOpen(true);
										}}
									>
										<DeleteIcon
											sx={{ height: 50, width: 50, color: 'inherit' }}
										/>
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Card>
			</Grid>

			<Grid item xs sx={{ pb: 1 }}>
				<Collapse in={expandedDeparture} unmountOnExit>
					<FlightDetails
						selectedCabin={ticket.cabin}
						flight={flightDeparture}
						text='change'
						onClick={() => {
							let myTicket = {
								...ticket,
								returnFlight: flightReturn,
								oldDepartureFlight: flightDeparture,
								adults: ticket.seatsDeparture.length
							}
							triggerDep(myTicket);
							triggerRet(null);
						}}
					/>
				</Collapse>
			</Grid>

			<Grid item sx={{ pb: 1 }}>
				<Collapse in={expandedReturn} unmountOnExit>
					<FlightDetails
						selectedCabin={ticket.cabin}
						flight={flightReturn}
						text='change'
						onClick={() => {
							let myTicket = {
								...ticket,
								departureFlight: flightDeparture,
								oldReturnFlight: flightReturn,
								adults: ticket.seatsDeparture.length
							}
							triggerRet(myTicket);
							triggerDep(null);
						}}
					/>
				</Collapse>
			</Grid>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Careful!'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to remove this reservation?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant="contained" onClick={handleDelete} autoFocus>
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}
