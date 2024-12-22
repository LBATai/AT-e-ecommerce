const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String},
    description: { type: String},
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;
