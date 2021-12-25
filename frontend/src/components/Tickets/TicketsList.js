import React from 'react';
import { Paper, Grid } from '@mui/material';
import TicketItem from './TicketItem';

function TicketsList(props) {
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
					maxWidth: '950px',
					p: 2,
				}}
				alignItems="center"
				justifyContent="center"
			>
				<Grid item>
					{props.tickets &&
						props.tickets.map((ticket) => (
							<TicketItem
								key={ticket._id}
								userType={props.userType}
								ticket={ticket}
								triggerDep={props.triggerDep} triggerRet={props.triggerRet}
							/>
						))}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default TicketsList;
