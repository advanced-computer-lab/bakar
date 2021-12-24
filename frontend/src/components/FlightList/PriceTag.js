import { React, useState } from 'react';
import {
	Card,
	Divider,
	Typography,
	Box,
	IconButton,
	Grid,
	Collapse,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import LuggageIcon from '@mui/icons-material/Luggage';
import PaymentsTwoTone from '@mui/icons-material/PaymentsTwoTone';

export default function PriceTag({ flight, priceFactor, cabin, selected }) {
	return (
		<Grid item>
			<Card
				sx={{
					display: 'flex',
					backgroundColor: selected
						? 'rgb(205, 83, 52)'
						: 'rgb(254, 239, 221, 0.5)',
					pl: 2,
					pr: 2,
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Grid container alignItems="center" justifyContent="center">
						<Typography component="div" variant="subtitle1" color="#183642">
							{cabin}
						</Typography>
					</Grid>

					<Divider
						orientation="vertical"
						variant="middle"
						sx={{ margin: '10px', height: '50px' }}
					/>

					<Grid
						container
						direction="column"
						alignItems="center"
						justifyContent="center"
					>
						<LuggageIcon sx={{ height: 38, width: 38, color: '#183642' }} />
						<Typography
							variant="subtitle2"
							color="text.secondary"
							component="div"
							align="center"
							noWrap
						>
							{cabin === 'Economy' ? flight.noBagsEcon : flight.noBagsBus} bags
						</Typography>
					</Grid>

					<Divider
						orientation="vertical"
						variant="middle"
						sx={{ margin: '0 10px 0 10px', height: '50px' }}
					/>

					<Grid container justifyContent="center" alignContent="center">
						<FontAwesomeIcon
							icon={faWeightHanging}
							style={{
								height: 38,
								width: 30,
								color: '#183642',
							}}
						/>
						<Typography
							variant="body2"
							color="text.secondary"
							component="div"
							align="center"
							noWrap
						>
							{cabin === 'Economy' ? flight.weightEcon : flight.weightBus}{' '}
							KG/bag
						</Typography>
					</Grid>

					<Divider
						orientation="vertical"
						variant="middle"
						sx={{ margin: '0 10px 0 10px', height: '50px' }}
					/>

					<Grid
						container
						direction="column"
						alignItems="center"
						justifyContent="center"
					>
						<PaymentsTwoTone sx={{ height: 38, width: 38, color: '#183642' }} />
						<Typography
							variant="subtitle2"
							color="text.secondary"
							component="div"
						>
							{cabin === 'Economy'
								? Math.floor(flight.priceEcon * priceFactor)
								: Math.floor(flight.priceBus * priceFactor)}
							$
						</Typography>
					</Grid>
				</Box>
			</Card>
		</Grid>
	);
}
