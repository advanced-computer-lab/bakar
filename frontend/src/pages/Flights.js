import React, { useState } from 'react';
import FlightTable from '../components/FlightTable/FlightTable';
import CreateFlight from '../components/CreateFlight/CreateFlight';
import DeleteFlight from '../components/DeleteFlight/DeleteFlight';
import Grid from '@mui/material/Grid';

import axios from 'axios';

function Flights() {
	const [flights, setFlights] = useState([]);
	const [checks, setChecks] = useState({});

	const getData = async () => {
		const res = await axios.get('/flights');
		let flightData = res['data'];
		setFlights(flightData);
		let currentChecks = {};
		flightData.forEach(element => {
			currentChecks[element.flightNo] = false;
		});
		setChecks(currentChecks);
	};

	

	React.useEffect(() => getData(), []);

	return (
		<div>
			<Grid container spacing={2}>
      		  <Grid item>
				<CreateFlight />
      		  </Grid>
      		  <Grid item>
				<DeleteFlight checks={checks} />
      		  </Grid>
      		</Grid>
			  <br></br>
			  <FlightTable flights={flights} checks={checks} setChecks={setChecks} />
		</div>
	);
}

export default Flights;
