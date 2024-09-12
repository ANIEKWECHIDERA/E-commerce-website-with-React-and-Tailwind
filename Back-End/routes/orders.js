"use strict";

const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

// Fetch user order history
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place a new order
router.post("/", async (req, res) => {
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

module.exports = router;
