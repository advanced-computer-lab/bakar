const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../../models/User.js");
const User = mongoose.model("userSchema", Users);
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const auth = require("../../authorization/authorization");
const ticket = require('../../models/Ticket.js');

router.post("/login", async (req, res) => {
  passport.authenticate("local", function (err, user, info) {
    if (!user) {
      console.log("Incorrect username or password");
    } else {
      console.log("user");
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
          process.env.secretKey,
          {
            expiresIn: "24h",
          }
        );
        res.send(token);
      });
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
              process.env.secretKey,
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

router.put("/", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      console.log(req.user);
      const updatedUser = await User.updateOne(
        { username: req.user.username },
        req.body
      ).exec();
      console.log("The user is Updated successfully !");
      console.log(req.user.username);
      const updatedToken = jwt.sign(
        {
          username: req.user.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          passport: req.body.passport,
          isAdmin: false,
        },
        process.env.secretKey,
        {
          expiresIn: "24h",
        }
      );
      console.log(updatedUser);
      console.log(updatedToken);
      res.send(updatedToken);
    } else {
      console.log("hello from the other side");
      throw "can't change Admin Status";
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/password", auth, async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username }).exec();
    console.log(user);
    user.changePassword(
      req.body.oldpassword,
      req.body.newpassword,
      function (err) {
        if (err) {
          console.log(err);
          console.log("inccorect old password");
          res.sendStatus(401);
        } else {
          console.log("password changed");
          res.sendStatus(200);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
})
router.put("/", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      const user = req.user;
      console.log(req.user);
      const oldUsername = user.username;
			const oldEmail = user.email;
			const userTickets = await ticket.find({ email: oldEmail, username: oldUsername }).exec();
			const updatedUser = await User.updateOne(
				{ username: user.username },
				req.body
			).exec();
			if (updatedUser.username !== oldUsername || updatedUser.email !== oldEmail) {
				for (const userTicket of userTickets) {
					userTicket.username = updatedUser.username;
					userTicket.email = user.email;
					userTicket.save();
				}
			}
      console.log("The user is Updated successfully !");
      console.log(req.user.username);
      const updatedToken = jwt.sign(
        {
          username: req.user.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          passport: req.body.passport,
          isAdmin: false,
        },
        process.env.secretKey,
        {
          expiresIn: "24h",
        }
      );
      console.log(updatedUser);
      console.log(updatedToken);
      res.send(updatedToken);
    } else {
      console.log("hello from the other side");
      throw "can't change Admin Status";
    }
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
