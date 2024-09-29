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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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
const ordersRoutes = require("./routes/orders");
const deleteAccountRoute = require("./routes/deleteAccount");
const verifyAccountRoute = require("./routes/verifyPassword");
const checkAdminTokenRoute = require("./routes/checkAdminToken");
const blogRoute = require("./routes/blogpostCRUD");
const overviewRoute = require("./routes/overview");

app.use("/api/products", productRoute);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cartCount", cartCountRoute);
app.use("/api/users", deliveryInformationRoute);
app.use("/api/orders", ordersRoutes);
app.use("/api/", deleteAccountRoute);
app.use("/api/", verifyAccountRoute);
app.use("/api/verify-token", checkAdminTokenRoute);
app.use("/api/", blogRoute);
app.use("/api/", overviewRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
