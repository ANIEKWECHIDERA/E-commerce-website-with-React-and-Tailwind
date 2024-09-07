const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  subCategory: { type: String },
  sizes: [String],
  bestseller: { type: Boolean, default: false },
  images: [String], // URLs to images
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
