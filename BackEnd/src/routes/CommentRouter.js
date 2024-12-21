const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

// Tạo bình luận mới
router.post('/create-comment', CommentController.createComment);
router.get('/getCommentsByProduct', CommentController.getCommentsByProduct)

module.exports = router;
