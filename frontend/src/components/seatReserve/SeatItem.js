import React from 'react';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';

export default function SeatItem({
	seatStatus,
	requestedSeats,
	setRequestedSeats,
	index,
	pickedSeats,
	departureFlight,
	returnFlight,
	flight,
	ticket,
}) {
	const [picked, setPicked] = React.useState(false);

	const canReserve = seatStatus === 'Free';
	if (!canReserve) {
		//     const checkArray = departureFlight !== null ? ticket.seatsDeparture : ticket.seatsReturn;
		//     if ((departureFlight && flight.flightNo == departureFlight.flightNo) ||
		//         (returnFlight && flight.flightNo == returnFlight.flightNo)) {
		//         return checkArray.includes(index + 1);
		//     }
		// }
	}
	const handleClick = () => {
		if (canReserve) {
			console.log('old picked', picked);
			const current = pickedSeats.current;
			if (!picked && requestedSeats > 0) {
				setRequestedSeats(requestedSeats - 1);
				setPicked(true);
				console.log('updated picked', picked);
				pickedSeats.current = [...current, index + 1];
			} else if (picked) {
				setRequestedSeats(requestedSeats + 1);
				setPicked(false);
				// remove the seat from our picked seats
				pickedSeats.current = current.filter((value) => value !== index + 1);
			} else if (requestedSeats <= 0) {
				alert(`You can't pick more than ${pickedSeats.current.length} seat(s)`);
			}
		}
		console.log(canReserve + ' ' + picked);
		console.log(requestedSeats);
	};

	return (
		<Card
			onClick={handleClick}
			sx={{
				display: 'flex',
				backgroundColor: canReserve
					? picked
						? 'info.main'
						: 'info.success'
					: 'primary.disabled',
				color: '#183642',
				':hover': {
					backgroundColor: canReserve ? 'secondary.main' : '',
					color: 'background.paper',
				},
				width: 50,
				height: 50,
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					color: 'background.paper',
				}}
			>
				{index + 1}
			</Box>
		</Card>
	);
}
