const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// CREATE a product
router.post("/", async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      price,
      mrp,
      discount,
      description,
      image,
      status,
    } = req.body;

    // Simple validation
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const newProduct = await Product.create({
      name,
      category,
      quantity,
      price,
      mrp,
      discount,
      description,
      image,
      status: status || "active", // default if not provided
    });

    res.status(201).json(newProduct);
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





// GET all products
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// backend/routes/productroute.js
router.get("/category/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const products = await Product.find({ category: categoryName });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// UPDATE product by ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // req.body contains updated fields
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
    });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
