// backend/models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  quantity: { type: Number },
  price: { type: Number, required: true },
  mrp: { type: Number },
  discount: { type: Number },
  description: { type: String },
  image: { type: String },  // store image URL or path
  status: { type: String, default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
