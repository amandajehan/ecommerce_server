const { Product } = require('../models')

class ProductController {
	static async showAll(req, res, next) {
		try {
			const products = await Product.findAll()

			res.status(200).json(products)

		} catch(err) {
			next(err)
		}
	}

	static async showById(req, res, next) {
		try {
			const id = +req.params.id
			const product = await Product.findByPk(id)

			res.status(200).json(product)
			
		} catch(err) {
			next(err)
		}
	}

	static async create(req, res, next) {
		try {
			const userId = req.loggedInUser.id
			const { name, image_url, price, stock, category } = req.body

			const newProduct = await Product.create({
				name,
				image_url,
				price,
				stock,
				category,
				userId
			})

			res.status(201).json({
				id: newProduct.id,
				name: newProduct.name,
				image_url: newProduct.image_url,
				price: newProduct.price,
				stock: newProduct.stock,
				category: newProduct.category,
				userId: userId
			})

		} catch(err) {
			next(err)
		}
	}

	static async update(req, res, next) {
		try {
			const id = +req.params.id
			const { name, image_url, price, stock, category } = req.body
			const updatedProduct = await Product.update({
				name,
				image_url,
				price,
				stock,
				category
			},{
				where: { id }, returning: true })
				
				res.status(200).json(updatedProduct[1][0])

		} catch(err) {
			next(err)
		}
	}

	static async delete(req, res, next) {
		try {
			const id = +req.params.id
			const deletedProduct = await Product.destroy({
				where: { id }, returning: true
			})

			res.status(200).json({ message: 'delete product success' })

		} catch(err) {
			next(err)
		}
	}

}

module.exports = ProductController