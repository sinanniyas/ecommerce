const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Add product to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    await user.populate("cart.productId"); // ✅ populate here
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Remove product from cart
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    await user.populate("cart.productId"); // ✅ populate here

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update quantity of a cart item
router.post("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      user.cart[itemIndex].quantity = quantity;
      await user.save();
      await user.populate("cart.productId"); // ✅ populate here
      return res.status(200).json({ success: true, cart: user.cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("cart.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
