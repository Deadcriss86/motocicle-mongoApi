import mongoose from "mongoose";
import { setFechaDeEnvio } from "../middlewares/setFechaDeEnvio.js";

const OrderSchema = new mongoose.Schema({
  items: [
    {
      product_name: { type: String, required: true },
      amount: { type: Number, required: true },
      cantidad: { type: Number, required: true },
      itemId: { type: String, required: true },
    },
  ],
  orderId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  numero_guia: { type: String },
  paqueteria: { type: String },
  fecha_de_envio: { type: Date },
  total: { type: Number },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username_author: { type: String },
});

// Uso del middleware para ajustar la fecha antes de guardar
OrderSchema.pre("save", setFechaDeEnvio);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
