const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
