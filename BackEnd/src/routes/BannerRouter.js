const express = require("express");
const router = express.Router();
const BannerController = require("../controllers/BannerController");
// const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware"); // Import middleware nếu cần

// Tạo banner mới
router.post('/create-banner', BannerController.createBanner);

// Lấy tất cả banner
router.get('/get-all-banner', BannerController.getAllBanner);

// Lấy chi tiết banner
router.get('/get-details-banner/:id', BannerController.getDetailsBanner);

// Cập nhật banner
router.put('/update-banner/:id', BannerController.updateBanner);

// Xóa banner
router.delete('/delete-banner/:id', BannerController.deleteBanner);

// Xóa nhiều banner
router.delete('/delete-multiple-banners', BannerController.deleteMultipleBanners);

module.exports = router;