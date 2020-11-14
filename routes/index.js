const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const ProductController = require('../controllers/ProductController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')
const BannerController = require('../controllers/BannerController.js')

router.post('/login', UserController.login)

router.use(authentication)

router.get('/products', ProductController.showAll)
router.get('/banners', BannerController.showAll)

router.get('/products/:id', ProductController.showById)
router.get('/banners/:id', BannerController.showById)

router.post('/products', authorization, ProductController.create)
router.post('/banners', authorization, BannerController.create)

router.put('/products/:id', authorization, ProductController.update)
router.put('/banners/:id', authorization, BannerController.update)

router.delete('/products/:id', authorization, ProductController.delete)
router.delete('/banners/:id', authorization, BannerController.delete)

module.exports = router