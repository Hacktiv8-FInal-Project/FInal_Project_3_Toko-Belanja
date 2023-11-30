const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const { authentication } = require('../middlewares/authentication')
const  authorization  = require('../middlewares/authorization')

router.post('/',authentication, authorization.admin, CategoryController.createCategory)
router.get('/',authentication, authorization.admin, CategoryController.getCategory)
router.patch('/:id',authentication, authorization.admin, authorization.category, CategoryController.updateCategory)
router.delete('/:id',authentication, authorization.admin, authorization.category, CategoryController.deleteCategory)

module.exports = router

