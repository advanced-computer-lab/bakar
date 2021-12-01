const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ticket = require("../../models/Ticket.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secretKeyAdmin = "tom&jerry";
const secretKeyUser = "jerry&tom";

router.get('/', async (req, res) => {
    try{
      const result = await Ticket.find({}).exec();
      console.log("result: " + result);
      res.send(result);
    }catch (err) {
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

module.exports = router;