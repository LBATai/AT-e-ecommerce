const CommentService = require('../services/CommentService');
const { validationResult } = require('express-validator');

// Tạo bình luận mới
const createComment = async (req, res) => {
  // console.log('req.body: ' , req.body);
  try {
    const {
        productId, userId, rating, content
    } = req.body;
    if (
        !productId || !userId || !rating || !content
    ) {
      return res.status(200).json({
        status: "Error",
        message: "Please provide all required fields of the comment",
      });
    }
    const response = await CommentService.createComment(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("err message:", e.message); // Thông báo lỗi
    console.log("err stack:", e.stack); // Vị trí stack trace
    return res.status(404).json({
      message: e,
    });
  }
};
// Cập nhật bình luận
const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content, rating } = req.body;

    try {
        const updatedComment = await CommentService.updateComment(commentId, content, rating);
        res.status(200).json({ message: 'Bình luận đã được cập nhật', comment: updatedComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa bình luận
const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const deletedComment = await CommentService.deleteComment(commentId);
        res.status(200).json({ message: 'Bình luận đã được xóa', comment: deletedComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả bình luận của một sản phẩm
const getCommentsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const comments = await CommentService.getCommentsByProduct(productId);
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy bình luận của người dùng cho một sản phẩm
const getCommentByUserAndProduct = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const comment = await CommentService.getCommentByUserAndProduct(productId, userId);
        if (!comment) {
            return res.status(404).json({ message: 'Bình luận không tồn tại' });
        }
        res.status(200).json({ comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByProduct,
    getCommentByUserAndProduct,
};
