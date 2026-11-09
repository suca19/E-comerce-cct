const order = require("../models/orderModel");
const product = require("../models/productModel");

async function createOrder(req, res) {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Your basket is empty" });
  }

  const allValid = items.every(
    (item) =>
      Number.isInteger(item.productId) &&
      item.productId > 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0,
  );
  if (!allValid) {
    return res
      .status(400)
      .json({ error: "Each item needs a valid productId and quantity" });
  }

  const ids = items.map((item) => item.productId);
  if (new Set(ids).size !== ids.length) {
    return res.status(400).json({ error: "Duplicate products in order" });
  }

  try {
    const products = await product.findByIds(ids);
    if (products.length !== ids.length) {
      return res.status(400).json({ error: "One or more products not found" });
    }

    let total = 0;
    const pricedItems = [];

    for (const item of items) {
      const found = products.find((p) => p.ProductID === item.productId);
      pricedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: found.Price,
      });
      total += found.Price * item.quantity;
    }

    total = Math.round(total * 100) / 100;

    const orderId = await order.create(req.user.userId, total, pricedItems);

    res.status(201).json({ orderId, total });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Could not place order" });
  }
}

module.exports = { createOrder };
