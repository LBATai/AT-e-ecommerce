const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {type: Date,default: Date.now,},
  updated: {type: Date,},
  rating: {type: Number,required: true,min: 1,max: 5,},
  content: {type: String,required: true,minlength: 1,maxlength: 1000,},
  avatarUser: {type: String,required: true,},
  nameUser: {type: String,required: true,},
});

commentSchema.index({ productId: 1, userId: 1 });

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
