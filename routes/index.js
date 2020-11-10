const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const ProductController = require('../controllers/ProductController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

router.post('/login', UserController.login)

router.use(authentication)

router.get('/products', ProductController.showAll)
router.post('/products', authorization, ProductController.create)
router.put('/products/:id', authorization, ProductController.update)
router.delete('/products/:id', authorization, ProductController.delete)


module.exports = router