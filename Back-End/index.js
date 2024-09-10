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
const profileRoutes = require("./routes/profile");
const cartRoutes = require("./routes/cart");
const productRoute = require("./routes/productRoute");
const cartCountRoute = require("./routes/cartCount");
const deliveryInformationRoute = require("./routes/deliveryInfo");

app.use("/api/products", productRoute);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cartCount", cartCountRoute);
app.use("/api/users", deliveryInformationRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
