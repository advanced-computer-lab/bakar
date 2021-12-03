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
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FlightDetails({ open, setClicked, clicked, getData, select }) {
	let navigate = useNavigate();

	const [data, setData] = React.useState({});
	const fetchData = async () => {
		try {
			setData((await axios.get(`/flights/${clicked}`)).data);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
	const [departureLocation, setDepartureLocation] = React.useState(null);
	const [arrivalLocation, setArrivalLocation] = React.useState(null);
	const [departureTerminal, setDepartureTerminal] = React.useState();
	const [arrivalTerminal, setArrivalTerminal] = React.useState();
	React.useEffect(() => fetchData(), [clicked]);
	const handleSubmit = async () => {
		try {
			let search = {
				departureLocation: data.arrivalLocation,
				arrivalLocation: data.departureLocation,
				departureTerminal: data.arrivalTerminal,
				arrivalTerminal: data.departureTerminal,
			};
			let requested = Object.fromEntries(
				Object.entries(search).filter(([_, v]) => v != null)
			);
			console.log(search);
			let searchParams = new URLSearchParams(requested);
			let searchQuery = searchParams.toString();
			console.log(searchQuery);
			await getData(searchQuery);
			setClicked(null);
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
						<ListItemText primary="Economy Price" secondary={data.priceEcon} />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText primary="Business Price" secondary={data.priceBus} />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Economy Baggage Allowance"
							secondary={
								data.noBagsEcon + ' bag(s) x ' + data.weightEcon + ' kg '
							}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText
							primary="Business Baggage Allowance"
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
					>
						{!select && <Button
							variant="contained"
							color="primary"
							sx={{ ':hover': { backgroundColor: '#CD5334' } }}
							onClick={() => {
								console.log(data);
								handleSubmit();
							}}
						>
							Select
						</Button>}
					</Grid>
				</List>
			</Dialog>
		</div>
	);
}
