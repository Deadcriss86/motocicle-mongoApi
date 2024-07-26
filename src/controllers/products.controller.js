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
    const productId = req.query.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

export const addReview = async (req, res) => {
  const { productId } = req.params;
  const { opinion, rating } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const newReview = {
      author: req.user._id,
      username: req.user.username,
      opinion,
      rating,
    };

    product.reviews.push(newReview);

    await product.save();

    res.status(200).json({ message: "Reseña añadida con éxito", product });
  } catch (error) {
    console.error("Error al agregar la reseña:", error);
    res.status(500).json({ message: "Error al agregar la reseña", error });
  }
};
