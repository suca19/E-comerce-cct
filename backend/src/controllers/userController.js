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

async function createUser(req, res) {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({ error: "Name is required" })
    }
    try {
        const newUser = await user.create(name);   
        return res.status(201).json(newUser); 
    } catch (err) {
        console.error("Error creating user: ", err);
        return res.status(500).json({ error: "Could not create user" });
    }
}
module.exports = { getUsers, createUser };
