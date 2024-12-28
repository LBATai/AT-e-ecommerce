const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true },
      image: { type: String, required: true },
      color: { type: String },
      size: { type: String },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  paidAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  isPaid: { type: Boolean, default: false },
  isSuccess: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  isCancelled: { type: Boolean, default: false },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
