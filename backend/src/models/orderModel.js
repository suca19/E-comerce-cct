const db = require("../config/db");

async function create(userId, total, items) {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();
    const [result] = await conn.query(
      "insert into orders(UserID, Total) values (?, ?)",
      [userId, total],
    );
    const orderId = result.insertId;

    for (const item of items) {
      await conn.query(
        "insert into order_items (OrderId, ProductID, Quantity, Price) values (?, ?, ?, ?)",
        [orderId, item.productId, item.quantity, item.price],
      );
    }

    await conn.commit();
    return orderId;
  } catch (err) {
    await conn.rollback(); // undo everything from this transaction
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = { create };