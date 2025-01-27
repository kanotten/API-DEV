const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const messages = []; // Define the messages array here

app.post("/api/message", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "ursakta meg?" });
  }

  messages.push({ id: messages.length + 1, name });
  res.status(201).json({ message: `Message from ${name} added!` });
});

app.get("/api/messages", (req, res) => {
  res.status(200).json(messages);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
