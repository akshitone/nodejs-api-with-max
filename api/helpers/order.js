const mongoose = require("mongoose");
const logger = require("../../util/logger");
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
          return this.saveOrder(order);
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw err;
    }
  }

  async findOrders() {
    try {
      return await Order.find()
        .select("_id products")
        .populate("products.productId", "name price")
        .then((orders) => {
          logger.info("Orders fetched successfully");
          return orders;
        })
        .catch((err) => {
          logger.error("Error fetching orders from database");
          throw err;
        });
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  }

  async findOrder(orderId) {
    try {
      return await Order.findById(orderId)
        .select("_id products")
        .populate("products.productId", "name price")
        .then((order) => {
          if (!order) {
            logger.warn("Order not found");
            throw new Error("Order not found");
          } else {
            logger.info("Order fetched successfully");
            return order;
          }
        })
        .catch((err) => {
          logger.error("Error fetching order from database");
          throw err;
        });
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  }

  async deleteOrder(orderId) {
    try {
      return await Order.deleteOne({ _id: orderId })
        .then((order) => {
          if (order.deletedCount > 0) {
            logger.warn("Order not found");
            throw new Error("Order not found");
          } else {
            logger.info("Order deleted successfully");
            return order;
          }
        })
        .catch((err) => {
          logger.error("Error deleting order from database");
          throw err;
        });
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  }

  async updateOrder(orderId, order) {
    try {
      const updatedorder = new Order({
        _id: orderId,
        products: order.products,
      });
      return await Order.updateOne({ _id: orderId }, updatedorder)
        .then((result) => {
          if (result.matchedCount > 0) {
            logger.info("Order updated successfully");
            return result;
          } else {
            logger.warn("Order not found");
            throw new Error("Order not found");
          }
        })
        .catch((err) => {
          logger.error("Error updating order in database");
          throw err;
        });
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  }
}

module.exports = new OrderHelper();
