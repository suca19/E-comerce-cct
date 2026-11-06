const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET /api/health - checks the database connection too
router.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", database: err.message });
  }
});

module.exports = router;
