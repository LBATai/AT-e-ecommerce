// commentService.js
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const Comment = require('../models/CommentModel');

const createComment = (commentData) => {
    return new Promise(async (resolve, reject) => {
        const { productId, userId, rating, content, avatarUser, nameUser } = commentData;
        try {
            const createnewComment = await Comment.create({
                productId,
                rating,
                content,
                userId,
                avatarUser,
                nameUser,
            });

            // Tìm và cập nhật rating cho Product
            const product = await Product.findById(productId);

            if (!product) {
                return reject({
                    status: 'error',
                    message: 'Product not found',
                });
            }
           const allComments = await Comment.find({productId});
           const totalRating = allComments.reduce((sum, comment) => sum + comment.rating,0);
            let averageRating = allComments.length > 0 ? totalRating / allComments.length : 0;
            averageRating = Math.round(averageRating * 10) / 10;

            const totalCountRating = allComments.length
             await Product.findByIdAndUpdate(productId, {
                 rating: averageRating,
                 countRating: totalCountRating
             })

             if (createnewComment) {
                resolve({
                    status: 'success',
                    message: 'Comment created successfully',
                    data: createnewComment,
                });
            }
        } catch (e) {
            console.log('err message:', e.message);
            console.log('err stack:', e.stack);
            reject(e);
        }
    });
};
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