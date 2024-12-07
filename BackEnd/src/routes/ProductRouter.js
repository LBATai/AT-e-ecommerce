const express = require("express")
const router = express.Router()
const ProductController = require("../controllers/ProductController")
const { authMiddleware } = require("../middleware/authMiddleware")

router.post('/create-product', ProductController.createProduct)
router.put('/update-product/:id', ProductController.updateProduct)
router.get('/detail-product/:id', ProductController.getDetailProduct)
router.get('/getAll-product', ProductController.getAllProduct)
router.delete('/delete-product/:id', ProductController.deleteProduct)
router.post('/delete-multiple', ProductController.deleteMultipleProduct);
router.get('/getAll-type', ProductController.getAllType);

module.exports = router