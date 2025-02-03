const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose"); // Import mongoose

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/guestbook";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory messages (will be replaced with MongoDB later)
const messages = [];

// POST route
app.post("/api/message", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "ursakta meg?" });
  }

  const newMessage = {
    id: messages.length + 1,
    name,
    timestamp: new Date().toLocaleString(), // Add timestamp
  };

  messages.push(newMessage);
  res
    .status(201)
    .json({ message: `Message from ${name} added!`, data: newMessage });
});

// GET route
app.get("/api/messages", (req, res) => {
  res.status(200).json(messages);
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
