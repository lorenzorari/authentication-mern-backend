require("dotenv").config();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password))
      return res.status(400).send("Email and password are required");

    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).send("This user already exist");

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
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
};

const getMe = async (req, res) => {
  const { user_id } = req.user;

  const user = await User.findOne({ _id: user_id });

  res.status(200).send(`Welcome! ${user.firstName}`);
};

module.exports = { register, login, getMe };
