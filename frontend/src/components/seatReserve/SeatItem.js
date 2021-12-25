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
	const picked = pickedSeats.current.includes(index + 1);
	let booked = false;
	if (ticket) {
		booked =
			ticket.seatsDeparture.includes(index + 1) ||
			ticket.seatsReturn.includes(index + 1);
	}

	const canReserve = seatStatus === 'Free' || booked;

	const handleClick = () => {
		if (canReserve) {
			const current = pickedSeats.current;
			if (!picked && requestedSeats > 0) {
				setRequestedSeats(requestedSeats - 1);
				pickedSeats.current = [...current, index + 1];
			} else if (picked) {
				setRequestedSeats(requestedSeats + 1);
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
