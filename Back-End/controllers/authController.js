// "use strict";

// // import required files and user object model
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// //here implement logic for registering a new user

// //first check if the user is already registered by comparing the email

// exports.registerUser = async (req, res) => {
//   try {
//     const { firstName, lastName, phoneNumber, email, password } = req.body;

//     //check if email or phone number are already in use
//     const existingUser = await User.findOne({
//       $or: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
//     });

//     if (existingUser) {
//       if (email && existingUser.email === email) {
//         return res
//           .status(400)
//           .json({ message: "This email already exists, please try another" });
//       }

//       if (phoneNumber && existingUser.phoneNumber === phoneNumber) {
//         return res.status(400).json({
//           message: "This phone number already exists, please try another",
//         });
//       }

//       //creating new user
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({
//         firstName,
//         lastName,
//         phoneNumber,
//         email,
//         password: hashedPassword,
//       });
//       await user.save();

//       //next we have to generate jason web tokens to keep users signed in
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });

//       res.status(201).json({ token });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //login user
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, phoneNumber, password } = req.body;
//     const user = await User.findOne({
//       $or: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     //confirm the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     //generate a jason web token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ token });

//     //check if user exists
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

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
