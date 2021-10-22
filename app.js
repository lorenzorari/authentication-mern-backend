require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const auth = require("./middleware/auth");
const User = require("./model/user");
const usersController = require("./controllers/users");

app.post("/api/register", usersController.register);

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password))
      return res.status(400).send("All inputs are required");

    const user = await User.findOne({ email });

    if (!user) return res.status(404).send("User not found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      user.token = token;
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/welcome", auth, (req, res) => {
  res.status(200).send(`Welcome! ${req.user}`);
});

module.exports = app;
