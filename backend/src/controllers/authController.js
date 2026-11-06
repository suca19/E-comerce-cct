const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email already registered" });
    }
    console.error("Error registering user: ", err);
    res.status(500).json({ error: "Failed to register user" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const foundUser = await user.findByEmail(email);
    if (!foundUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatches = await bcrypt.compare(
      password,
      foundUser.PasswordHash,
    );
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: foundUser.UserIDs,
        name: foundUser.Name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.json({
      token,
      user: {
        UserIDs: foundUser.UserIDs,
        Name: foundUser.Name,
        Email: foundUser.Email,
      },
    });
  } catch (err) {
    console.error("Error logging: ", err);
    res.status(500).json({ error: "Failed to log in" });
  }
}

function me(req, res) {
  res.json({ user: req.user });
}
module.exports = { register, login, me };
