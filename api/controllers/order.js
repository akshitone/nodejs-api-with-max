const mongoose = require("mongoose");
const logger = require("../../util/logger");

const Order = require("../models/order");
const Product = require("../models/product");
const OrderHelper = require("../helpers/order");

const orderHelper = new OrderHelper();

exports.createOrder = (req, res, next) => {
  orderHelper
    .createOrder(req.body)
    .then((order) => {
      res.status(201).json({
        message: "Order created successfully",
        order: order,
      });
      logger.info("Order created successfully");
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
      logger.error(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find()
    .select("_id products")
    .populate("products.productId", "name price")
    .then((orders) => {
      res.status(200).json({
        count: orders.length,
        orders: orders.map((order) => {
          return {
            _id: order._id,
            productCount: order.products.length,
            products: order.products,
          };
        }),
      });
      logger.info("Orders fetched successfully");
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};

exports.getOrder = (req, res, next) => {
  Order.findById(req.params.id)
    .select("_id products")
    .then((order) => {
      if (!order) {
        res.status(404).json({
          message: "Order not found",
        });
        logger.info("Order not found");
      } else {
        res.status(200).json({
          order: order,
        });
        logger.info("Order fetched successfully");
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};

exports.deleteOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "Order deleted successfully",
        });
        logger.info("Order deleted successfully");
      } else {
        res.status(401).json({
          message: "Order not found",
        });
        logger.info("Order not found");
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};

exports.updateOrder = (req, res, next) => {
  const order = new Order({
    _id: req.body.id,
    products: req.body.products,
  });
  Order.updateOne({ _id: req.params.id }, order)
    .then((result) => {
      if (result.matchedCount > 0) {
        res.status(200).json({
          message: "Order updated successfully",
        });
        logger.info("Order updated successfully");
      } else {
        res.status(401).json({
          message: "Order not found",
        });
        logger.info("Order not found");
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};
