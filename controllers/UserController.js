const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { signToken } = require('../helpers/jwt.js')

class UserController {
	static async login(req, res, next) {
		try {
			const { email, password } = req.body
			if (!email || !password) {
				throw { name: 'LoginBadRequest'}
			}
			
			const user = await User.findOne({
				where: {
					email: req.body.email
				}
			})
			if (!user) {
				throw { name: 'InvalidEmailPassword' }

			} else if (!comparePassword(req.body.password, user.password)) {
				throw { name: 'InvalidEmailPassword' }

			} else {
				const access_token = signToken({
					id: user.id,
					email: user.email,
				})

				res.status(200).json({
					message: 'login success',
					email: user.email,
					access_token,
					role: user.role
				})
			}

		} catch(err) {
			next(err)
		}
	}
}

module.exports = UserController