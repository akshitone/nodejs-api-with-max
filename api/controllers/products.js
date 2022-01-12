const Product = require("../models/products");
const logger = require("../../util/logger");
const mongoose = require("mongoose");

exports.createProduct = (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully",
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          // request: {
          //   type: "GET",
          //   url: `http://localhost:3000/products/${result._id}`,
          // },
        },
      });
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
  Product.find()
    .select("_id name price")
    .then((products) => {
      // const response = {
      //   count: products.length,
      //   products: products.map((product) => {
      //     return {
      //       _id: product._id,
      //       name: product.name,
      //       price: product.price,
      //       request: {
      //         type: "GET",
      //         url: `http://localhost:3000/products/${product._id}`,
      //       },
      //     };
      //   }),
      // };
      // res.status(200).json(response);
      res.status(200).json({ count: products.length, products: products });
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
  Product.findById(req.params.id)
    .select("_id name price")
    .then((product) => {
      if (product) {
        res.status(200).json(product);
        logger.info("Product fetched successfully");
      } else {
        res.status(404).json({ message: "Product not found!" });
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
