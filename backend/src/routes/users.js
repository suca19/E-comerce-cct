const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /api/users - list all users
router.get("/", (userController.getUsers));

// POST /api/users - create a user
router.post("/", (userController.createUser));

module.exports = router;
