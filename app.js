const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const logger = require("./util/logger");

const app = express();

app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

const mongoURL = `mongodb://root:root@172.22.0.2:27017/?authSource=admin`;

mongoose
  .connect(mongoURL)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "A Node.js RESTful API Tutorial Project (Build a simple shop API)",
  });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  logger.error(error.message);
});

module.exports = app;
