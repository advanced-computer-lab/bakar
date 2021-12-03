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

router.get('/', async (req, res) => {
	try {
		const result = await Ticket.find({}).exec();
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
        const ticket = new Ticket( {_id:2,departureFlightNo: "JAJ23",returnFlightNo:"AH222",cabin: "business",username: "tom",email:"tom@jerry",passport:"123", price:"10000" })
      ticket.save();
    });

router.post('/', async (req, res) => {
	try {
		const token = req.headers.token;
		const user = JSON.parse(atob(token.split('.')[1]));
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
