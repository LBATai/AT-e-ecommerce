const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

// Tạo bình luận mới
router.post('/create-comment/:productId', CommentController.createComment);

// Lấy tất cả bình luận của sản phẩm
router.get('/getAll-comments/:productId', CommentController.getCommentsByProduct);

// Xóa bình luận
router.delete('/delete-comment/:commentId', CommentController.deleteComment);

// Lấy chi tiết bình luận của người dùng cho một sản phẩm
router.get('/get-comment/:productId', CommentController.getCommentByUserAndProduct);

// Cập nhật bình luận
router.put('/update-comment/:commentId', CommentController.updateComment);

module.exports = router;
