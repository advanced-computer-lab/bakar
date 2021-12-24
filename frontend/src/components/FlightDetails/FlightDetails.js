import * as React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Dialog,
	Button,
	Grid,
	Slide,
	List,
	ListItem,
	ListItemText,
	Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../api';
import SeatReserve from '../seatReserve/SeatReserve';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FlightDetails({
	open,
	setClicked,
	clicked,
	getData,
	isDetails,
	departureFlight,
	setDepartureFlight,
	returnFlight,
	setReturnFlight,
	cabin,
	seats,
	priceFactor,
}) {
	const [data, setData] = React.useState({});
	const [openSeats, setOpenSeats] = React.useState();
	const fetchData = async () => {
		try {
			setData((await axios.get(`/flights/${clicked}`)).data);
		} catch (err) {
			console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(() => fetchData(), [clicked]);

	const handleSelect = async () => {
		try {
			const departData = { ...data, cabin: cabin, seats: [] };
			setDepartureFlight(departData);

			let search = {
				departureLocation: data.arrivalLocation,
				arrivalLocation: data.departureLocation,
				departureTerminal: data.arrivalTerminal,
				arrivalTerminal: data.departureTerminal,
				departureTime: data.arrivalTime,
			};
			let requested = Object.fromEntries(
				Object.entries(search).filter(([_, v]) => v != null)
			);
			let searchQuery = new URLSearchParams(requested).toString();

			setOpenSeats(true);
			await getData(searchQuery);
		} catch (err) {
			console.log(err);
		}
	};

	const handleReserve = async () => {
		try {
			const returnData = { ...data, cabin: cabin, seats: [] };
			setReturnFlight(returnData);
			setOpenSeats(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={() => setClicked(null)}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={() => setClicked(null)}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Flight Itinerary
						</Typography>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem>
						<ListItemText primary="Flight Number" secondary={clicked} />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Departure Time"
							secondary={Date(data.departureTime)}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Arrival Time"
							secondary={Date(data.arrivalTime)}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Time in Air"
							secondary={
								Math.ceil(
									(new Date(data.arrivalTime).getTime() -
										new Date(data.departureTime).getTime()) /
										(1000 * 3600)
								) + ' Hour(s)'
							}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Economy Price per adult (x0.8 per child)"
							secondary={data.priceEcon}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Business Price per adult (x0.8 per child)"
							secondary={data.priceBus}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Economy Baggage Allowance per person"
							secondary={
								data.noBagsEcon + ' bag(s) x ' + data.weightEcon + ' kg '
							}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Business Baggage Allowance per person"
							secondary={
								data.noBagsBus + ' bag(s) x ' + data.weightBus + ' kg '
							}
						/>
					</ListItem>
					<Divider />
					<br />
					<Grid
						container
						sx={{ alignItems: 'center', justifyContent: 'center' }}
						position=""
					></Grid>
				</List>
			</Dialog>
		</div>
	);
}
