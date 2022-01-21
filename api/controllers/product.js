const logger = require("../../util/logger");
const ProductHelper = require("../helpers/product");
const Product = require("../models/product");

const productHelper = new ProductHelper();

exports.createProduct = (req, res, next) => {
  console.log(req);
  productHelper
    .createProduct(req.body)
    .then((product) => {
      res.status(201).json({
        message: "Product created successfully",
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getProducts = (req, res, next) => {
  productHelper
    .findProducts()
    .then((products) => {
      res.status(200).json({
        count: products.length,
        products: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getProduct = (req, res, next) => {
  productHelper
    .findProduct(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(401).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  productHelper
    .deleteProduct(req.params.id)
    .then((result) => {
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.updateProduct = (req, res, next) => {
  productHelper
    .updateProduct(req.params.id, req.body)
    .then((result) => {
      res.status(200).json({
        message: "Product updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};
