const mongoose = require('mongoose');

const orderAddressSchema = new mongoose.Schema(
  {
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

const OrderAddress = mongoose.model('Product', orderAddressSchema);
module.exports = OrderAddress;
