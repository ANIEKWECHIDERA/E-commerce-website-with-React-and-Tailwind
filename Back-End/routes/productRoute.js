const express = require("express");
const Product = require("../models/product");
const router = express.Router();

//still needs admin permission

// Add product
router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

module.exports = router;
