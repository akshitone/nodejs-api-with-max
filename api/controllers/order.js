const orderHelper = require("../helpers/order");

exports.createOrder = (req, res, next) => {
  orderHelper
    .createOrder(req.body)
    .then((order) => {
      res.status(201).json({
        message: "Order created successfully",
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getOrders = (req, res, next) => {
  orderHelper
    .findOrders()
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
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getOrder = (req, res, next) => {
  orderHelper
    .findOrder(req.params.id)
    .then((order) => {
      if (order) {
        res.status(200).json({
          order: order,
        });
      } else {
        res.status(401).json({
          message: "Order not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.deleteOrder = (req, res, next) => {
  orderHelper
    .deleteOrder(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Order deleted successfully",
        });
      } else {
        res.status(401).json({
          message: "Order not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.updateOrder = (req, res, next) => {
  orderHelper
    .updateOrder(req.params.id, req.body)
    .then((order) => {
      if (order) {
        res.status(200).json({
          message: "Order updated successfully",
        });
      } else {
        res.status(401).json({
          message: "Order not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};
