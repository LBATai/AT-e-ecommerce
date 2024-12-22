const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    discount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, required: true, default: 'active' },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
