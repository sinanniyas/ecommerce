const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/add", protect, async (req, res) => {
  const user = req.user;
  const { productId } = req.body;

  try {
    if (!user.wishlist.some(item => item.productId.toString() === productId)) {
      user.wishlist.push({ productId });
      await user.save();
    }
    await user.populate("wishlist.productId");
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/remove", protect, async (req, res) => {
  const user = req.user;
  const { productId } = req.body;

  try {
    user.wishlist = user.wishlist.filter(item => item.productId.toString() !== productId);
    await user.save();
    await user.populate("wishlist.productId");
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    await req.user.populate("wishlist.productId");
    res.status(200).json(req.user.wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
