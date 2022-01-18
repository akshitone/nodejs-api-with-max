const express = require("express");

const productController = require("../controllers/product");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/", productController.getProducts);
// router.post("/", checkAuth, productController.createProduct);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProduct);
router.patch("/:id", checkAuth, productController.updateProduct);
router.delete("/:id", checkAuth, productController.deleteProduct);

module.exports = router;
