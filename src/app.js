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

app.listen(port, () => {
    console.log(`Server started listening to requests on port: ${port}`);
});