module.exports = function (err, req, res, next) {
		let errors = []
		let status = 500
		let name = err.name

		switch (name) {
			case 'SequelizeValidationError':
				status = 400
				err.errors.forEach(el => {
					errors.push(el.message)
				})
				break;
			case 'InvalidEmailPassword':
				status = 400
				errors.push('invalid email / password')
				break;
			case 'LoginBadRequest':
				status = 400
				errors.push('e-mail and password are required')
				break;
			case 'AuthenticationFailed':
				status = 401
				errors.push('authentication failed')
				break;
			case `AuthorizationFailed`:
				status = 403
				errors.push('authorization failed')
				break;
			default:
				status = 500
				errors.push('internal server error')

		}
		res.status(status).json({ errors })

	}
