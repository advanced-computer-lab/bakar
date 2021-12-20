import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Grid } from '@mui/material';
import FlightTable from '../components/FlightList/FlightTable';
import CreateFlight from '../components/CreateFlight/CreateFlight';
import DeleteFlight from '../components/DeleteFlight/DeleteFlight';
import SearchFlight from '../components/SearchFlight/SearchFlight';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserType } from '../userType';
import FlightDetails from '../components/FlightDetails/FlightDetails';
import CheckOut from '../components/CheckOut/CheckOut';

function Flights({ userType }) {
	const [flights, setFlights] = useState([]);
	const [checks, setChecks] = useState({});
	const [clicked, setClicked] = useState(null);
	const [departureFlight, setDepartureFlight] = useState(null);
	const [returnFlight, setReturnFlight] = useState(null);

	let location = useLocation();
	let query = location.search.substring(1);
	let queryObj = { cabin: 'Economy' };
	if (query !== '') {
		queryObj = JSON.parse(
			'{"' +
				decodeURI(query)
					.replace(/"/g, '\\"')
					.replace(/&/g, '","')
					.replace(/=/g, '":"') +
				'"}'
		);
	}
	console.log(queryObj);

	let adults = 1;
	let children = 0;
	try {
		adults = location.state.adults;
		children = location.state.children;
	} catch (err) {
		console.log(err);
	}
	let seats = adults + children;
	console.log(seats);
	let priceFactor = adults + children * 0.8;

	let flag = userType === UserType.admin;

	const getData = async (queryString) => {
		let res;
		res = await axios.get('/flights?' + queryString, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
		let flightData = res['data'];
		setFlights(flightData);
		let currentChecks = {};
		flightData.forEach((element) => {
			currentChecks[element.flightNo] = false;
		});
		setChecks(currentChecks);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(() => getData(query), []);
	return (
		<div>
			<NavBar userType={userType} />
			<div style={{ padding: '10px' }}>
				<Grid container spacing={2}>
					{flag && (
						<Grid item>
							<CreateFlight getData={getData} />
						</Grid>
					)}
					{flag && (
						<Grid item>
							<DeleteFlight checks={checks} getData={getData} />
						</Grid>
					)}
					<Grid item>{flag && <SearchFlight getData={getData} />}</Grid>
				</Grid>
				<FlightDetails
					open={clicked !== null ? true : false}
					clicked={clicked}
					setClicked={setClicked}
					departureFlight={departureFlight}
					setDepartureFlight={setDepartureFlight}
					returnFlight={returnFlight}
					setReturnFlight={setReturnFlight}
					cabin={queryObj.cabin}
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
						<FlightTable
							userType={userType}
							flights={flights}
							checks={checks}
							setChecks={setChecks}
							getData={getData}
							setClicked={setClicked}
							priceFactor={priceFactor}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Flights;
