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
  passport.authenticate("local", function (err, user, info) {
    if (!user) {
      console.log("Incorrect username or password");
    } else {
      if (user.isAdmin) {
        req.login(user, function (err) {
          const token = jwt.sign(
            {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              passport: user.passport,
              isAdmin: user.isAdmin,
            },
            secretKeyAdmin,
            {
              noTimestamp: true,
              expiresIn: "24h",
            }
          );
          res.send(token);
        });
      } else {
        req.login(user, function (err) {
          const token = jwt.sign(
            {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              passport: user.passport,
              isAdmin: user.isAdmin,
            },
            secretKeyUser,
            {
              expiresIn: "24h",
            }
          );
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
        if (!user) {
          console.log("Incorrect username or password");
        } else {
          req.login(user, function (err) {
            const token = jwt.sign(
              {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                passport: user.passport,
                isAdmin: user.isAdmin,
              },
              secretKeyUser,
              {
                expiresIn: "24h",
              }
            );
            res.send(token);
          });
        }
      });
    }
  });
});

router.put("/:username", async (req, res) => {
  try {
    if(req.params.isAdmin == req.body.isAdmin){
      await User.updateOne({ username: req.params.username }, req.body).exec();
      res.status(200).send("user updated ");
      console.log("The user is Updated successfully !");
    }
    else{throw "can't change Admin Status"
  }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
