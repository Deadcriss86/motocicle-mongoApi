const mongoose = require("mongoose");

const productScheam = new mongoose.Schema({
  category: String,
  subcategory: String,
  images: String,
  productName: String,
  price: Number,
  stock: Number,
  description: String,
});

const Products = mongoose.model("Products", productScheam);

module.exports = Products;
