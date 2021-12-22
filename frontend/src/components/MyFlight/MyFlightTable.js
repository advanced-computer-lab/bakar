import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import MyFlightRow from './MyFlightRow';
import { TableRow, TableCell, TableHead } from '@mui/material';

function MyFlightTable(props) {
	const style = {
		fontSize: 16,
		fontWeight: 'bold',
	};

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell style={style} align="center" colSpan={1}>
							Ticket Number
						</TableCell>
						<TableCell style={style} align="center" colSpan={1}>
							Departure Flight Number
						</TableCell>
						<TableCell style={style} align="center" colSpan={1}>
							Return Flight Number
						</TableCell>
						<TableCell style={style} align="center" colSpan={1}>
							Cabin
						</TableCell>
						<TableCell style={style} align="center" colSpan={1}>
							Reserved Departure Seats
						</TableCell>
						<TableCell style={style} align="center" colSpan={1}>
							Reserved Return Seats
						</TableCell>
						<TableCell style={style} align="center" colSpan={1}>
							Ticket Price
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.tickets &&
						props.tickets.map((ticket) => (
							<MyFlightRow
								key={ticket._id}
								userType={props.userType}
								id={ticket._id}
								departureFlightNo={ticket.departureFlightNo}
								returnFlightNo={ticket.returnFlightNo}
								cabin={ticket.cabin}
								seatsReturn={ticket.seatsReturn}
								seatsDeparture={ticket.seatsDeparture}
								price={ticket.priceReturn + ticket.priceDeparture}
								getData={props.getData}
								setClicked={props.setClicked}
							/>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default MyFlightTable;
