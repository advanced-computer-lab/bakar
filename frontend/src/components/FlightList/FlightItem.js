import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
	Card,
	Divider,
	Typography,
	Box,
	IconButton,
	Checkbox,
	Grid,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EditFlight from '../EditFlight/EditFlight';
import { UserType } from '../../userType';
import './style.css';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import LuggageIcon from '@mui/icons-material/Luggage';
import PaymentsIcon from '@mui/icons-material/Payments';
import Masonry from '@mui/lab/Masonry';

export default function FlightItem(props) {
	const theme = useTheme();

	let flag = props.userType !== UserType.admin;

	function handleChange(event) {
		let newChecks = { ...props.checks, [props.flightNo]: event.target.checked };
		props.setChecks(newChecks);
		console.log(newChecks);
	}

	const departureTime = new Date(props.departureTime);
	const arrivalTime = new Date(props.arrivalTime);

	return (
		<Grid
			container
			direction="row"
			columnSpacing={2}
			sx={{ alignItems: 'stretch' }}
		>
			<Grid item>
				<Card
					sx={{
						display: 'flex',
						backgroundColor: 'rgb(254, 239, 221, 0.5)',
						padding: '10px',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Grid
							container
							direction="column"
							alignItems="center"
							justifyContent="center"
						>
							<Typography component="div" variant="h6" color="#183642">
								3:15 AM
							</Typography>
							<Typography variant="h6" color="#183642" component="div">
								BER
							</Typography>
							<Typography
								variant="subtitle2"
								color="text.secondary"
								component="div"
							>
								Berlin
							</Typography>
							<IconButton aria-label="previous">
								<FlightTakeoffIcon
									sx={{ height: 38, width: 38, color: '#183642' }}
								/>
							</IconButton>
						</Grid>
						<hr
							style={{
								color: '#183642',
								backgroundColor: '#183642',
								height: 5,
								width: 100,
							}}
						/>
						<Grid
							container
							direction="column"
							alignItems="center"
							justifyContent="center"
						>
							<Typography component="div" variant="h6" color="#183642">
								12:30 PM
							</Typography>
							<Typography variant="h6" color="#183642" component="div">
								ALX
							</Typography>
							<Typography
								variant="subtitle2"
								color="text.secondary"
								component="div"
							>
								Alexandria
							</Typography>
							<IconButton aria-label="Arrival Time">
								<FlightLandIcon
									sx={{
										height: 38,
										width: 38,
										color: '#183642',
									}}
								/>
							</IconButton>
						</Grid>
						<Divider orientation="vertical" variant="middle" sx={{}} />
						<IconButton>
							<KeyboardArrowDown></KeyboardArrowDown>
						</IconButton>
					</Box>
				</Card>
			</Grid>
			<Grid item>
				<Grid container direction="column" rowSpacing={1}>
					<Grid item>
						<Card
							sx={{
								display: 'flex',
								backgroundColor: 'rgb(254, 239, 221, 0.5)',
								pl: 2,
								pr: 2,
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Grid container alignItems="center" justifyContent="center">
									<Typography
										component="div"
										variant="subtitle1"
										color="#183642"
									>
										Economy
									</Typography>
								</Grid>

								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<IconButton aria-label="previous">
										<LuggageIcon
											sx={{ height: 38, width: 38, color: '#183642' }}
										/>
									</IconButton>
									<Typography
										variant="subtitle2"
										color="text.secondary"
										component="div"
									>
										3 bags
									</Typography>
								</Grid>

								<Grid container>
									<Typography
										variant="body2"
										color="text.secondary"
										component="div"
										align="center"
									>
										25 KG/Bag
									</Typography>
								</Grid>
								<Divider
									orientation="vertical"
									variant="middle"
									sx={{ height: '20px' }}
								/>

								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<IconButton aria-label="previous">
										<PaymentsIcon
											sx={{ height: 38, width: 38, color: '#183642' }}
										/>
									</IconButton>
									<Typography
										variant="subtitle2"
										color="text.secondary"
										component="div"
									>
										1000$
									</Typography>
								</Grid>
							</Box>
						</Card>
					</Grid>

					<Grid item>
						<Card
							sx={{
								display: 'flex',
								backgroundColor: 'rgb(254, 239, 221, 0.5)',
								pl: 2,
								pr: 2,
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Grid container alignItems="center" justifyContent="center">
									<Typography
										component="div"
										variant="subtitle1"
										color="#183642"
									>
										Economy
									</Typography>
								</Grid>

								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<IconButton aria-label="previous">
										<LuggageIcon
											sx={{ height: 38, width: 38, color: '#183642' }}
										/>
									</IconButton>
									<Typography
										variant="subtitle2"
										color="text.secondary"
										component="div"
									>
										3 bags
									</Typography>
								</Grid>

								<Grid container>
									<Typography
										variant="body2"
										color="text.secondary"
										component="div"
										align="center"
									>
										25 KG/Bag
									</Typography>
								</Grid>
								<Divider
									orientation="vertical"
									variant="middle"
									sx={{ height: '20px' }}
								/>

								<Grid
									container
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<IconButton aria-label="previous">
										<PaymentsIcon
											sx={{ height: 38, width: 38, color: '#183642' }}
										/>
									</IconButton>
									<Typography
										variant="subtitle2"
										color="text.secondary"
										component="div"
									>
										1000$
									</Typography>
								</Grid>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
