const express = require('express');
const router = express.Router();

const Flight = require('../../models/Flight');
const mongoose = require('mongoose');
const Ticket = require('../../models/Ticket.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const sendMessage = require('./nodemailer.js');
require('dotenv').config();
const auth = require('../../authorization/authorization');

router.get('/', auth, async (req, res) => {
	try {
		const result = await Ticket.find({ username: req.user.username }).exec();
		res.send(result);
	} catch (err) {
		res.sendStatus(403);
	}
});

router.delete('/:_id', auth, async (req, res) => {
	try {
		const user = req.user;
		const ticket = await Ticket.findOne({
			_id: req.params._id,
		}).exec();
		const depFlight = await Flight.findOne({
			flightNo: ticket.departureFlightNo,
		}).exec();
		const retFlight = await Flight.findOne({
			flightNo: ticket.returnFlightNo,
		}).exec();
		for (const seat of ticket.seatsDeparture) {
			if (ticket.cabin == 'Economy') {
				depFlight.seatsEconView[seat - 1] = 'Free';
			} else {
				depFlight.seatsBusView[seat - 1] = 'Free';
			}
		}
		for (const seat of ticket.seatsReturn) {
			if (ticket.cabin == 'Economy') {
				retFlight.seatsEconView[seat - 1] = 'Free';
			} else {
				retFlight.seatsBusView[seat - 1] = 'Free';
			}
		}
		ticket.delete();
		retFlight.save();
		depFlight.save();
		res.status(200).send(ticket);
		console.log('deleted ticket\n' + ticket);
		sendMessage({
			to: user.email,
			subject: `Cancelled Ticket #${req.params._id}`,
			text: 'Amount to be refunded.',
			html: `<b>The following amount: ${
				ticket.priceReturn + ticket.priceDeparture
			}, will be refunded to your account</b>`,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send('Error deleting request');
	}
});
router.get('/create', async (req, res) => {
	const ticket = new Ticket({
		_id: 2,
		departureFlightNo: 'JAJ23',
		returnFlightNo: 'AH222',
		cabin: 'business',
		username: 'tom',
		email: 'tom@jerry',
		passport: '123',
		price: '10000',
	});
	ticket.save();
});

router.post('/', auth, async (req, res) => {
	try {
		req.body.username = req.user.username;
		req.body.email = req.user.email;
		const ticket = Ticket(req.body);
		ticket.save();
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
});

router.put('/:_id', auth, async (req, res) => {
	try {
		const user = req.user;
		const filter = {
			_id: req.params._id,
			email: user.email,
			username: user.username,
		};
		const update = req.body; // update flightNo or update anything related to the ticket itself
		for (const key in update) {
			if (!update[key]) {
				delete update[key];
			}
		}
		console.log('filter ', filter);
		console.log('update ', update);
		const oldTicket = await Ticket.findOne(filter).exec();
		const ticket = await Ticket.findOneAndUpdate(filter, update, {
			new: true,
		}).exec();
		const compareDep = oldTicket.seatsDeparture
			.sort()
			.compare(ticket.seatsDeparture.sort());
		const compareRet = oldTicket.seatsReturn
			.sort()
			.compare(ticket.seatsReturn.sort());

		const retFlight = await Flight.findOne({
			flightNo: ticket.returnFlightNo,
		}).exec();
		const depFlight = await Flight.findOne({
			flightNo: ticket.departureFlightNo,
		}).exec();
		if (
			!compareDep &&
			oldTicket.departureFlightNo == ticket.departureFlightNo
		) {
			for (const seat of oldTicket.seatsDeparture) {
				if (ticket.cabin == 'Economy') {
					depFlight.seatsEconView[seat - 1] = 'Free';
				} else {
					depFlight.seatsBusView[seat - 1] = 'Free';
				}
			}
			for (const seat of ticket.seatsDeparture) {
				if (ticket.cabin == 'Economy') {
					depFlight.seatsEconView[seat - 1] = 'Adult';
				} else {
					depFlight.seatsBusView[seat - 1] = 'Adult';
				}
			}
		}
		if (!compareRet && oldTicket.returnFlightNo == ticket.returnFlightNo) {
			for (const seat of oldTicket.seatsReturn) {
				if (ticket.cabin == 'Economy') {
					retFlight.seatsEconView[seat - 1] = 'Free';
				} else {
					retFlight.seatsBusView[seat - 1] = 'Free';
				}
			}
			for (const seat of ticket.seatsReturn) {
				if (ticket.cabin == 'Economy') {
					retFlight.seatsEconView[seat - 1] = 'Adult';
				} else {
					retFlight.seatsBusView[seat - 1] = 'Adult';
				}
			}
		}
		retFlight.save();
		depFlight.save();
		if (ticket) {
			res.status(200).send('Updated successfully');
		} else {
			res.status(400).send('Something went wrong');
		}
	} catch (err) {}
});

router.post('/:_id', auth, async (req, res) => {
	try {
		const user = req.user;
		const dbResult = await Ticket.findOne({
			_id: req.params._id,
		}).exec();
		res.status(200).send(dbResult);
		console.log('sent mail with ticket\n' + dbResult);
		sendMessage({
			to: user.email,
			subject: `Itinerary Details of Ticket #${req.params._id}`,
			text: 'Details of ticket.',
			html: `<b>Ticket Details: <br/>
				<ul>
					<li>departure flight no: ${dbResult.departureFlightNo}</li>
					<li>return flight no: ${dbResult.returnFlightNo}</li>
					<li>cabin: ${dbResult.cabin}</li>
					<li>departure selected seats: ${dbResult.seatsDeparture.join(',')}</li>
					<li>return selected seats: ${dbResult.seatsReturn.join(',')}</li>
					<li>departure price: ${dbResult.priceDeparture}</li>
					<li>return price: ${dbResult.priceReturn}</li>
					<li>total price: ${dbResult.priceDeparture + dbResult.priceReturn}</li>
				</ul>
			</b>`,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send('Error deleting request');
	}
});
module.exports = router;
