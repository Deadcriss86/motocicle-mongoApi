import { Router } from "express";
import { NewProduct } from "../controllers/products.controller.js";

const router = Router();

router.post("/newproduct", NewProduct);

export default router;