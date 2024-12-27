const mongoose = require('mongoose');

const shippingTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },                                         // Tên loại hình giao hàng (ví dụ: Giao hàng tiêu chuẩn, Giao hàng nhanh)
    description: { type: String },                                                  // Mô tả về loại hình giao hàng (ví dụ: Thời gian giao hàng, phương thức)
    price: { type: Number, required: true },                                            // Giá trị của phí vận chuyển
    estimatedDeliveryTime: { type: String, required: true },                        // Thời gian giao hàng ước tính (ví dụ: 3-5 ngày làm việc)
    isAvailable: { type: Boolean, default: true },                              // Kiểm tra loại giao hàng có sẵn hay không
    createdAt: { type: Date, default: Date.now },                               // Thời gian tạo loại hình giao hàng
    updatedAt: { type: Date },                                                      // Thời gian cập nhật
  },
  {
    timestamps: true,                                                                   // Tạo trường createdAt và updatedAt tự động
  }
);

const ShippingType = mongoose.model('ShippingType', shippingTypeSchema);

module.exports = ShippingType;
