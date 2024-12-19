const express = require("express")
const router = express.Router()
const OrderController = require("../controllers/OrderController")
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware")

router.post('/create-order/:id', authUserMiddleware, OrderController.createOrder)
router.get('/getAll-order', OrderController.getAllOrder)
router.delete('/delete-order/:id', OrderController.deleteOrder)
router.get('/detail-order/:id', OrderController.getDetailOrder)
router.put('/update-order/:id', OrderController.updateOrder)

module.exports = router