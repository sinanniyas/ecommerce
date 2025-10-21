// backend/routes/orders.js
const mongoose = require("mongoose"); // add this at the top
const express = require("express");
const router = express.Router();
const Order = require("../models/orders");


// POST - Create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, firstName, lastName, country, address1, address2, city, state, phone, postcode, paymentMode, cart, delivery } = req.body;

    if (!firstName || !lastName || !address1 || !city || !state || !postcode || !phone || !cart || cart.length === 0) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const customer = { firstName, lastName, phone, country, address1, address2, city, state, postcode, delivery };

    const products = cart.map(item => ({
      productId: item.productId?._id || item._id,
      name: item.productId?.name,
      price: item.productId?.price,
      quantity: item.quantity,
    }));

    const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalAmount = subtotal;

    const newOrder = new Order({
      userId, // ✅ link user to order
      customer,
      paymentMode: paymentMode || "COD",
      products,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// GET - Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId", "name price image");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE order status and delivery
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const delivery = status === "Delivered"; // if delivered, delivery true

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        "customer.delivery": delivery, // update nested field
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const orders = await Order.find({ userId: userId }) // no need for mongoose.Types.ObjectId()
      .populate("products.productId", "name price image");

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
