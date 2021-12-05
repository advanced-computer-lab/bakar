require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		});

		console.log('MongoDB is Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

autoIncrement.initialize(mongoose.connection);
module.exports = connectDB;
