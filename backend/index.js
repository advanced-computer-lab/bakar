const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// Routes
// require any routes here if needed. e.g: `const books = require('./routes/api/books');`
const user = require("./routes/api/user.js");
const flights = require("./routes/api/flights.js");
const UserModel = require("./models/User.js");
const User = mongoose.model("userSchema", UserModel);

const app = express();

// cors
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//session
app.use(session({
  secret: "tom&jerry",
  resave: false,
  saveUninitialized: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect Database
connectDB();


// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Server running..."));

// use Routes
// Use the routes here. e.g: `app.use('/api/books', books);`
app.use("/users", user);
app.use("/flights", flights);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
