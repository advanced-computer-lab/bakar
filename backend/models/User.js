// TODO: Create User model & create an Administrator entry, refer to issue #1: https://github.com/advanced-computer-lab/bakar/issues/1
//External variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User's model
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    homeAddress:{
        type: String,
        required: true,
    },
    countryCode:{
        type: Number,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    passport:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
    },
});

module.exports = userSchema;
