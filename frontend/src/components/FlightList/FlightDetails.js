import React from 'react';
import { Card, Box, Grid, Typography, Divider, Button } from '@mui/material';
import FlightTimeline from './FlightTimeline';

export default function FlightDetails({
	selectedCabin,
	flight,
	type,
	onClick,
}) {
	return (
		<Card
			sx={{
				display: 'flex',
				backgroundColor: 'rgb(254, 239, 221, 0.5)',
				padding: '10px',
				justifyContent: 'center',
				alignContent: 'center',
				textAlign: 'center',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Grid container direction="row" columnSpacing={1}>
					<Grid item>
						<Card
							sx={{
								backgroundColor: 'rgb(254, 239, 221, 0.5)',
							}}
						>
							<FlightTimeline flight={flight} />
						</Card>
					</Grid>

					<Grid item>
						<Grid container direction="column" rowSpacing={2}>
							<Grid item>
								<Card
									sx={{
										backgroundColor: 'rgb(254, 239, 221, 0.5)',
										pl: 2,
										pr: 2,
									}}
								>
									<Typography
										component="div"
										variant="subtitle1"
										color="#183642"
										sx={{ mt: 0.5 }}
									>
										Price per person
									</Typography>
									<Typography
										variant="subtitle2"
										color="#183642"
										component="div"
										noWrap
									>
										{selectedCabin === 'Economy'
											? flight.priceEcon
											: flight.priceBus}
										$
									</Typography>

									<Divider
										orientation="vertical"
										variant="middle"
										sx={{ margin: '10px' }}
									/>

									<Typography
										component="div"
										variant="subtitle1"
										color="#183642"
									>
										Bag(s) per person
									</Typography>
									<Typography
										variant="subtitle2"
										color="#183642"
										component="div"
										sx={{ mb: 1 }}
									>
										{selectedCabin === 'Economy'
											? flight.noBagsEcon
											: flight.noBagsBus}
									</Typography>
								</Card>
							</Grid>
							<Grid item justifyContent="center" alignContent="center">
								<Card
									sx={{
										backgroundColor: 'rgb(254, 239, 221, 0.5)',
									}}
								>
									<Typography
										component="div"
										variant="subtitle1"
										color="#183642"
										sx={{ mt: 0.5 }}
									>
										Flight Number
									</Typography>
									<Typography
										variant="subtitle2"
										color="#183642"
										component="div"
									>
										{flight.flightNo}
									</Typography>
									<Button
										variant="contained"
										color="primary"
										sx={{
											':hover': { backgroundColor: '#CD5334' },
											mt: 2,
											mb: 1.5,
										}}
										onClick={onClick}
									>
										{type === 'select' ? 'Select' : 'Edit'}
									</Button>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
}
