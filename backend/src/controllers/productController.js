const product = require("../models/productModel");

async function getProducts(req, res) {
  try {
    const products = await product.findAll();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products", err);
    res.status(500).json({ error: "Could not fetch products" });
  }
}

async function getProduct(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const foundProduct = await product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(foundProduct);
  } catch (err) {
    console.error("Error feching your product", err);
    res.status(500).json({ error: "Could not fetch your product" });
  }
}

module.exports = { getProducts, getProduct };
