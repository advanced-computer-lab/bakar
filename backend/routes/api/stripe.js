const stripe = require('stripe')(
	'sk_test_51KAZrtBvkGmRM4gyujn6W54o45vdbDVXRCndDHne6F46c5RcwzQlDijt7pOh95cxga8DUpDEWYi6VtpIrgmV9r0i00mIhO9Y7N'
);
const express = require('express');
const router = express.Router();
const auth = require('../../authorization/authorization');
const mongoose = require('mongoose');
const Ticket = require('../../models/Ticket.js');
const Flight = require('../../models/Flight');
const sendMessage = require('./nodemailer.js');

const domain = 'http://localhost:3000';

const createTicket = async (ticketBody) => {
	try {
		ticketBody.seatsReturn = JSON.parse('[' + ticketBody.seatsReturn + ']');
		ticketBody.seatsDeparture = JSON.parse(
			'[' + ticketBody.seatsDeparture + ']'
		);
		console.log('ana hena ', ticketBody);
		const ticket = Ticket(ticketBody);
		ticket.save(function (err, ticket) {
			sendMessage({
				to: ticketBody.email,
				subject: `Reserved Ticket #${ticket._id}`,
				text: 'Details about reservartion.',
				html: `<b>Ticket Details: <br/>
				<ul>
					<li>departure flight no: ${ticket.departureFlightNo}</li>
					<li>return flight no: ${ticket.returnFlightNo}</li>
					<li>cabin: ${ticket.cabin}</li>
					<li>departure selected seats: ${ticket.seatsDeparture.join(',')}</li>
					<li>return selected seats: ${ticket.seatsReturn.join(',')}</li>
					<li>departure price: ${ticket.priceDeparture}</li>
					<li>return price: ${ticket.priceReturn}</li>
					<li>total price: ${ticket.priceDeparture + ticket.priceReturn}</li>
				</ul>
			</b>`,
			});
		});
		console.log(ticket);
		const depFlight = await Flight.findOne({
			flightNo: ticket.departureFlightNo,
		}).exec();
		const retFlight = await Flight.findOne({
			flightNo: ticket.returnFlightNo,
		}).exec();
		for (const seat of ticket.seatsDeparture) {
			if (ticket.cabin == 'Economy') {
				depFlight.seatsEconView[seat - 1] = 'Adult';
			} else {
				depFlight.seatsBusView[seat - 1] = 'Adult';
			}
		}
		for (const seat of ticket.seatsReturn) {
			if (ticket.cabin == 'Economy') {
				retFlight.seatsEconView[seat - 1] = 'Adult';
			} else {
				retFlight.seatsBusView[seat - 1] = 'Adult';
			}
		}
		depFlight.save();
		retFlight.save();
	} catch (err) {
		console.log(err);
	}
};

router.post('/checkout', auth, async (req, res) => {
	console.log('this is the ticket ', req.body.ticketBody);
	const ticket = {
		...req.body.ticketBody,
		seatsDeparture: req.body.ticketBody.seatsDeparture.toString(),
		seatsReturn: req.body.ticketBody.seatsReturn.toString(),
		username: req.user.username,
		email: req.user.email,
	};
	const session = await stripe.checkout.sessions.create({
		success_url: `${domain}/tickets`,
		cancel_url: `${domain}`,
		customer_email: req.user.email,
		mode: 'payment',
		payment_method_types: ['card'],
		line_items: [
			{
				name: 'Flight Reservation',
				amount: parseInt(req.body.amount) * 100,
				currency: 'USD',
				quantity: 1,
			},
		],
		metadata: ticket,
	});
	console.log(session);
	res.send(session);
});

const myFunction = async (req, res, next) => {
	console.log(req.body);
	return await next();
};

router.post(
	'/webhooks',
	myFunction,
	express.raw({ type: 'application/json' }),
	async (request, response) => {
		let event = request.body;
		let session;

		console.log('event type: ', event.type);
		// Handle the event
		switch (event.type) {
			case 'checkout.session.async_payment_failed':
				session = event.data.object;
				// Then define and call a function to handle the event checkout.session.async_payment_failed
				break;
			case 'checkout.session.async_payment_succeeded':
				session = event.data.object;
				// Then define and call a function to handle the event checkout.session.async_payment_succeeded
				break;
			case 'checkout.session.completed':
				session = event.data.object;
				console.log('berk is here');
				await createTicket(session.metadata);
				break;
			case 'checkout.session.expired':
				session = event.data.object;
				// Then define and call a function to handle the event checkout.session.expired
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		// Return a 200 response to acknowledge receipt of the event
		response.send();
	}
);

module.exports = router;
