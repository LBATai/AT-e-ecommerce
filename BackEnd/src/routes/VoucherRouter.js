const express = require("express");
const router = express.Router();
const VoucherController = require("../controllers/VoucherController");

// Tạo voucher mới
router.post('/create-voucher', VoucherController.createVoucher);

// Lấy tất cả voucher
router.get('/get-all-voucher', VoucherController.getAllVoucher);

// Lấy chi tiết voucher
router.get('/get-details-voucher/:id', VoucherController.getDetailsVoucher);

// Cập nhật voucher
router.put('/update-voucher/:id', VoucherController.updateVoucher);

// Xóa voucher
router.delete('/delete-voucher/:id', VoucherController.deleteVoucher);

// Xóa nhiều voucher
router.delete('/delete-multiple-vouchers', VoucherController.deleteMultipleVouchers);


module.exports = router;