const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
	{
		_id: {
			type: String,
		},
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
		username: {
			type: String,
			required,
		},
		email: {
			type: String,
			required: true,
		},
		passport: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);
const ticket = mongoose.model('ticket', ticketSchema);
module.exports = ticket;
