require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

const auth = require("./middleware/auth");
const usersController = require("./controllers/users");

app.post("/api/register", usersController.register);

app.post("/api/login", usersController.login);

app.post("/api/welcome", auth, (req, res) => {
  res.status(200).send(`Welcome! ${req.user}`);
});

module.exports = app;
