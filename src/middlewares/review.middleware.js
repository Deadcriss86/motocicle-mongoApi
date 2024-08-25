import Product from "../models/products.model";
import Order from "../models/order.model";

export const reviewcheck = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {}
};
