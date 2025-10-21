const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Add product to wishlist
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyExists = user.wishlist.some(
      (item) => item.productId.toString() === productId
    );

    if (!alreadyExists) {
      user.wishlist.push({ productId });
      await user.save();
    }

    await user.populate("wishlist.productId");
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Remove product from wishlist
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    await user.populate("wishlist.productId");

    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get wishlist
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "wishlist.productId"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.wishlist);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
