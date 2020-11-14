const { Banner } = require('../models')

class BannerController {
	static async showAll(req, res, next) {
		try { 
			const banners = await Banner.findAll()

			res.status(200).json(banners)
		} catch(err) {
			next(err)
		}
	}

	static async showById(req, res, next) {
		try {
			const id = +req.params.id
			const banner = await Banner.findByPk(id)

			res.status(200).json(banner)

		} catch(err) {
			next(err)
		}
	}

	static async create(req, res, next) {
		try {
			const userId = req.loggedInUser.id
			const { title, status, image_url } = req.body
			const newBanner = await Banner.create({
				title,
				status,
				image_url,
				userId
			})

			res.status(201).json({
				id: newBanner.id,
				title: newBanner.title,
				status: newBanner.status,
				image_url: newBanner.image_url
			})
		} catch(err) {
			next(err)
		}
	}

	static async update(req, res, next) {
		try {
			const id = +req.params.id
			const { title, status, image_url } = req.body
			const updatedBanner = await Banner.update({
				title,
				status,
				image_url
			}, { where: { id }, returning: true})

			res.status(200).json(updatedBanner[1][0])

		} catch(err) {
			next(err)
		}
	}

	static async delete(req, res, next) {
		try {
			const id = +req.params.id
			const deletedBanner = await Banner.destroy({
				where: { id }, returning: true
			})

			res.status(200).json({ message: 'delete banner success' })
		} catch(err) {
			next(err)
		}
	}
}

module.exports = BannerController