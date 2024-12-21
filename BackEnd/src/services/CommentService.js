const Product = require("../models/ProductModel")
const User = require("../models/UserModel")
const Comment = require("../models/CommentModel")

const bcrypt = require("bcrypt")
// Tạo bình luận mới
const createComment = (commentData) => {
    return new Promise(async (resolve, reject) => {
        const { productId, userId, rating, content, avatarUser, nameUser} = commentData
        try {
            const createnewComment = await Comment.create({
                productId,
                rating,
                content,
                userId,
                avatarUser,
                nameUser,
            })  
              
            if (createnewComment){
                resolve({
                    status: 'success',
                    message: 'Comment created successfully',
                    data: createnewComment
                })
            }
            } catch (e) {
                console.log('err message:', e.message); // Thông báo lỗi
                console.log('err stack:', e.stack); // Vị trí stack trace
                reject(e);
            }
        })
}

const getCommentsByProduct = async (productId) => {
    try {
      let comments;
      if (productId) {
        // Lọc đơn hàng theo trường 'user' với giá trị userId
        comments = await Comment.find({ productId: productId });
      } 
      return {
        status: 'OK',
        message: 'Get comments successful',
        data: comments,
      };
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error('Error occurred while fetching comments');
    }
  };

module.exports = {
    createComment,
    getCommentsByProduct,
};
