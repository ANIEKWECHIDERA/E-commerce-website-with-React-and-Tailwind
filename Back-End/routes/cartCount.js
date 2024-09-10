"use strict";

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// Get cart count from user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    // Fetch user with both cart and cartCount fields
    let user = await User.findById(userId).select("cart cartCount");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Recalculate cartCount if necessary
    if (
      user.cartCount === undefined ||
      user.cartCount !== user.cart.reduce((acc, item) => acc + item.quantity, 0)
    ) {
      user.cartCount = user.cart.reduce((acc, item) => acc + item.quantity, 0);
      await user.save(); // Update the cartCount in the database
    }

    res.json({ count: user.cartCount });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
