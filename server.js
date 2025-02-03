const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

const mongoURI = "mongodb://localhost:27017/guestbook";

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Define Mongoose Schema and Model
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post("/api/message", async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res
      .status(400)
      .json({ message: "Both name and message are required." });
  }

  try {
    const newMessage = new Message({ name, message });
    await newMessage.save();
    res
      .status(201)
      .json({ message: `Message from ${name} added!`, data: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
