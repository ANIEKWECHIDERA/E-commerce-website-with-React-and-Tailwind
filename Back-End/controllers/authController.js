"use strict";

// Import required modules
const User = require("../models/User"); // Ensure this path matches your directory structure
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !phoneNumber || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email or phone number are already in use
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      if (email && existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "This email already exists, please try another" });
      }

      if (phoneNumber && existingUser.phoneNumber === phoneNumber) {
        return res.status(400).json({
          message: "This phone number already exists, please try another",
        });
      }
    }

    // Create a new user if no existing user was found
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
    await user.save();

    // Generate JSON Web Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during user registration:", error); // Log the error
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    // Validate input
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find the user by email or phone number
    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Confirm the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JSON Web Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during user login:", error); // Log the error
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Authentication Controller
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and Password are required" });
    }

    // Admin credentials
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    // Check if username and password match
    if (username !== adminUsername) {
      return res
        .status(400)
        .json({ message: "Admin username or password incorrect" });
    }

    const isMatch = await bcrypt.compare(password, adminPassword); // Compare hashed password
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Admin username or password incorrect" });
    }

    // If successful, generate a token for the admin session
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
