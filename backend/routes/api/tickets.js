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
const auth = require("../../authorization/authorization");

router.get('/', auth ,async (req, res) => {
	console.log(req.user);
	try {
		const result = await Ticket.find({ username: req.user.username }).exec();
		console.log('result: ' + result);
		res.send(result);
	} catch (err) {
		res.sendStatus(403);
	}
});

router.delete('/:_id', auth ,async (req, res) => {
	try {
		const dbResult = await Ticket.findOneAndDelete({
			_id: req.params._id,
		}).exec();
		res.status(200).send(dbResult);
		console.log('deleted ticket\n' + dbResult);
		sendMessage(
			req.user.email,
			req.params._id,
			dbResult.priceReturn + dbResult.priceDeparture
		);
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
		console.log(req.body);
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

module.exports = router;
