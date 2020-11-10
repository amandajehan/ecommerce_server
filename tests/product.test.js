const request = require('supertest')
const app = require('../app.js')
const { User, Product } = require('../models')
const { signToken } = require('../helpers/jwt.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token = ''

let productData = {
	name: 'Realme 7 Smartphone',
	image_url: 'shorturl.at/nwxKQ',
	price: 4000000,
	stock: 50
}

let productId = null

let userData = {
	id: '',
	email: '',
	role: ''
}

//generate token before all tests run
beforeAll(function (done) {
	User.findOne({
		where: {
			id: 1
		}
	})
		.then(user => {
			payload = {
				id: user.id,
				email: user.email,
			}
			userData.role = user.role
			access_token = signToken(payload, 'secret')

			return Product.create({
				name: 'iPhone',
				image_url: 'shortutl.at/wkjedl',
				price: 9000000,
				stock: 5
			})

		})
		.then(data => {
			productId = data.id
			done()
		})
		.catch(err => {
			done(err)
		})
})

afterAll(function (done) {
	queryInterface.bulkDelete('Products')
		.then(() => {
			done()
		})
		.catch(err => {
			done()
		})
})


describe('Endpoint Test POST /products', () => {
	//Test Case #1 - Create a Product success
	it('Success Case: Create Product Test - should return an object with keys: id, name, image_url, price, stock', (done) => {
		request(app)
			.post('/products')
			.send(productData)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				expect(res.status).toEqual(201)
				expect(res.body).toHaveProperty('id', expect.any(Number))
				expect(res.body).toHaveProperty('name', productData.name)
				expect(res.body).toHaveProperty('image_url', productData.image_url)
				expect(res.body).toHaveProperty('price', productData.price)
				expect(res.body).toHaveProperty('stock', productData.stock)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #2 - Create a Product failed due to missing required field name
	it('Error Case: Create Product Test - Missing required name', (done) => {
		request(app)
			.post('/products')
			.send({
				image_url: productData.image_url,
				price: productData.price,
				stock: productData.stock
			})
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['name cannot be null']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	// Test Case #3 - Create a Product failed due to missing required field image_url
	it('Error Case: Create Product Test - Missing required image_url', (done) => {
		request(app)
			.post('/products')
			.send({
				name: productData.name,
				price: productData.price,
				stock: productData.stock
			})
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['image url cannot be null']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #4 - Create a Product failed due to missing required field price
	it('Error Case: Create Product Test - Missing required price', (done) => {
		request(app)
			.post('/products')
			.send({
				name: productData.name,
				image_url: productData.image_url,
				stock: productData.stock
			})
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['price cannot be null']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #5 - Create a Product failed due to missing required field stock
	it('Error Case: Create Product Test - Missing required stock', (done) => {
		request(app)
			.post('/products')
			.send({
				name: productData.name,
				image_url: productData.image_url,
				price: productData.price,
			})
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['stock cannot be null']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #6 - Create a Product failed due to no access_token
	it('Error Case: Create Product Test - No access token', (done) => {
		request(app)
			.post('/products')
			.send(productData)
			.set({
				'role': userData.role
			})
			.then(res => {
				const errors = ['authentication failed']
				expect(res.status).toEqual(401)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #7 - Create a Product failed due to role not as an admin
	it('Error Case: Create Product Test - Role is not admin', (done) => {
		userData.role = 'customer'
		request(app)
			.post('/products')
			.send(productData)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['authorization failed']
				expect(res.status).toEqual(403)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #8 - Create a Product failed due to input price is minus
	it('Error Case: Create Product Test - Price is minus', (done) => {
		userData.role = 'admin'
		request(app)
			.post('/products')
			.send({
				name: productData.name,
				image_url: productData.image_url,
				price: -5000,
				stock: productData.stock
			})
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['price must not less than or equal to zero, or minus']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #9 - Create a Product failed due to input stock is minus
	it('Error Case: Create Product Test - Stock is minus', (done) => {
		request(app)
			.post('/products')
			.send({
				name: productData.name,
				image_url: productData.image_url,
				price: productData.price,
				stock: -5
			})
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['stock must not less than or equal to zero, or minus']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #10 - Create a Product failed due to invalid data type of stock
	it('Error Case: Create Product Test - Invalid stock field data type', (done) => {
		request(app)
			.post('/products')
			.send({
				name: productData.name,
				image_url: productData.image_url,
				price: productData.price,
				stock: 'lima'
			})
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['stock must be in integer']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #11 - Create a Product failed due to invalid data type of price
	it('Error Case: Create Product Test - Invalid price field data type', (done) => {
		request(app)
			.post('/products')
			.send({
				name: productData.name,
				image_url: productData.image_url,
				price: 'lima juta',
				stock: productData.stock
			})
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['price must be in integer']
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

describe('Endpoint Test PUT /products/:id', () => {
	// 	//Test Case #1 - Update a Product success
	it('Success Case: Update Product Test - should return an object with keys: name, image_url, price, stock', (done) => {
		const updatedProduct = {
			name: 'Samsung X',
			image_url: 'shorturl.at/ijnEQ',
			price: 3000000,
			stock: 10
		}
		request(app)
			.put(`/products/${productId}`)
			.send(updatedProduct)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				expect(res.status).toEqual(200)
				expect(res.body).toHaveProperty('name', updatedProduct.name)
				expect(res.body).toHaveProperty('image_url', updatedProduct.image_url)
				expect(res.body).toHaveProperty('price', updatedProduct.price)
				expect(res.body).toHaveProperty('stock', updatedProduct.stock)
				done()
			})
			.catch(err => {
				done()
			})
	})

	// 	//Test Case #2 - Update a Product failed due to no access token
	it('Error Case: Update Product Test - No access token', (done) => {
		const updatedProduct = {
			name: 'Samsung X',
			image_url: 'shorturl.at/ijnEQ',
			price: 3000000,
			stock: 10
		}

		request(app)
			.put(`/products/${productId}`)
			.send(updatedProduct)
			.set({
				'role': userData.role
			})
			.then(res => {
				const errors = ['authentication failed']
				expect(res.status).toEqual(401)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	// 	//Test Case #3 - Update a Product failed due to role not as an admin
	it('Error Case: Update Product Test - Role is not admin', (done) => {
		const updatedProduct = {
			name: 'Samsung X',
			image_url: 'shorturl.at/ijnEQ',
			price: 3000000,
			stock: 10
		}
		userData.role = 'customer'

		request(app)
			.put(`/products/${productId}`)
			.send(updatedProduct)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['authorization failed']
				expect(res.status).toEqual(403)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	//Test Case #4 - Update a Product failed due to invalid data type of stock
	it('Error Case: Update Product Test - Invalid stock field data type', (done) => {
		const updatedProduct = {
			name: 'Samsung X',
			image_url: 'shorturl.at/ijnEQ',
			price: 3000000,
			stock: 'sepuluh'
		}
		userData.role = 'admin'

		request(app)
			.put(`/products/${productId}`)
			.send(updatedProduct)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['stock must be in integer']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done()
			})
	})

	// 	//Test Case #5 - Update a Product failed due to input price is minus
	it('Error Case: Update Product Test - Price is minus', (done) => {
		const updatedProduct = {
			name: 'Samsung X',
			image_url: 'shorturl.at/ijnEQ',
			price: -3000000,
			stock: 10
		}
		userData.role = 'admin'

		request(app)
			.put(`/products/${productId}`)
			.send(updatedProduct)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['price must not less than or equal to zero, or minus']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done()
			})
	})

	// 	//Test Case #6 - Update a Product failed due to input stock is minus
	it('Error Case: Update Product Test - Stock is minus', (done) => {
		const updatedProduct = {
			name: 'Samsung X',
			image_url: 'shorturl.at/ijnEQ',
			price: 3000000,
			stock: -100
		}

		request(app)
			.put(`/products/${productId}`)
			.send(updatedProduct)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['price must not less than or equal to zero, or minus']
				expect(res.status).toEqual(400)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done()
			})
	})
})

describe('Endpoint Test DELETE /products', () => {
	it('Success Case - Delete Product Test: should return an object with key message', (done) => {
		request(app)
			.delete(`products/${productId}`)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				expect(res.status).toEqual(200)
				expect(res.body).toHaveProperty('message', 'delete product success')
				done()
			})
			.catch(err => {
				done()
			})
	})

	it('Error Case - Delete Product Test: No access token', (done) => {
		request(app)
			.delete(`products/${productId}`)
			.set({
				'role': userData.role
			})
			.then(res => {
				const errors = ['authentication failed']
				expect(res.status).toEqual(401)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done()
			})
	})

	it('Error Case - Delete Product Test: Role is not admin', (done) => {
		userData.role = 'customer'
		request(app)
			.delete(`products/${productId}`)
			.set({
				'access_token': access_token,
				'role': userData.role
			})
			.then(res => {
				const errors = ['authorization failed']
				expect(res.status).toEqual(403)
				expect(res.body).toHaveProperty('errors', expect.any(Array))
				expect(res.body.errors).toEqual(errors)
				done()
			})
			.catch(err => {
				done()
			})
	})
})