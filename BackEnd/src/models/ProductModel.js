const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    images: { type: [String], required: true },
    type: { type: String, required: true }, // Loại sản phẩm: máy tính, áo quần, v.v.
    price: { type: Number, required: true },
    countAllInStock: { type: Number },
    rating: { type: Number, default: 5},
    countRating: { type: Number, default: 0},
    description: { type: String },
    discount: { type: Number },
    selled: { type: Number, default: 0 },
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

// Middleware to calculate countAllInStock before saving the product
productSchema.pre('save', function(next) {
  let totalStock = 0;

  // Tính tổng số lượng trong options
  this.options.forEach(option => {
    option.sizes.forEach(size => {
      totalStock += size.countInStock;
    });
  });

  // Gán tổng số lượng vào countAllInStock
  this.countAllInStock = totalStock;

  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
