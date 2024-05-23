const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema(
  {
    productNames: [String],
    quantities: [Number],
    amount: Number,
  },
  {
    collection: "orders",
  }
);

mongoose.model("orders", OrderDetailSchema);
