const Product = require("../models/ProductModel")
const User = require("../models/UserModel")
const Comment = require("../models/CommentModel")

const bcrypt = require("bcrypt")
// Tạo bình luận mới
const createComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        const { productId, userId, rating, content} = newComment
        try {
            const createnewComment = await Order.create({
                product: productId,
                rating,
                content,
                user: userId
            })    
            if (createnewComment){
                resolve({
                    status: 'success',
                    message: 'Order created successfully',
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
// Cập nhật bình luận
const updateComment = async (commentId, content, rating) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content, rating, updated: Date.now() },
            { new: true }
        );
        if (!updatedComment) throw new Error('Bình luận không tồn tại');
        return updatedComment;
    } catch (error) {
        throw new Error('Không thể cập nhật bình luận: ' + error.message);
    }
};

// Xóa bình luận
const deleteComment = async (commentId) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) throw new Error('Bình luận không tồn tại');
        return deletedComment;
    } catch (error) {
        throw new Error('Không thể xóa bình luận: ' + error.message);
    }
};

// Lấy tất cả bình luận của một sản phẩm
const getCommentsByProduct = async (productId) => {
    try {
        const comments = await Comment.find({ product: productId }).populate('user', 'name email');
        return comments;
    } catch (error) {
        throw new Error('Không thể lấy bình luận: ' + error.message);
    }
};

// Lấy bình luận của một người dùng cho một sản phẩm
const getCommentByUserAndProduct = async (productId, userId) => {
    try {
        const comment = await Comment.findOne({ product: productId, user: userId });
        return comment;
    } catch (error) {
        throw new Error('Không thể lấy bình luận: ' + error.message);
    }
};

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByProduct,
    getCommentByUserAndProduct,
};
