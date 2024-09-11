"use strict";

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/:userId/delivery-info", async (req, res) => {
  try {
    const { userId } = req.params;
    const { deliveryInfo } = req.body;

    if (!deliveryInfo || typeof deliveryInfo !== "object") {
      return res.status(400).json({ message: "Invalid information" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { deliveryInfo } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "Delivery information updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:userId/delivery-info", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ deliveryInfo: user.deliveryInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:userId/delivery-info", async (req, res) => {
  const { userId } = req.params;

  try {
    // Define default values
    const noDeliveryInfo = {
      firstName: "No delivery",
      lastName: "info",
      email: "null",
      homeAddress: "null",
      city: "null",
      state: "null",
      mobileNumber: "null",
    };

    // Update the deliveryInfo with default values
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { deliveryInfo: noDeliveryInfo } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Delivery information deleted successfully", user });
  } catch (error) {
    console.error("Error updating delivery info:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
