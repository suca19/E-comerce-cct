const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from Local Express Backend!", status: "Connected" });
});

app.listen(5001, () => console.log('Backend running locally on http://localhost:5001'));