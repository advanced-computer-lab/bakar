import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import TicketsList from '../components/Tickets/TicketsList';
import axios from '../api';

function Tickets({ userType }) {
	const styles = {
		backgroundImage:
			'url(https://images.unsplash.com/photo-1559474185-bf13da814ef5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: (t) =>
			t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
		position: 'sticky',
		height: '100vh',
	};

	const [tickets, setTickets] = useState([]);

	const getData = async () => {
		const res = await axios.get('/tickets');
		console.log(res);
		let ticketData = res['data'];
		setTickets(ticketData);
	};

	React.useEffect(() => getData(), []);

	return (
		<div style={styles}>
			<NavBar userType={userType} />
			<div style={{ padding: '10px' }}>
				<br />
				<TicketsList userType={userType} tickets={tickets} getData={tickets} />
			</div>
		</div>
	);
}

export default Tickets;
