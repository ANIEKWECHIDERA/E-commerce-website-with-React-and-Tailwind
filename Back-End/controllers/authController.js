"use strict";

// import required files and user object model
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//here implement logic for registering a new user

//first check if the user is already registered by comparing the email

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    //check if email or phone number are already in use
    const existingUser = awaitUSer.findOne({
      $or: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
    });
    if (existingUser) {
      if (email && existingUser.email === email) {
        return response
          .status(400)
          .json({ message: "This email already exists, please try another" });
      }

      if (phoneNumber && existingUser.phoneNumber === phoneNumber) {
        return response.status(400).json({
          message: "This phone number already exists, please try another",
        });
      }

      //creating new user
      const user = new User({ firstName, lastName, phoneNumber, email });
      await user.save();

      //next we have to generate jason web tokens to keep users signed in
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //confirm the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //generate a jason web token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });

    //check if user exists
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
