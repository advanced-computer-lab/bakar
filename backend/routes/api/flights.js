const express = require('express');
const router = express.Router();
const Flight = require('../../models/Flight');
const jwt = require('jsonwebtoken');
const auth = require('../../authorization/authorization');

router.post('/', auth, async (req, res) => {
	if (req.user.isAdmin) {
		if (req.body.departureTime < req.body.arrivalTime) {
			if (req.body.seatsEcon >= 0 && req.body.seatsBus >= 0) {
				if (req.body.departureLocation != req.body.arrivalLocation) {
					const newFlight = new Flight({
						...req.body,
						availableEcon: req.body.seatsEcon,
						availableBus: req.body.seatsBus,
						seatsEconView: Array(parseInt(req.body.seatsEcon)).fill('Free'),
						seatsBusView: Array(parseInt(req.body.seatsBus)).fill('Free'),
					});
					try {
						await newFlight.save();
						res.sendStatus(200);
						console.log('added');
					} catch (err) {
						console.log(err);
					}
				} else {
					throw "Arrival location isn't matching with departureLocation";
				}
			} else {
				throw 'Invalid seatNumber';
			}
		} else {
			throw 'Invalid departureTime or arrivalTime';
		}
	} else {
		throw 'Only Admin can create a flight.';
	}
});

router.get('/', async (req, res) => {
	try {
		const myQuery = {
			...req.query,
			departureTime: {
				$gte:
					new Date(req.query.departureTime).getTime() || new Date().getTime(),
			},
			availableBus: { $gte: req.query.availableBus || 0 },
			availableEcon: { $gte: req.query.availableEcon || 0 },
		};
		if (myQuery.arrivalTime) {
			myQuery.arrivalTime = { $gte: new Date(myQuery.arrivalTime).getTime() };
		}
		const result = await Flight.find(myQuery).exec();
		res.send(result);
	} catch (err) {
		console.log(err);
	}
});

router.get('/:flightNo', async (req, res) => {
	try {
		const result = await Flight.findOne({
			flightNo: req.params.flightNo,
		}).exec();
		res.status(200).send(result);
	} catch (err) {
		console.log(err);
	}
});

router.put('/:flightNo', auth, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			if (req.body.arrivalTime > req.body.departureTime) {
				const newFlight = await Flight.updateOne(
					{ flightNo: req.params.flightNo },
					req.body
				).exec();
				res.status(200).send('flight updated ');
				console.log('The flight is Updated successfully !');
			} else {
				res.status(400).send('Invalid departureTime or arrivalTime');
			}
		} catch (err) {
			console.log(err);
		}
	} else {
		throw 'Only Admin can edit a flight.';
	}
});

router.delete('/:flightNo', auth, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const dbResult = await Flight.deleteOne({
				flightNo: req.params.flightNo,
			}).exec();
			res.status(200).send(dbResult);
		} catch (err) {
			console.log(err);
			res.status(500).send('Error deleting request');
		}
	} else {
		throw 'Only Admin can delete a flight.';
	}
});

router.get('/:flightNo', async (req, res) => {
	try {
		const dbResult = await Flight.find({
			flightNo: req.params.flightNo,
		}).exec();
		res.send(dbResult).status(200);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error deleting request');
	}
});

router.post('/delete', auth, async (req, res) => {
	if (req.user.isAdmin) {
		const flights = req.body.deleteQuery;
		try {
			const dbResult = await Flight.deleteMany(flights).exec();
			res.status(200).send(dbResult);
		} catch (err) {
			console.log(err);
			res.status(500).send('Error deleting request');
		}
	} else {
		throw 'Only Admin can create a flight.';
	}
});

router.get('/seats/:flightNo', async (req, res) => {
	try {
		const result = await Flight.findOne({
			flightNo: req.params.flightNo,
		}).exec();
		if (req.body.cabin == 'Economy') {
			res.status(200).send(result.seatsEcon);
		} else if (req.body.cabin == 'Business') {
			res.status(200).send(result.seatsBus);
		} else {
			res.status(500).send('Error');
		}
	} catch (err) {
		console.log(err);
		res.status(500).send('Error deleting request');
	}
});

module.exports = router;
