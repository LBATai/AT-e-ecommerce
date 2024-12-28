const express = require('express');
const router = express.Router();
const OrderAddressController = require('../controllers/OrderAddressController');

router.post('/create', OrderAddressController.createOrderAddress);
router.get('/get-all', OrderAddressController.getAllOrderAddresses);
router.get('/get-address/:id', OrderAddressController.getOrderAddressById)
router.put('/update/:id', OrderAddressController.updateOrderAddress);
router.delete('/delete/:id', OrderAddressController.deleteOrderAddress);

module.exports = router;