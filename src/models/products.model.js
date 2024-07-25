import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Suponiendo que tienes un modelo de usuario definido
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  opinion: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  images: String,
  productName: String,
  price: Number,
  stock: Number,
  description: String,
  reviews: {
    type: [reviewSchema],
    default: [], // No es obligatorio, por defecto es un array vacío
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
