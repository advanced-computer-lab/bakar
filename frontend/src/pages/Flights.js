import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Grid } from '@mui/material';
import FlightList from '../components/FlightList/FlightList';
import CreateFlight from '../components/CreateFlight/CreateFlight';
import DeleteFlight from '../components/DeleteFlight/DeleteFlight';
import SearchFlight from '../components/SearchFlight/SearchFlight';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserType } from '../userType';
import FlightDetails from '../components/FlightDetails/FlightDetails';
import CheckOut from '../components/CheckOut/CheckOut';

function Flights({ userType }) {
	const styles = {
		backgroundImage:
			'url(https://images.unsplash.com/photo-1532364158125-02d75a0f7fb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: (t) =>
			t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
		position: 'sticky',
	};

	let flag = userType === UserType.admin;

	const [flights, setFlights] = useState([]);
	const [checks, setChecks] = useState({});
	const [clicked, setClicked] = useState(null);
	const [departureFlight, setDepartureFlight] = useState(null);
	const [returnFlight, setReturnFlight] = useState(null);

	let location = useLocation();

	let adults = 1;
	let children = 0;
	try {
		adults = location.state.adults;
		children = location.state.children;
	} catch (err) {
		console.log(err);
	}
	let seats = adults + children;
	let priceFactor = adults + children * 0.8;

	const getData = async (queryObj) => {
		let queryString = Object.keys(queryObj)
			.map((key) => key + '=' + queryObj[key])
			.join('&');
		try {
			let res = await axios.get('/flights?' + queryString);
			let flightData = res['data'];
			setFlights(flightData);
			let currentChecks = {};
			flightData.forEach((element) => {
				currentChecks[element.flightNo] = false;
			});
			setChecks(currentChecks);
		} catch (err) {
			console.log(err);
		}
	};

	React.useEffect(() => getData(location.state), []);

	return (
		<div style={styles}>
			<NavBar userType={userType} />
			<div style={{ padding: '10px' }}>
				{flag && (
					<Grid container spacing={2}>
						<Grid item>
							<CreateFlight getData={getData} />
						</Grid>
						<Grid item>
							<DeleteFlight checks={checks} getData={getData} />
						</Grid>
						<Grid item>
							<SearchFlight getData={getData} />
						</Grid>
					</Grid>
				)}
				<FlightDetails
					open={clicked !== null ? true : false}
					clicked={clicked}
					setClicked={setClicked}
					departureFlight={departureFlight}
					setDepartureFlight={setDepartureFlight}
					returnFlight={returnFlight}
					setReturnFlight={setReturnFlight}
					cabin={location.state.cabin}
					seats={seats}
					priceFactor={priceFactor}
					getData={getData}
				></FlightDetails>
				{!(departureFlight == null || returnFlight == null) &&
				returnFlight.seats !== undefined ? (
					<CheckOut
						departureFlight={departureFlight}
						returnFlight={returnFlight}
						setDepartureFlight={setDepartureFlight}
						setReturnFlight={setReturnFlight}
						open={returnFlight.seats.length > 0}
						priceFactor={priceFactor}
					/>
				) : (
					<div>
						<h2 style={{ textAlign: 'center' }}>
							{departureFlight == null ? 'Departure Flights' : 'Return Flights'}
						</h2>
						<FlightList
							userType={userType}
							flights={flights}
							cabin={location.state.cabin}
							priceFactor={priceFactor}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Flights;
