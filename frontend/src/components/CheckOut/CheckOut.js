import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions } from '@mui/material';

export default function CheckOut({
	departureFlight,
	returnFlight,
	openCheck,
	setOpenCheck,
}) {
	const handleClose = () => {
		console.log('test');
		setOpenCheck(false);
	};

	return (
		<div>
			<Dialog open={openCheck}>
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
					<DialogContentText>Cabin : {departureFlight.cabin}</DialogContentText>
					<DialogContentText>
						Price :{' '}
						{departureFlight.cabin === 'Economy'
							? departureFlight.priceEcon
							: departureFlight.priceBus}
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
						Price :{' '}
						{returnFlight.cabin === 'Economy'
							? returnFlight.priceEcon
							: returnFlight.priceBus}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose}>
						Proceed
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
