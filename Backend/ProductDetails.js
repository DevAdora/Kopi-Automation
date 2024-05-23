const mongoose = require("mongoose");

const ProductDetailSchema = new mongoose.Schema(
  {
    prodname:  { type: String, unique: true },
    price: Number,
    quantity: Number,
    category: String,
  },
  {
    collection: "product",
  }
);

mongoose.model("product", ProductDetailSchema);
