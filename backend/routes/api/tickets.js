const express = require('express');
const router = express.Router();

const Flight = require('../../models/Flight');
const mongoose = require('mongoose');
const Ticket = require('../../models/Ticket.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secretKeyAdmin = 'tom&jerry';
const secretKeyUser = 'jerry&tom';

router.get('/', async (req, res) => {
	try {
		const token = req.headers.authorization.slice(7);
		const user = jwt.verify(token, 'jerry&tom');
		const result = await Ticket.find({ username: user.username }).exec();
		console.log('result: ' + result);
		res.send(result);
	} catch (err) {
		console.log(err);
	}
});

router.delete('/:_id', async (req, res) => {
	try {
		const dbResult = await Ticket.deleteOne({
			_id: req.params._id,
		}).exec();
		res.status(200).send(dbResult);
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

router.post('/', async (req, res) => {
	try {
		const token = req.headers.authorization.slice(7);
		const user = jwt.verify(token, 'jerry&tom');
		req.body.username = user.username;
		req.body.email = user.email;
		console.log(user);
		console.log(req.body);
		const ticket = Ticket(req.body);
		ticket.save();
		const depFlight = Flight.findOne({ flightNo: ticket.departureFlightNo });
		const retFlight = Flight.findOne({ flightNo: ticket.returnFlightNo });
		for (const seat of ticket.seatsDeparture) {
			if (ticket.cabin == 'Economy') {
				depFlight.seatsEconView[seat - 1] = 'Not Free';
			}
			else {
				depFlight.seatsBusView[seat - 1] = 'Not Free';
			}
		}
		for (const seat of ticket.seatsReturn) {
			if (ticket.cabin == 'Economy') {
				retFlight.seatsEconView[seat - 1] = 'Not Free';
			}
			else {
				retFlight.seatsBusView[seat - 1] = 'Not Free';
			}
		}
		depFlight.save();
		retFlight.save();
		
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
