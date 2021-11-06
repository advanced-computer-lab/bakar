const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../../models/User.js");
const User = mongoose.model("userSchema", Users);

//Admin's entry
const admin = new User({
  username: "boatymcboatfaced",
  password: "youshallnothash",
  firstName: "Boaty",
  lastName: "McBoatface",
  homeAddress: "2 McBoatfacing Street, River Thames",
  countryCode: 20,
  phone: "1006043322",
  email: "jerry@gmail.com",
  passport: "3000",
  isAdmin: true,
});

router.post('/login', (req, res) => {
  console.log('tom');
  User.findOne({
    username: req.body.username.toLowerCase(),
    password: req.body.password,
  }).exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user != null) {
        if (user.isAdmin) res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    }
  });
});

module.exports = router;
