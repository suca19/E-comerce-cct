const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api");
const userRoutes = require("./routes/users");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
