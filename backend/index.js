const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Routes
// require any routes here if needed. e.g: `const books = require('./routes/api/books');`
const user = require("./routes/api/user.js");
const flights = require("./routes/api/flights.js");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Server running..."));

// use Routes
// Use the routes here. e.g: `app.use('/api/books', books);`
app.use("/users", user);
app.use("/flights", flights);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
