const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Test Route to Create a User
app.get("/test", async (req, res) => {
  try {
    const user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    await user.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
