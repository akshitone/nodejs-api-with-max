const mongoose = require("mongoose");
const logger = require("../../util/logger");
const Product = require("../models/product");

class ProductHelper {
  constructor() {}

  async createProduct(product) {
    try {
      const newProduct = new Product({
        _id: mongoose.Types.ObjectId(),
        name: product.name,
        price: product.price,
      });
      return await newProduct
        .save()
        .then((result) => {
          logger.info("Product created successfully");
          return result;
        })
        .catch((err) => {
          logger.error("Product creation failed");
          throw err;
        });
    } catch (err) {
      logger.error("Product creation failed");
      throw err;
    }
  }

  async findProducts() {
    try {
      const products = await Product.find().select("_id name price");
      logger.info("Products fetched successfully");
      return products;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async findProduct(productId) {
    try {
      const product = await Product.findById(productId).select(
        "_id name price"
      );
      logger.info("Product fetched successfully");
      return product;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async countProducts(productIds) {
    try {
      return await Product.find({ _id: { $in: productIds } })
        .count()
        .then((count) => {
          if (count !== productIds.length) {
            logger.warn("Product id(s) not found");
            throw new Error("Product(s) not found");
          } else {
            logger.info("Product(s) found");
            return count;
          }
        })
        .catch((err) => {
          logger.error("Product(s) fetch failed");
          throw err;
        });
    } catch (err) {
      logger.error("Product(s) fetch failed");
      throw err;
    }
  }

  async deleteProduct(productId) {
    try {
      return await Product.deleteOne({ _id: productId })
        .then((result) => {
          if (result.deletedCount > 0) {
            logger.info("Product deleted successfully");
            return result;
          } else {
            logger.warn("Product not found!");
            throw new Error("Product not found");
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  }

  async updateProduct(productId, product) {
    try {
      const updatedProduct = new Product({
        _id: productId,
        name: product.name,
        price: product.price,
      });
      return await Product.updateOne({ _id: productId }, updatedProduct)
        .then((result) => {
          if (result.matchedCount > 0) {
            logger.info("Product updated successfully");
            return result;
          } else {
            logger.warn("Product not found!");
            throw new Error("Product not found");
          }
        })
        .catch((err) => {
          logger.error("Product update failed");
          throw err;
        });
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  }
}

module.exports = ProductHelper;
