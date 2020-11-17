const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const ProductController = require('../controllers/ProductController.js')
const BannerController = require('../controllers/BannerController.js')
const CartController = require('../controllers/CartController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

// show all products in home customer page
router.get('/home', ProductController.showProducts)

router.use(authentication)

// carts routing
router.get('/cart', CartController.showAll)
router.post('/cart', CartController.add)
router.patch('/cart', CartController.checkout)
router.patch('/cart/:id', CartController.update)
router.delete('/cart/:id', CartController.delete)
// products and banners routing 
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