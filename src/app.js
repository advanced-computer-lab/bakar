//External Variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//App variables
const app = express();
const port = process.env.PORT || "3000";
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//Connecting with Routes directory
const UserController = require("./Routes/UserController.js");

//Connecting with Models directory
const User = require("./Models/User.js");

//Running the server
app.listen(port, () => {
    console.log(`Server started listening to requests on port: ${port}`);
});