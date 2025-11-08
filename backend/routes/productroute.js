const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// CREATE product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// SEARCH products by name
router.get("/search/:query", async (req, res) => {
  try {
    const q = req.params.query.toLowerCase();
    const products = await Product.find({ name: { $regex: q, $options: "i" } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CATEGORY filter
router.get("/category/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const products = await Product.find({ category: categoryName });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
