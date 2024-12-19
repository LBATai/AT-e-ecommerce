const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {   
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            index: true, 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        created: {
            type: Date,
            default: Date.now,
        },
        updated: {  // Thêm trường updated để ghi lại thời gian chỉnh sửa
            type: Date,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        content: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 1000,
        },
    },
);

commentSchema.index({ product: 1, user: 1 });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
