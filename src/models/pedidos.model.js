import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
  productos: [
    {
      producto: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
    },
  ],
  detalles_envio: {
    type: String,
  },
  numero_guia: { type: String },
  status_producto: { type: String },
  total: { type: Number, required: true },
});

const Pedido = mongoose.model("Pedido", PedidoSchema);

export default Pedido;
