const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../../models/User.js");
const User = mongoose.model("userSchema", Users);
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secretKeyAdmin = "tom&jerry";
const secretKeyUser = "jerry&tom";

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

router.post("/login", async (req, res) => {
  console.log(req.body);
  passport.authenticate("local", function (err, user, info) {
    console.log(user);
    if (!user) {
      console.log("Incorrect username or password");
    } else {
      if (user.isAdmin) {
        req.login(user, function (err) {
          const token = jwt.sign({ username: user.username }, secretKeyAdmin, {
            expiresIn: "24h",
          });
          console.log(token);
          res.send(token);
        });
      } else {
        req.login(user, function (err) {
          const token = jwt.sign({ username: user.username }, secretKeyUser, {
            expiresIn: "24h",
          });
          console.log(token);
          res.send(token);
        });
      }
    }
  })(req, res);
});

router.post("/register", (req, res) => {
  const register = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    homeAddress: req.body.homeAddress,
    countryCode: req.body.countryCode,
    phone: req.body.phone,
    email: req.body.email,
    passport: req.body.passport,
    isAdmin: false,
  });
  User.register(register, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log(user);
        if (!user) {
          console.log("Incorrect username or password");
        } else {
          req.login(user, function (err) {
            const token = jwt.sign({ username: user.username }, secretKeyUser, {
              expiresIn: "24h",
            });
            console.log(token);
            res.send(token);
          });
        }
      });
    }
  });
});

module.exports = router;
