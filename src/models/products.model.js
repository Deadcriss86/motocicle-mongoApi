import mongoose from "mongoose";

const productScheam = new mongoose.Schema({
  category: String,
  subcategory: String,
  images: String,
  productName: String,
  price: Number,
  stock: Number,
  description: String,
});

const Product = mongoose.model("Products", productScheam);

export default Product;
