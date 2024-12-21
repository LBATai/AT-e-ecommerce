const CommentService = require('../services/CommentService');
const { validationResult } = require('express-validator');

// Tạo bình luận mới
const createComment = async (req, res) => {
  // console.log('req.body: ' , req.body);
  try {
    const {
        productId, userId, rating, content, avatarUser, nameUser
    } = req.body;
    if ( !productId || !userId || !rating || !content || !avatarUser || !nameUser) {
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

const getCommentsByProduct = async (req, res) => {
  try {
    const { filter } = req.query; // Lấy giá trị filter từ query string
    let productId = null;
    // Kiểm tra nếu filter có giá trị và chứa userId
    // Kiểm tra và tách giá trị filter
    if (filter && filter.includes(":")) {
        const parsedFilter = filter.split(":");
        if (parsedFilter.length === 2 && parsedFilter[0] === "productId") {
          productId = parsedFilter[1]; // Lấy giá trị productId từ filter
        }
    }
    // Truyền userId vào hàm getAllOrder của Service
    const response = await CommentService.getCommentsByProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in get all comments:", e);
    return res.status(500).json({
      message: "Error occurred while fetching comments",
    });
  }
};

module.exports = {
    createComment,
    getCommentsByProduct,
};
