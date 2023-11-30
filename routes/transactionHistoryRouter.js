const router = require('express').Router()
const TransactionHistoryController = require('../controllers/transactionHistoryController')
const { authentication } = require('../middlewares/authentication')
const  authorization  = require('../middlewares/authorization')

router.get('/admin',authentication, authorization.admin, TransactionHistoryController.getByAdmin)
router.post('/',authentication, TransactionHistoryController.create)
router.get('/user',authentication, TransactionHistoryController.getByUser)
router.get('/:id',authentication, authorization.transaction, TransactionHistoryController.getById)


module.exports = router