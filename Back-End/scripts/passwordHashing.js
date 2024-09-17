"use strict";
const bcrypt = require("bcryptjs");

const password = "12345";

const passwordHashing = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

passwordHashing(password);
