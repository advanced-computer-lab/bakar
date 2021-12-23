import React from 'react';
import { Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function FlightTimeline({ flight }) {
	var dateDeparture = new Date(flight.departureTime);
	var dayDeparture = dateDeparture.getDate();
	var monthDeparture = dateDeparture.getMonth() + 1;
	var yearDeparture = dateDeparture.getFullYear();

	var dateArrival = new Date(flight.arrivalTime);
	var dayArrival = dateArrival.getDate();
	var monthArrival = dateArrival.getMonth() + 1;
	var yearArrival = dateArrival.getFullYear();

	return (
		<Timeline position="alternate">
			<TimelineItem>
				<TimelineOppositeContent color="text.secondary">
					{new Date(flight.departureTime).toLocaleString()}
				</TimelineOppositeContent>
				<TimelineSeparator>
					<TimelineDot color="primary" />
					<TimelineConnector sx={{ height: '50px' }}></TimelineConnector>
				</TimelineSeparator>
				<TimelineContent>Departure Date</TimelineContent>
			</TimelineItem>

			<TimelineItem>
				<TimelineSeparator>
					<Typography
						variant="subtitle2"
						color="#183642"
						component="div"
						noWrap
					>
						{Math.ceil(
							new Date(
								new Date(flight.arrivalTime) - new Date(flight.departureTime)
							).getTime() /
								(1000 * 3600)
						) + ' Hour(s)'}
					</Typography>
					<TimelineConnector sx={{ height: '50px' }}></TimelineConnector>
				</TimelineSeparator>
				<TimelineContent></TimelineContent>
			</TimelineItem>

			<TimelineItem>
				<TimelineOppositeContent color="text.secondary">
					{new Date(flight.arrivalTime).toLocaleString()}
				</TimelineOppositeContent>
				<TimelineSeparator>
					<TimelineDot color="primary" />
				</TimelineSeparator>
				<TimelineContent>Arrival Date</TimelineContent>
			</TimelineItem>
		</Timeline>
	);
}
