const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5001;

async function start() {
  try {
    await db.query("SELECT 1");
    console.log("Connected to the MySQL database.");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start();
