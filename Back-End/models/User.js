"use strict";

//import required dependencies

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//define user schema object

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  cart: [
    {
      productId: {
        type: String,
        required: false,
        ref: "Product",
      },
      quantity: { type: Number, required: false, default: 1 },
      price: { type: Number },
      size: { type: String },
    },
  ],
  cartCount: { type: Number, default: 0 },
  deliveryInfo: {
    firstName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    homeAddress: {
      type: String,
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
    state: {
      type: String,
      required: false,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: false,
      trim: true,
    },
  },
});

//hashing the pass word to ensure security

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
