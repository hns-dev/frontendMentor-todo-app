require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & Listening for requests");
    });
  })
  .catch((error) => {
    console.log(error);
  });
