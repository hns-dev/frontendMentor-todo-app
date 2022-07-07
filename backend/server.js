require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  next();
});

// Routes
app.use("/api/todos", todoRoutes);

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
