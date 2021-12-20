import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Grid } from '@mui/material';
import MyFlightTable from '../components/MyFlight/MyFlightTable';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserType } from '../userType';
import FlightDetails from '../components/FlightDetails/FlightDetails';

function Tickets({ userType }) {
	let query = useLocation().search;
	query = query.slice(1, query.length);
	let flag = userType === UserType.admin;

	const [tickets, setTickets] = useState([]);
	const [clicked, setClicked] = useState(null);

	const getData = async (queryString) => {
		console.log(queryString);
		const res = await axios.get('/tickets?' + queryString);
		console.log(res);
		let ticketData = res['data'];
		setTickets(ticketData);
	};

	React.useEffect(() => getData(query), []);

	return (
		<div>
			<NavBar userType={userType} />
			<div style={{ padding: '10px' }}>
				<br />
				<FlightDetails
					open={clicked !== null ? true : false}
					clicked={clicked}
					setClicked={setClicked}
					getData={getData}
					select={true}
				></FlightDetails>
				<MyFlightTable
					userType={userType}
					tickets={tickets}
					getData={getData}
					setClicked={setClicked}
				/>
			</div>
		</div>
	);
}

export default Tickets;
