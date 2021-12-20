const request = require('supertest');

const app = require('./index');

jest.setTimeout(500000);
describe('Task 4', () => {
	test('GET /', (done) => {
		request(app)
			.get('/flights/BEAL12')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				res.body['flightNo'] = "hab'd";
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
		// More logic goes here
	});
	// More things come here
});
