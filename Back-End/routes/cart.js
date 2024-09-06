"use strict";

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

//add products to cart
router.post("/add", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    let user = await User.findById(userId);
    let itemIndex = user.cart.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      let productItem = user.cart[itemIndex];
      productItem.quantity += quantity;
      user.cart[itemIndex] = productItem;
    } else {
      user.cart.push({ productId, quantity });
    }
    user = await user.save();
    return res.status(200).send(user.cart);
  } catch (error) {}
});

//get product from cart
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    let user = await User.findById(userId).populate("cart.productId");
    res.status(200).send(user.cart);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//update products in the cart
router.put("/update", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    let user = await User.findById(userId);
    let itemIndex = user.cart.findIndex((p) => p.productId == productId);

    if (itemIndex === -1) {
      return res.status(404).send("Product not found in cart");
    }

    if (quantity <= 0) {
      user.cart.splice(itemIndex, 1); // Remove item from cart
    } else {
      user.cart[itemIndex].quantity = quantity;
    }

    user = await user.save();
    return res.status(200).send(user.cart);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//remove product from cart
router.delete("/remove", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    let user = await User.findById(userId);
    user.cart = user.cart.filter((item) => item.productId != productId);

    user = await user.save();
    return res.status(200).send(user.cart);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
