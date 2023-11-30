const router = require('express').Router()
const ProductController = require('../controllers/productController')
const { authentication } = require('../middlewares/authentication')
const  authorization  = require('../middlewares/authorization')

router.post('/',authentication, ProductController.createProduct)


module.exports = router

