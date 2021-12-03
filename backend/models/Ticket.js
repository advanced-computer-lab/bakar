const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const ticketSchema = new Schema(
	{
		departureFlightNo: {
			type: String,
			required: true,
		},
		returnFlightNo: {
			type: String,
			required: true,
		},
		cabin: {
			type: String,
			required: true,
		},
		seatsDeparture: {
			type: [Number],
			required: true,
		},
		seatsReturn: {
			type: [Number],
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		priceDeparture: {
			type: Number,
			required: true,
		},
		priceReturn: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

ticketSchema.plugin(autoIncrement.plugin, 'Ticket');
const ticket = mongoose.model('ticket', ticketSchema);
module.exports = ticket;
