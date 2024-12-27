const mongoose = require('mongoose');

const orderAddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Liên kết với User
    required: true,
  },
  name: { type: String, required: true }, // Tên người nhận
  address: { type: String, required: true }, // Địa chỉ
  phone: { type: String, required: true }, // Số điện thoại
  isDefault: { type: Boolean, default: false }, // Địa chỉ mặc định
  createdAt: { type: Date, default: Date.now },
});

const OrderAddress = mongoose.model('OrderAddress', orderAddressSchema);
module.exports = OrderAddress;
