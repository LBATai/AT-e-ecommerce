const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    images: { type: [String], required: true },
    type: { type: String, required: true }, // Loại sản phẩm: máy tính, áo quần, v.v.
    price: { type: Number, required: true },
    countInStock: { type: Number},
    rating: { type: Number },
    description: { type: String },
    discount: { type: Number },
    selled: { type: Number },
    isLike: {type: Boolean, default: false},
    sex: { 
      type: String, 
      enum: ['male', 'female', 'unisex'], 
      required: true 
    },
    options: [
      {
        color: { type: String }, // Màu sắc
        sizes: [
          {
            size: { type: String }, // Kích thước: S, M, L, XL, v.v.
            countInStock: { type: Number, required: true }, // Số lượng từng kích thước
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
