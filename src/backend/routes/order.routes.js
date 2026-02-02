const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const role = require('../middleware/role.middleware')
const controller = require('../controllers/order.controller')

router.post('/', auth, controller.createOrder)
router.get('/my', auth, controller.getMyOrders)
router.get('/all', auth, role('admin'), controller.getAllOrders)

module.exports = router