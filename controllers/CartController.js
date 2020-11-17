const { Cart, Product } = require('../models')

class CartController {
	//add product to cart
	static async add(req, res, next) {
		try {
			const cart = await Cart.create({
				productId: req.body.productId,
				userId: req.loggedInUser.id,
				quantity: req.body.quantity,
			})

			res.status(201).json({ Cart: cart })

		} catch(err) {
			next(err)
		}
	}

	//show all products in cart by the user
	static async showAll(req, res, next) {
		try {
			const carts = await Cart.findAll({
				where: {
					userId: req.loggedInUser.id
				},
				include: [Product]
			})
			
			res.status(200).json({ Cart: carts })

		} catch(err) {
			next(err)
		}
	}

	//update quantity of product in cart
	static async update(req, res, next) {
		try {
			const id = +req.params.id
			const { quantity } = req.body

			const updatedCart = await Cart.update({
				quantity
			}, {
				where: { id },
				returning: true
			})

			res.status(200).json({ Cart: updatedCart[1][0] })

		} catch(err) {
			next(err)
		}
	}

	//remove product from the cart
	static async delete(req, res, next) {
		try {
			const id = +req.params.id
			const deletedCart = await Cart.destroy({
				where: { id },
				returning: true
			})

			res.status(200).json({ message: 'remove product from cart succeed' })

		} catch(err) {
			next(err)
		}
	}

	static async checkout(req, res, next) {
		try {
			const status = true //checked out
			await Cart.update({
				status
			}, {
				where: {
					userId: req.loggedInUser.id
				}
			})

			const carts = await Cart.findAll({
				where: {
					userId: req.loggedInUser.id
				},
				include: [Product]
			})

			carts.map(perCart => {
				let newStock = perCart.Product.stock - perCart.quantity
				Product.update({
					stock: newStock
				}, {
					where: {
						id: perCart.productId
					}
				})
				.then(() => {
					return perCart
				})
				.catch(err => {
					console.log(err)
				})
			})

			res.status(200).json({ msg: 'checkout success'})

		} catch(err) {
			next(err)
		}
	}
}

module.exports = CartController