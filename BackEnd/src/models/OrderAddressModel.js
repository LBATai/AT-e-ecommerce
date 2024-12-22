const mongoose = require('mongoose');

const orderAddressSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const OrderAddress = mongoose.model('Product', orderAddressSchema);
module.exports = OrderAddress;
