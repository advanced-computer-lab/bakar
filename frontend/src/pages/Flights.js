import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Grid } from '@mui/material';
import FlightTable from '../components/FlightTable/FlightTable';
import CreateFlight from '../components/CreateFlight/CreateFlight';
import DeleteFlight from '../components/DeleteFlight/DeleteFlight';
import SearchFlight from '../components/SearchFlight/SearchFlight';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserType } from '../userType';
import FlightDetails from '../components/FlightDetails/FlightDetails';

function Flights({ userType }) {
	let query = useLocation().search.substring(1);
	let seats = 1;
	let priceFactor = 1;
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
		seats = queryObj.nA + queryObj.nC;
		priceFactor = parseInt(queryObj.nA) + parseInt(queryObj.nC) * 0.8;
		delete queryObj.nA;
		delete queryObj.nC;
	}
	let flag = userType === UserType.admin;

	const [flights, setFlights] = useState([]);
	const [checks, setChecks] = useState({});
	const [clicked, setClicked] = useState(null);
	const [departureFlight, setDepartureFlight] = useState(null);
	const [returnFlight, setReturnFlight] = useState(null);

	const getData = async (queryString) => {
		let res;
		res = await axios.get('/flights?' + queryString, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
		let flightData = res['data'];
		setFlights(flightData);
		console.log(flightData);
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
				<h2>
					{departureFlight == null ? 'Departure Flights' : 'Return Flights'}
				</h2>
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
		</div>
	);
}

export default Flights;
