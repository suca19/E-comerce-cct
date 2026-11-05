const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET /api/data  - simple "is the backend up?" message
router.get("/data", (req, res) => {
  res.json({ message: "Hello from Express Backend!", status: "Connected" });
});

// GET /api/health - checks the database connection too
router.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", database: err.message });
  }
});

// GET /api/form?userInput=name
router.get("/form", (req, res) => {
  const { userInput } = req.query;
  if (userInput === "pedro") {
    res.send("Hello, Pedro!");
  } else {
    res.send(`you are not Pedro, you are ${userInput}`);
  }
});

module.exports = router;
