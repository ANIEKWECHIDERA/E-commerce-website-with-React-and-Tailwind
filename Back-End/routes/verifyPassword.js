"use strict";

// Import required modules
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Verify user password route
router.post("/verify-password", async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res
      .status(400)
      .json({ message: "Phone number and password are required." });
  }

  try {
    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Respond with success if password is correct
    res.status(200).json({ message: "Password verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
});

module.exports = router;
