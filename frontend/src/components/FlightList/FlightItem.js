import { React, useState } from 'react';
import {
	Card,
	Divider,
	Typography,
	Box,
	IconButton,
	Grid,
	Collapse,
	Button,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import PriceTag from './PriceTag';
import FlightDetails from '../FlightList/FlightDetails';
import { UserType } from '../../userType';
import SeatReserve from '../seatReserve/SeatReserve';

export default function FlightItem({
	flight,
	cabin,
	priceFactor,
	userType,
	noOfSeats,
	transaction,
}) {
	const [expanded, setExpanded] = useState(false);
	const [selectedCabin, setSelectedCabin] = useState(cabin);

	function formatHHMM(date) {
		function z(n) {
			return (n < 10 ? '0' : '') + n;
		}
		var h = date.getHours();
		return (
			z(h % 12) + ':' + z(date.getMinutes()) + ' ' + (h < 12 ? 'AM' : 'PM')
		);
	}

	const handleClick = () => {
		if (userType !== UserType.guest) {
			return (
				<SeatReserve
					selectedCabin={selectedCabin}
					flight={flight}
					number={noOfSeats}
					transaction={transaction}
				/>
			);
		} else {
		}
	};

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
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Grid
							container
							direction="column"
							alignItems="center"
							justifyContent="center"
						>
							<Typography component="div" variant="h6" color="#183642">
								{formatHHMM(new Date(flight.departureTime))}
							</Typography>
							<Typography variant="h6" color="#183642" component="div">
								{flight.departureTerminal}
							</Typography>
							<Typography
								variant="subtitle2"
								color="text.secondary"
								component="div"
							>
								{flight.departureLocation}
							</Typography>
							<FlightTakeoffIcon
								sx={{ height: 38, width: 38, color: '#183642' }}
							/>
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
								{formatHHMM(new Date(flight.arrivalTime))}{' '}
							</Typography>
							<Typography variant="h6" color="#183642" component="div">
								{flight.arrivalTerminal}
							</Typography>
							<Typography
								variant="subtitle2"
								color="text.secondary"
								component="div"
							>
								{flight.arrivalLocation}
							</Typography>
							<FlightLandIcon
								sx={{
									height: 38,
									width: 38,
									color: '#183642',
								}}
							/>
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
								rowSpacing={1}
								alignItems="stretch"
								justify="space-between"
							>
								<Button
									onClick={() => {
										setSelectedCabin('economy');
										setExpanded(true);
									}}
								>
									<PriceTag
										cabin="Economy"
										flight={flight}
										priceFactor={priceFactor}
										selected={selectedCabin === 'economy' ? true : false}
									></PriceTag>
								</Button>

								<Button
									onClick={() => {
										setSelectedCabin('business');
										setExpanded(true);
									}}
								>
									<PriceTag
										cabin="Business"
										flight={flight}
										priceFactor={priceFactor}
										selected={selectedCabin === 'business' ? true : false}
									></PriceTag>
								</Button>
							</Grid>
						</Grid>
						<Divider
							orientation="vertical"
							variant="middle"
							sx={{ margin: '0 10px 0 10px' }}
						/>
						<IconButton
							onClick={() => {
								setExpanded(!expanded);
							}}
						>
							{expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
						</IconButton>
					</Box>
				</Card>
			</Grid>

			<Grid item xs>
				<Collapse in={expanded} unmountOnExit>
					<FlightDetails
						selectedCabin={selectedCabin}
						flight={flight}
						type="select"
						onClick={() => {}}
					/>
				</Collapse>
			</Grid>
		</Grid>
	);
}
