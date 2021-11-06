// TODO: Create Flight model, refer to issue #2 : https://github.com/advanced-computer-lab/bakar/issues/2
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightNo: {
        type: String,
        required: true,
        unique: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    departureLocation: {
        type: String,
        required: true
    },
    arrivalLocation: {
        type: String,
        required: true
    },
    seatsEcon: {
        type: Number,
        required: true
    },
    seatsBus: {
        type: Number,
        required: true
    },
    departureTerminal: {
        type: Number,
        required: true
    },
    arrivalTerminal: {
        type: Number,
        required: true
    },
    priceEcon: {
        type: Number,
        required: true
    },
    priceBus: {
        type: Number,
        required: true
    },
}, { timestamps: true })
const flight = mongoose.model('flight', flightSchema);
module.exports = flight;
