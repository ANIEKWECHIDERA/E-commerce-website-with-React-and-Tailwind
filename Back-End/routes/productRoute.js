const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const auth = require("../middleware/auth");

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

//still needs admin permission
// Add product
router.post("/add", async (req, res) => {
  const { name, category, price, description, images, sizes } = req.body;
  try {
    const newProduct = new Product({
      name,
      category,
      price,
      description,
      images,
      sizes,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

//Edit Product by ID
router.put("/edit/:id", upload.single("image"), async (req, res) => {
  const { name, category, price, description, sizes } = req.body;
  try {
    let updatedProductData = {
      name,
      category,
      price,
      description,
      sizes,
    };

    if (req.file) {
      const file = req.file.path;
      const result = await cloudinary.uploader.upload(file, {
        folder: "Product_media",
        resource_type: "image",
      });
      updatedProductData.images = [result.secure_url];
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updatedProductData }, // Update product details
      { new: true } // Return the updated product
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// DELETE a product by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id); // Delete product by ID
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file, {
      folder: "products",
      resource_type: "image",
    });
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed." });
  }
});

// Fetch user orders
router.get("/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products." });
  }
});

module.exports = router;
