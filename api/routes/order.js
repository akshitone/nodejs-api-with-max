const express = require("express");

const orderController = require("../controllers/order");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/", checkAuth, orderController.getOrders);
router.post("/", checkAuth, orderController.createOrder);
router.get("/:id", checkAuth, orderController.getOrder);
router.patch("/:id", checkAuth, orderController.updateOrder);
router.delete("/:id", checkAuth, orderController.deleteOrder);

module.exports = router;
