// overview.js
const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/User");
const Blog = require("../models/blogpost");

router.get("/overview", async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalCustomers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const activeOrders = await Order.countDocuments({
      status: {
        $in: [
          "Order Received",
          "Packing Order",
          "Transporting Order",
          "Pending",
        ],
      },
    });
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

    // You may need a more complex query to get products by category
    const productsByCategory = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const overviewData = {
      totalBlogs,
      totalCustomers,
      totalProducts,
      productsByCategory: productsByCategory.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      totalOrders,
      activeOrders,
      deliveredOrders,
    };

    res.json(overviewData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
