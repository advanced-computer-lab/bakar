const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../../models/Ticket.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secretKeyAdmin = 'tom&jerry';
const secretKeyUser = 'jerry&tom';
const sendMessage = require('./nodemailer.js');

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
		const token = req.headers.authorization.slice(7);
		const user = jwt.verify(token, 'jerry&tom');
		const dbResult = await Ticket.findOneAndDelete({
			_id: req.params._id,
		}).exec();
		sendMessage(user.email);
		res
			.status(200)
			.send(
				dbResult,
				req.params._id,
				dbResult.pricedeparture + dbResult.priceReturn
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
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
