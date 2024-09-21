"use strict";

const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Product = require("../models/product");

router.get("/all-orders", async (req, res) => {
  try {
    const orders = await Order.find({}).populate(false); //
    const ordersWithProductNames = await Promise.all(
      orders.map(async (order) => {
        const itemsWithDetails = await Promise.all(
          order.items.map(async (item) => {
            const product = await Product.findById(item.productId); // Fetch product by ID
            return {
              productName: product ? product.name : "Unknown", // Use product name or a default value
              quantity: item.quantity,
              price: item.price,
              size: item.size,
            };
          })
        );
        return {
          ...order.toObject(),
          items: itemsWithDetails, // Replace items with detailed items
        };
      })
    );
    res.json(ordersWithProductNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Fetch user order history
router.get("/:userId", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//fetch all orders

// Place a new order
router.post("/", auth, async (req, res) => {
  const { userId, totalPaid, paymentMethod, deliveryAddress, items } = req.body;
  try {
    const newOrder = new Order({
      userId,
      totalPaid,
      paymentMethod,
      deliveryAddress,
      items,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete order by order_id
router.delete("/delete/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(order_id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
