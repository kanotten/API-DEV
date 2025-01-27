const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// GET request
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// POST request
app.post("/api/submit", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required!" });
  }
  res.json({ success: true, message: `Form submitted by ${name}` });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
