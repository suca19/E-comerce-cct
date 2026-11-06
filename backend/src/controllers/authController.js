const user = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }
  try {
    const salRounds = 10;
    const hashedPassword = await bcrypt.hash(password, salRounds);
    const newUser = await user.create(name, email, hashedPassword);

    res.status(201).json(newUser);
  } catch (err) {
    if(err.code === "ER_DUP_ENTRY"){
      return res.status(409).json({ error: "Email already registered"});
    }
    console.error("Error registering user: ", err);
    res.status(500).json({ error: "Failed to register user" });
  }
}
module.exports = { register };
