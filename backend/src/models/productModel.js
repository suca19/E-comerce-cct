const db = require("../config/db");

async function findAll() {
  const [rows] = await db.query(
    "select ProductID, Name, Description, Price, ImageUrl from products",
  );
  return rows;
}

async function findById(id) {
  const [rows] = await db.query(
    "select ProductID, Name, Description, Price, ImageUrl from products where ProductID = (?)",
    [id],
  );
  return rows[0];
}

module.exports = { findAll, findById };
