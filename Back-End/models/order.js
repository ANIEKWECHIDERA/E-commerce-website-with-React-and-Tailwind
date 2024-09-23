"use strict";

const mongoose = require("mongoose");
const Counter = require("../models/counter");

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderDate: { type: Date, default: Date.now },
  totalPaid: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      size: { type: String, required: true },
    },
  ],
  isNewOrder: { type: Boolean, default: true },
  status: { type: String, default: "Pending" },
});

// Middleware to generate order number before saving
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "orderNumber" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      const nextSequenceValue = counter.sequence_value;
      this.orderNumber = nextSequenceValue.toString().padStart(6, "0"); // Generate 6-digit order number
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
