const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
	try {
		console.log(req.headers.authorization);
		const token = req.headers.authorization.slice(7);
		console.log('header ', token);
		if (!token) {
			return res.status(403).send('User does not have a token issued.');
		}
		const decoded = jwt.verify(token, process.env.secretKey);
		console.log('decoded ', decoded);
		req.user = decoded;
		return next();
	} catch (err) {
		console.log(err);
		return res.status(403).send('Invalid token.');
	}
};

module.exports = auth;
