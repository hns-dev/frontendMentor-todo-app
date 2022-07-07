require("dotenv").config();
const express = require("express");

const app = express();

// Listen to port
app.listen(process.env.PORT, (req, res) => {
  console.log("Listening for requests");
});
