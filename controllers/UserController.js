const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { signToken } = require('../helpers/jwt.js')

class UserController {
	static async register(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await User.create({
				email, 
				password, 
			})
			
			console.log('user is successfully registered')

			res.status(201).json({
				id: user.id,
				email: user.email
			})

		} catch(err) {
			console.log(err, '<<< DI CONTROLLER')
			next(err)
		}
	}

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
				const token = signToken({
					id: user.id,
					email: user.email,
				})

				res.status(200).json({
					message: 'login success',
					email: user.email,
					token,
					role: user.role
				})
			}

		} catch(err) {
			next(err)
		}
	}
}

module.exports = UserController