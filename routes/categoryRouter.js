const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const { authentication } = require('../middlewares/authentication')
const  authorization  = require('../middlewares/authorization')

router.post('/',authentication, CategoryController.createCategory)
router.get('/',authentication, CategoryController.getCategory)
router.patch('/:id',authentication, CategoryController.updateCategory)
router.delete('/:id',authentication, CategoryController.deleteCategory)

module.exports = router

