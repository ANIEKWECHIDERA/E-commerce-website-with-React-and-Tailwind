const mongoose = require("mongoose");
const Product = require("../models/product");

// Function to dynamically import the ES module
const loadProducts = async () => {
  const module = await import(
    "/Users/chide/PycharmProjects/E-commerce website with React and Tailwind/Front-End/src/assets/products.js"
  );
  return module.products;
};

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users_accounts");
    console.log("Database Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const uploadProducts = async () => {
  await connectDB();

  try {
    const products = await loadProducts();
    await Product.insertMany(products);
    // console.log("Products uploaded successfully")
  } catch (error) {
    console.error("Error uploading products:", error);
  } finally {
    mongoose.disconnect();
  }
};

uploadProducts();
