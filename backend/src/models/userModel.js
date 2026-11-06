const db = require("../config/db");

async function getAllUsers() {
  const [rows] = await db.query("select * from users");
  return rows;
}

async function create(name) {
  const [result] = await db.query("insert into users (name) values (?)", [
    name,
  ]);

  return { UserIDs: result.insertId, Name: name };
}

module.exports = { getAllUsers, create };
