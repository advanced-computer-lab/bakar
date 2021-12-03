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
	const queryObj = JSON.parse(
		'{"' +
			decodeURI(query)
				.replace(/"/g, '\\"')
				.replace(/&/g, '","')
				.replace(/=/g, '":"') +
			'"}'
	);
	let seats = queryObj.n;
	delete queryObj.n;
	let flag = userType === UserType.admin;

	const [flights, setFlights] = useState([]);
	const [checks, setChecks] = useState({});
	const [clicked, setClicked] = useState(null);

	const getData = async (queryString) => {
		console.log(queryString);
		const res = await axios.get('/flights?' + queryString, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
		console.log(res);
		let flightData = res['data'];
		setFlights(flightData);
		let currentChecks = {};
		flightData.forEach((element) => {
			currentChecks[element.flightNo] = false;
		});
		setChecks(currentChecks);
	};

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
				<br />
				<FlightDetails
					open={clicked !== null ? true : false}
					clicked={clicked}
					setClicked={setClicked}
					getData={getData}
				></FlightDetails>
				<FlightTable
					userType={userType}
					flights={flights}
					checks={checks}
					setChecks={setChecks}
					getData={getData}
					setClicked={setClicked}
					noOfSeats={seats}
				/>
			</div>
		</div>
	);
}

export default Flights;
