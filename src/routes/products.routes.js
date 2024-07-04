import { Router } from "express";
import { NewProduct } from "../controllers/products.controller.js";
import { uploadToS3 } from "../controllers/upload.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/newproduct", NewProduct);
router.post("/posts3", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  try {
    const result = await uploadToS3(filePath, fileName);

    if (result.success) {
      res.status(200).send(result);
    } else {
      res.status(500).send(result);
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

export default router;
