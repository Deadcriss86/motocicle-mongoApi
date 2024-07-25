import { Router } from "express";
import { uploadToS3 } from "../controllers/upload.js";
import multer from "multer";
import Product from "../models/products.model.js";
import {
  GetProducts,
  GetProductById,
  addReview,
} from "../controllers/products.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/newproduct", upload.single("image"), async (req, res) => {
  const { name, price, stock, description, category, subcategory } = req.body;
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  try {
    const result = await uploadToS3(filePath, fileName);

    if (result.success) {
      const newProduct = new Product({
        productName: name,
        price: price,
        stock: stock,
        description: description,
        category: category,
        subcategory: subcategory,
        images: result.location,
      });

      await newProduct.save();

      res.status(200).send({ success: true, product: newProduct });
    } else {
      res
        .status(500)
        .send({ success: false, message: "Error al subir el archivo a S3" });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
      error,
    });
  }
});

router.get("/getproducts", GetProducts);
router.get("/getproduct", GetProductById);
router.post("/products/:productId/reviews", authenticateToken, addReview);

export default router;
