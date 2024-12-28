const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    discount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, required: true, default: "active" },
    maxIssuance: { type: Number, required: true }, // Giới hạn số lượng voucher phát hành
    issuanceCount: { type: Number, default: 0 }, // Số lượng voucher đã được phát hành
    maxUsage: { type: Number, required: true }, // Giới hạn số lần sử dụng cho mỗi voucher
    usageCount: { type: Number, default: 0 },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // product: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Product",
    //   required: true,
    // }, 
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
