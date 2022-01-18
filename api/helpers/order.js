const mongoose = require("mongoose");
const logger = require("../../util/logger");
const order = require("../models/order");
const Order = require("../models/order");

const ProductHelper = require("./product");

class OrderHelper extends ProductHelper {
  constructor() {
    super();
  }

  async saveOrder(order) {
    try {
      const newOrder = new Order({
        _id: mongoose.Types.ObjectId(),
        products: order.products,
      });
      return await newOrder
        .save()
        .then((result) => {
          logger.info("Order saved in database");
          return result;
        })
        .catch((err) => {
          logger.error("Error saving order in database");
          throw err;
        });
    } catch (err) {
      throw err;
    }
  }

  async createOrder(order) {
    try {
      const productIds = order.products.map((product) => product.productId);
      return await this.countProducts(productIds)
        .then((count) => {
          logger.info("Product(s) found");
          return this.saveOrder(order);
        })
        .catch((err) => {
          logger.error("Error creating order");
          throw err;
        });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderHelper;
