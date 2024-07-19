import Pedido from "../models/pedidos.model.js";

export const GetPedido = async (req, res) => {
  try {
    const id_product = req.body;
    const pedido_res = await Pedido.findById(id_product);
    res.status(200).json(pedido_res);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido", error });
  }
};

export const GetAllPedidos = async (req, res) => {
  try {
    const allpedidos = await Pedido.find();
    res.status(200).json(allpedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido", error });
  }
};

export const editPedido = async (req, res) => {
  const { id } = req.params;
  const { detalles_envio, numero_guia, status_producto } = req.body;

  try {
    const updatedPedido = await Pedido.findByIdAndUpdate(
      id,
      { detalles_envio, numero_guia, status_producto },
      { new: true }
    );

    if (!updatedPedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json({
      message: "Pedido actualizado con éxito",
      pedido: updatedPedido,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};

export const NewPedido = async (req, res) => {
  try {
    const newpedido = new Pedido({
      ...req.body,
      author: req.user._id,
      username_author: req.user.username,
    });
    const pedidosave = await newpedido.save();
    res.status(201).json(pedidosave);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar el pedido", error });
  }
};
