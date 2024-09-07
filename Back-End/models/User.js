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
        required: true,
        ref: "Product",
      },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number },
      size: { type: String },
    },
  ],
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
