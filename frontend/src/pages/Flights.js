import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Grid } from '@mui/material';
import FlightList from '../components/FlightList/FlightList';
import CreateFlight from '../components/CreateFlight/CreateFlight';
import DeleteFlight from '../components/DeleteFlight/DeleteFlight';
import SearchFlight from '../components/SearchFlight/SearchFlight';
import axios from 'axios';
import { useLocation, createSearchParams, useSearchParams } from 'react-router-dom';
import { UserType } from '../userType';
import CheckOut from '../components/CheckOut/CheckOut';
import FlightTable from '../components/FlightList/FlightTable';
import FlightDetails from '../components/FlightDetails/FlightDetails';

import { Box } from '@mui/system';
import Copyright from '../components/Copyrights/Copyrights';

function Flights({ userType }) {
	const styles = {
		backgroundImage:
			'url(https://images.unsplash.com/photo-1532364158125-02d75a0f7fb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: (t) =>
			t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
		minHeight: '100vh',
		overflowY: 'hidden',
		'&::-webkit-scrollbar': { width: '100px' },
	};

	let flag = userType === UserType.admin;
	const location = useLocation();
	const [clicked, setClicked] = useState(null);
	const [flights, setFlights] = useState([]);
	const [checks, setChecks] = useState({});
	if (!location.state) {
		location.state = {
			departureFlight: null,
			returnFlight: null,
		}
	}
	const [departureFlight, setDepartureFlight] = useState(location.state.departureFlight);
	const [returnFlight, setReturnFlight] = useState(location.state.returnFlight);
	

	const { adults, children, cabin, departureTime, arrivalTime, arrivalTerminal, departureTerminal } = location.state;
	console.log(location.state);
	console.log(children);
	let priceFactor = 0;
	let noOfSeats = 0;
	if (adults && children) {
		priceFactor = parseInt(adults) + parseInt(children) * 0.8;
		noOfSeats = parseInt(adults) + parseInt(children);
	}
	else if (adults) {
		priceFactor = parseInt(adults)  * 0.8;
		noOfSeats = parseInt(adults) ;
	}
	else {
		priceFactor = parseInt(children) * 0.8;
		noOfSeats = parseInt(children);
	}

	const getData = async (requested) => {
		try {
			let myQuery = {};
			if (cabin == "Economy") {
				myQuery.availableEcon = noOfSeats;
			}
			else {
				myQuery.availableBus = noOfSeats;
			}
			// Should simplify boolean logic here & add documentation
			if (!departureFlight && !returnFlight) {
				myQuery.departureTime = departureTime;
				myQuery.arrivalTerminal = arrivalTerminal;
				myQuery.departureTerminal = departureTerminal;
			}
			else if (!departureFlight && returnFlight) {
				myQuery.departureTime = departureTime;
				myQuery.departureTerminal = returnFlight.arrivalTerminal;
				myQuery.arrivalTerminal = returnFlight.departureTerminal;
			}
			else if (departureFlight && !returnFlight) {
				myQuery.arrivalTime = arrivalTime;
				myQuery.departureTerminal = departureFlight.arrivalTerminal;
				myQuery.arrivalTerminal = departureFlight.departureTerminal;
			}
			else if (departureFlight && returnFlight) {
				setFlights([]);
				return;
			}
			// necessary in case some values are null or empty
			for (const key in myQuery) {
				if (!myQuery[key]) {
					delete myQuery[key];
				}
			}
			console.log(myQuery);
			let queryString = "";
			if (requested) {
				queryString = createSearchParams(requested).toString();
			}
			else {
				queryString = createSearchParams(myQuery).toString();
			}
			console.log(requested);
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

	React.useEffect(() => getData(), [departureFlight, returnFlight]);

	return (
		<div style={styles}>
			<Box>
				<NavBar userType={userType} />
				<div style={{ padding: '10px', paddingTop: '100px' }}>
					{flag && !location.state.search && (
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
							<FlightDetails
								open={clicked !== null ? true : false}
								clicked={clicked}
								setClicked={setClicked}
								departureFlight={departureFlight}
								setDepartureFlight={setDepartureFlight}
								returnFlight={returnFlight}
								setReturnFlight={setReturnFlight}
								cabin={'economy'}
								seats={noOfSeats}
								priceFactor={priceFactor}
								getData={getData}
							/>
						</Grid>
						
					)}
					
					{false &&
					returnFlight.seats !== undefined ? (
						<CheckOut
							departureFlight={departureFlight}
							returnFlight={returnFlight}
							setDepartureFlight={setDepartureFlight}
							setReturnFlight={setReturnFlight}
							open={returnFlight.seats.length > 0}
							priceFactor={priceFactor}
							noOfSeats={noOfSeats}
						/>
					) : (
						<div>
							{!flag || location.state.search ? (
								<FlightList
									userType={userType}
									flights={flights}
									cabin={cabin}
									priceFactor={priceFactor}
									noOfSeats={noOfSeats}
									departureFlight={departureFlight}
									returnFlight={returnFlight}
									setDepartureFlight={setDepartureFlight}
									setReturnFlight={setReturnFlight}
								/>
							) : (
								<FlightTable
									userType={userType}
									flights={flights}
									checks={checks}
									setChecks={setChecks}
									getData={getData}
									setClicked={setClicked}
									priceFactor={1}
								/>
							)}
						</div>
					)}
				</div>
			</Box>
		</div>
	);
}

export default Flights;
