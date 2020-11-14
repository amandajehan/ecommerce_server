const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models')

async function authentication(req, res, next) {
	try {
		const { token, role } = req.headers
		if(!token) {
			console.log('gaada token')
			throw { name: 'AuthenticationFailed' }
		} else {
			const decoded = verifyToken(token)

			const user = await User.findOne({
				where: {
					email: decoded.email
				}
			})

			if (!user) {
				throw { name: 'AuthenticationFailed' }

			} else {
				req.loggedInUser = decoded
				next()

			}
		}

	} catch(err) {
		next(err)
	}
}

module.exports = authentication