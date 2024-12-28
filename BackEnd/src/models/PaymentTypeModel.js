const mongoose = require('mongoose');

const paymentTypeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, // Unique name for payment type (e.g., "Credit Card", "PayPal")
        description: { type: String },
        enabled: { type: Boolean, default: true }, // Status of the payment type (enable/disable)
        icon: { type: String }, // URL or path to the payment type icon
        // Add any other relevant fields
    },
    {
        timestamps: true,
    }
);

const PaymentType = mongoose.model('PaymentType', paymentTypeSchema);
module.exports = PaymentType;