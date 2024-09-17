"use strict";

const express = require("express");
const {
  registerUser,
  loginUser,
  adminLogin,
} = require("../controllers/authController");
const router = express.Router();

//create account route
router.post("/register", registerUser);
//login route
router.post("/login", loginUser);
//admin login route
router.post("/admin/login", adminLogin);

module.exports = router;
