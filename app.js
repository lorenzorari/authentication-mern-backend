require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const withAuth = require("./middleware/auth");
const usersController = require("./controllers/users");

app.use(express.json());

app.post("/api/users/register", usersController.register);

app.post("/api/users/login", usersController.login);

app.post("/api/users/me", withAuth, usersController.getMe);

module.exports = app;
