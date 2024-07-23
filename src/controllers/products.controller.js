import Product from "../models/products.model.js";

export const GetProducts = async (req, res) => {
  try {
    const productsres = await Product.find();
    res.status(200).json(productsres);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const productId = req.body.id;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};
