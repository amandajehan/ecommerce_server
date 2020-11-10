const request = require('supertest')
const app = require('../app.js')

let userData = {
	email: 'admin@mail.com',
	password: '123456',
	role: 'admin'
}

describe('Endpoint Test POST /login', () => {
	//Test Case #1 - Login is success
	it('Success Case: Login Test - should return an object with keys: message, email, access_token, role', (done) => {
		request(app)
			.post('/login')
			.send({
				email: userData.email,
				password: userData.password
			})
			.then(res => {
				expect(res.status).toEqual(200)
				expect(res.body).toHaveProperty('message', 'login success')
				expect(res.body).toHaveProperty('email', userData.email)
				expect(res.body).toHaveProperty('access_token', expect.any(String))
				expect(res.body).toHaveProperty('role', userData.role)
				expect(res.body).not.toHaveProperty('password')
				done()
			})
			.catch(err => {
				done()
			})
	})

	//Test Case #2 - Login is failed due to wrong password
	it('Error Case: Login Test - wrong password', (done) => {
		request(app)
			.post('/login')
			.send({
				email: userData.email,
				password: '1234'
			})
			.then(res => {
				const errors = ['invalid email / password']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #3 - Login is failed due to email does not exist
	it('Error Case: Login Test - E-mail does not exist', (done) => {
		request(app)
			.post('/login')
			.send({
				email: 'admin1@gmail.com',
				password: userData.password
			})
			.then(res => {
				const errors = ['invalid email / password']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	// Test Case #4 - Login is failed due to null e-mail
	it('Error Case: Login Test - Null e-mail', (done) => {
		request(app)
			.post('/login')
			.send({
				password: userData.password
			})
			.then(res => {
				const errors = ['e-mail and password are required']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #5 - Login is failed due to null password
	it('Error Case: Login Test - Null password', (done) => {
		request(app)
			.post('/login')
			.send({
				email: userData.email,
			})
			.then(res => {
				const errors = ['e-mail and password are required']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

})