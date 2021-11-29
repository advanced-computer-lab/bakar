import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Grid } from '@mui/material';
import FlightTable from '../components/FlightTable/FlightTable';
import CreateFlight from '../components/CreateFlight/CreateFlight';
import DeleteFlight from '../components/DeleteFlight/DeleteFlight';
import SearchFlight from '../components/SearchFlight/SearchFlight';
import axios from 'axios';
import { UserType } from "../userType";

function Flights({userType}) {
	console.log(userType);
	let flag = userType === UserType.admin;
  const [flights, setFlights] = useState([]);
  const [checks, setChecks] = useState({});
  const getData = async (queryString) => {
    const res = await axios.get("/flights?" + queryString, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    let flightData = res["data"];
    setFlights(flightData);
    let currentChecks = {};
    flightData.forEach((element) => {
      currentChecks[element.flightNo] = false;
    });
    setChecks(currentChecks);
  };
  
	React.useEffect(() => getData(), []);

	return (
		<div>
			<NavBar userType={userType} />
			<div style={{ padding: '10px' }}>
				<Grid container spacing={2}>
					{flag && <Grid item>
						<CreateFlight getData={getData} />
					</Grid>}
					{flag && <Grid item>
						<DeleteFlight checks={checks} getData={getData} />
					</Grid>}
					<Grid item>
						<SearchFlight getData={getData} />
					</Grid>
				</Grid>
				<br />
				<FlightTable userType={userType}
					flights={flights}
					checks={checks}
					setChecks={setChecks}
					getData={getData}
				/>
			</div>
		</div>
	);
}

export default Flights;
