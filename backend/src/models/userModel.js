const db = require("../config/db");

async function getAllUsers() {
  const [rows] = await db.query(
    "select UserIDs, Name, Email, CreatedAt from users",
  );
  return rows;
}

async function findByEmail(email) {
  const [rows] = await db.query("select * from users where email = (?)", [
    email,
  ]);

  return rows[0];
}
async function create(name, email, passwordHash) {
  const [result] = await db.query("insert into users (Name, Email, PasswordHash) values (?, ?, ?)", [
    name, email, passwordHash
  ]);

  return { UserIDs: result.insertId, Name: name, Email: email };
}

module.exports = { getAllUsers, findByEmail, create };
