const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
