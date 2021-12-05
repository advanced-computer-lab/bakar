import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, Divider } from '@mui/material';
import axios from '../../api';
export default function CheckOut({
	departureFlight,
	returnFlight,
	open,
	priceFactor,
	setReturnFlight,
	setDepartureFlight,
}) {
	const [openCheck, setOpenCheck] = React.useState(false);
	if (!openCheck && open) {
		setOpenCheck(open);
	}
	const handleSubmit = async () => {
		const cabin = departureFlight.cabin
		const priceDep = cabin === 'Economy'
		? departureFlight.priceEcon * priceFactor * departureFlight.seats.length
			: departureFlight.priceBus * priceFactor * departureFlight.seats.length;
		const priceRet = cabin === 'Economy'
			? returnFlight.priceEcon * priceFactor * returnFlight.seats.length
			: returnFlight.priceBus * priceFactor * returnFlight.seats.length;

		const payload = {
			departureFlightNo: departureFlight.flightNo,
			returnFlightNo: returnFlight.flightNo,
			cabin: cabin,
			seatsDeparture: departureFlight.seats,
			seatsReturn: returnFlight.seats,
			priceDeparture: priceDep,
			priceReturn: priceRet,
		}
		const res = await axios.post('/tickets', payload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, });
		setOpenCheck(false);
		setDepartureFlight(null);
		setReturnFlight(null);
	};


	return (
		<div>
			<Dialog open={openCheck} onClose={() => { setOpenCheck(false) }}>
				<DialogTitle>Check out</DialogTitle>
				<DialogContent>
					<DialogTitle>Departure flight</DialogTitle>
					<DialogContentText>
						Flight Number : {departureFlight.flightNo}
					</DialogContentText>
					<DialogContentText>
						Date : {departureFlight.departureTime.substring(0, 10)}
					</DialogContentText>
					<DialogContentText>
						Time : {departureFlight.departureTime.substring(11, 19)}
					</DialogContentText>
					<DialogContentText>
						Seats : {departureFlight.seats.join(', ')}
					</DialogContentText>
					<DialogContentText>Cabin : {departureFlight.cabin}</DialogContentText>
					<DialogContentText>
						Price :{' '}
						{departureFlight.cabin === 'Economy'
							? departureFlight.priceEcon * priceFactor * departureFlight.seats.length
							: departureFlight.priceBus * priceFactor * departureFlight.seats.length}
					</DialogContentText>
					<DialogTitle>Return flight</DialogTitle>
					<DialogContentText>
						Flight Number : {returnFlight.flightNo}
					</DialogContentText>
					<DialogContentText>
						Date : {returnFlight.departureTime.substring(0, 10)}
					</DialogContentText>
					<DialogContentText>
						Time : {returnFlight.departureTime.substring(11, 19)}
					</DialogContentText>
					<DialogContentText>Cabin : {returnFlight.cabin}</DialogContentText>
					<DialogContentText>
						Seats : {returnFlight.seats.join(', ')}
					</DialogContentText>
					<DialogContentText>
						Price :{' '}
						{returnFlight.cabin === 'Economy'
							? returnFlight.priceEcon * priceFactor * departureFlight.seats.length
							: returnFlight.priceBus * priceFactor * departureFlight.seats.length}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleSubmit}>
						Proceed
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
