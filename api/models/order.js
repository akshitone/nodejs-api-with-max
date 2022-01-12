const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1, default: 1 },
    },
  ],
  //   product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  //   quantity: { type: Number, required: true, default: 1, min: 1 },
});

module.exports = mongoose.model("Order", orderSchema);
