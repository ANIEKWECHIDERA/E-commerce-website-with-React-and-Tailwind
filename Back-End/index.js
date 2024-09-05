"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());

//first connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
