const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/add", protect, async (req, res) => {
  const user = req.user; // from JWT
  const { productId, quantity = 1 } = req.body;

  try {
    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    await user.populate("cart.productId");
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/remove", protect, async (req, res) => {
  const user = req.user;
  const { productId } = req.body;

  try {
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    await user.populate("cart.productId");

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/update", protect, async (req, res) => {
  const user = req.user;
  const { productId, quantity } = req.body;

  try {
    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      user.cart[itemIndex].quantity = quantity;
      await user.save();
      await user.populate("cart.productId");
      return res.status(200).json({ success: true, cart: user.cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const user = await req.user.populate("cart.productId");
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
