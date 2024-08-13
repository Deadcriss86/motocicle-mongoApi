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

export const addquestion = async (req, res) => {
  const { productId } = req.params;
  const { body } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const newquestion = {
      author: req.user.username,
      body,
    };

    product.questions.push(newquestion);
    await product.save();

    res.status(200).json({ message: "Pregunta añadida con éxito" });
  } catch (error) {
    console.error("Error al agregar la pregunta:", error);
    res.status(500).json({ message: "Error al agregar la pregunta", error });
  }
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

// Eliminar un producto por su ID
export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};
