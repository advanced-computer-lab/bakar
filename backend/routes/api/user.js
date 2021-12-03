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
        console.log('waddap')
        req.login(user, function (err) {
          const token = jwt.sign({
            "username": user.username,
              "firstName": user.firstName,
              "lastName": user.lastName,
              "email": user.email,
              "passport": user.passport,
        }, secretKeyAdmin, {
            noTimestamp: true,
            expiresIn: "24h",
          });
          res.send(token);
        });
      } else {
        console.log("user");
        req.login(user, function (err) {
          const token = jwt.sign({ "username": user.username,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "email": user.email,
          "passport": user.passport, }, secretKeyUser, {
            expiresIn: "24h",
          });
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
            const token = jwt.sign({ username: user.username }, secretKeyUser, {
              expiresIn: "24h",
            });
            res.send(token);
          });
        }
      });
    }
  });
});

router.put("/", passport.authenticate('jwt'),  async (req, res) => {
  const user = req.user;
  try {
    if(!user.isAdmin){
      console.log(user);
      const updatedUser = await User.updateOne({ username: user.username }, req.body).exec();
      console.log("The user is Updated successfully !");
      res.status(200).send("user updated ");
    }
    else{console.log("hello from the other side"); throw "can't change Admin Status";
  }
  } catch (err) {
    console.log(err);
  }
  console.log('bye');
  res.send(400);
});

// router.get('/', async (req, res) => {
//   try{
//     const result = await User.find({username:"tom"}).exec();
//     console.log("result: " + result);
//     res.send(result);
//   }catch (err) {
//     console.log(err);
//     res.send(400);
//   }
// });

module.exports = router;
