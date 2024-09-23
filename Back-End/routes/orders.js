"use strict";

const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Product = require("../models/product");

router.get("/all-orders", async (req, res) => {
  const { orderNumber, status, startDate, endDate } = req.query;

  const filter = {};

  if (orderNumber) {
    filter.orderNumber = { $regex: orderNumber, $options: "i" }; // Case-insensitive search
  }

  if (status) {
    filter.status = status; // Filter by status
  }

  if (startDate || endDate) {
    filter.orderDate = {};
    if (startDate) {
      filter.orderDate.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.orderDate.$lte = new Date(endDate);
    }
  }

  try {
    const orders = await Order.find(filter).populate(false); // Populate as needed
    const ordersWithProductNames = await Promise.all(
      orders.map(async (order) => {
        const itemsWithDetails = await Promise.all(
          order.items.map(async (item) => {
            const product = await Product.findById(item.productId);
            return {
              productName: product ? product.name : "Unknown",
              quantity: item.quantity,
              price: item.price,
              size: item.size,
            };
          })
        );
        return {
          ...order.toObject(),
          items: itemsWithDetails,
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
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const orders = await Order.find({ userId });
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
      isNew: true,
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

router.patch("/patch/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status, isNewOrder: false },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
    console.log(updatedOrder);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the order" });
  }
});

module.exports = router;
