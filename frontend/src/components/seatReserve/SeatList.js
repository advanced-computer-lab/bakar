import { Grid } from '@mui/material';
import SeatItem from './SeatItem';
import { useState } from 'react';

function Seats({ row, reqSeats, setReqSeats, pickedSeats }) {
	return row.map(({ seatStatus, seatNo }, index) => {
		return (
			<Grid
				key={seatNo}
				item
				sx={{ width: 50, m: 1, mr: (index + 1) % 4 === 2 ? 10 : 0 }}
			>
				<SeatItem
					seatStatus={seatStatus}
					index={seatNo}
					requestedSeats={reqSeats}
					setRequestedSeats={setReqSeats}
					pickedSeats={pickedSeats}
				/>
			</Grid>
		);
	});
}
export default function SeatList({ seats, reqSeats, pickedSeats }) {
	const [totalSeats, setTotalSeats] = useState(reqSeats);
	console.log(pickedSeats.current);
	return (
		<Grid item>
			{seats.map((row, index) => {
				return (
					<Grid container direction="row" key={index}>
						<Seats
							row={row}
							reqSeats={totalSeats}
							setReqSeats={setTotalSeats}
							pickedSeats={pickedSeats}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
}
