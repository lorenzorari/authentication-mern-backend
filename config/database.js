require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to database"))
    .catch((err) => {
      console.log("Database connection failed. Exiting now...");
      console.error(err);
      process.exit(1);
    });
};

exports.disconnect = () => {
  mongoose
    .disconnect()
    .then(() => console.log("Succesfully disconnected"))
    .catch((err) => {
      console.log("Disconnection failed");
      console.error(err);
    });
};
