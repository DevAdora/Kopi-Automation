const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors());

// MongoDB connection
const mongoUrl =
  "mongodb+srv://2rreiyhes:8ZMnihKsIShl5F39@cluster0.4ct5meb.mongodb.net/Kopi";

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database Connection Error:", err));

// User model
require("./UserDetails");
const User = mongoose.model("users");

// Routes
app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

// Login route
app.post("/login-user", async (req, res) => {
  const { username, password } = req.body;

  // Find user by username in the database
  const user = await User.findOne({ username });

  // Check if user exists
  if (!user) {
    return res.status(400).send({ error: "User doesn't exist" });
  }

  if (password === user.password) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET);
    return res
      .status(200)
      .send({ status: "ok", data: token, userType: user.userType });
  } else {
    return res.status(400).send({ error: "Invalid password" });
  }
});

// Additional routes...

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
