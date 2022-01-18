const mongoose = require("mongoose");
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
          return result;
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw err;
    }
  }

  async findProducts() {
    try {
      const products = await Product.find().select("_id name price");
      return products;
    } catch (err) {
      throw err;
    }
  }

  async findProduct(productId) {
    try {
      const product = await Product.findById(productId).select(
        "_id name price"
      );
      return product;
    } catch (err) {
      throw err;
    }
  }

  async countProducts(productIds) {
    try {
      return await Product.find({ _id: { $in: productIds } })
        .count()
        .then((count) => {
          if (count !== productIds.length) {
            throw new Error("Product(s) not found");
          } else {
            return count;
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductHelper;
