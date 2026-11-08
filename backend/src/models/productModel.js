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

async function findByIds(ids) {
  const [rows] = await db.query(
    "select ProductID, Name, Description, Price, ImageUrl from products where ProductID in (?)",
    [ids],
  );
  return rows;
}
module.exports = { findAll, findById, findByIds };
