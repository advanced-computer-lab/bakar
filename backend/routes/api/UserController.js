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
  passport: "",
  isAdmin: true,
});
