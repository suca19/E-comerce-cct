const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/", auth.requireAuth, orderController.createOrder);

module.exports = router;