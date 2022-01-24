const ProductHelper = require("../helpers/product");
const ApiError = require("../../util/errors/ApiError");

const productHelper = new ProductHelper();

exports.createProduct = (req, res, next) => {
  productHelper
    .createProduct(req.body)
    .then((product) => {
      res.status(201).json({
        message: "Product created successfully",
        product: product,
      });
    })
    .catch((err) => {
      console.log("Getting error");
      next(ApiError.badRequest(err.message));
      return;
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
      next(ApiError.badRequest(err.message));
    });
};

exports.getProduct = (req, res, next) => {
  productHelper
    .findProduct(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        next(ApiError.notFound("Product not found"));
      }
    })
    .catch((err) => {
      next(ApiError.badRequest(err.message));
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
