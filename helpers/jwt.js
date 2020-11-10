const jwt = require('jsonwebtoken')

function signToken(payload) {
	const access_token = jwt.sign(payload, 'secret')
	return access_token
}

function verifyToken(access_token) {
	const decoded = jwt.verify(access_token, 'secret')
	return decoded
}

module.exports = {
	signToken,
	verifyToken
}