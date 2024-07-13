import Pedido from "../models/pedidos.model";

export const GetPedidos = async (req, res) => {
  try {
    const id_product = req.body;
    const pedido_res = await Pedido.findById(id_product);
    res.status(200).json(pedido_res);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido", error });
  }
};

export const EditPedidos = async (req, res, next) => {
  try {
  } catch (error) {}
};
