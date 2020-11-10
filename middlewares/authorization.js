async function authorization(req, res, next) {
	try {
		const { role } = req.headers
		if (role !== 'admin') {
			throw { name: 'AuthorizationFailed' }

		} else {
			next()
		}

	} catch (err) {
		next(err)
	}
}

module.exports = authorization
