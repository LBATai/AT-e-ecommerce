const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true},
        // isAdmin : { type: Boolean, default: false},
        role: { type: String, enum: ['admin', 'user', 'sale'], }, // Thay isAdmin bằng role
        avatar: { type: String, },
        address: { type: String, require: true},
        age: { type: String, require: true},
        access_token: { type: String},
        refresh_token: { type: String}
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;