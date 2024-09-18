"use strict";

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/admin", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token from Bearer token

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    // Token is valid
    return res.status(200).json({ message: "Token is valid", decoded });
  });
});

module.exports = router;
