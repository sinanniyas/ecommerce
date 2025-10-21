const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to your User model
      required: false, // keep false if guest checkout allowed
    },
    customer: {
      firstName: String,
      lastName: String,
      phone: String,
      country: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      postcode: String,
      delivery: Boolean,
    },
    paymentMode: { type: String, default: "COD" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
