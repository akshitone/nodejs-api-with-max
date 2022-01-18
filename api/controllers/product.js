const mongoose = require("mongoose");
const logger = require("../../util/logger");

const Product = require("../models/product");
const ProductHelper = require("../helpers/product");

const productHelper = new ProductHelper();

exports.createProduct = (req, res, next) => {
  productHelper
    .createProduct(req.body)
    .then((product) => {
      res.status(201).json(product);
      logger.info("Product created successfully");
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};

exports.getProducts = (req, res, next) => {
  productHelper
    .findProducts()
    .then((products) => {
      res.status(200).json(products);
      logger.info("Products fetched successfully");
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};

exports.getProduct = (req, res, next) => {
  productHelper
    .findProduct(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
        logger.info("Product fetched successfully");
      } else {
        res.status(401).json({ message: "Product not found!" });
        logger.warn("Product not found!");
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
      logger.error(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Product deleted successfully" });
        logger.info("Product deleted successfully");
      } else {
        res.status(401).json({ message: "Product not found!" });
        logger.warn("Product not found!");
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const product = new Product({
    _id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then((result) => {
      logger.info(result);
      if (result.matchedCount > 0) {
        res.status(200).json({
          message: "Product updated successfully",
          updatedProduct: product,
        });
        logger.info("Product updated successfully");
      } else {
        res.status(401).json({ message: "Product not found!" });
        logger.warn("Product not found!");
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};
