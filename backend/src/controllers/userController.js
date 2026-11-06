const user = require("../models/userModel");

async function getUsers(req, res) {
  try {
    const users = await user.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users: ", err);
    res.status(500).json({ error: "Could not fetch users" });
  }
}

module.exports = { getUsers };
