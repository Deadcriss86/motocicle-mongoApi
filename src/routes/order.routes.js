import { Router } from "express";
import {
  GetAllOrders,
  GetOrderById,
  UpdateOrderById,
} from "../controllers/order.controller.js";

const router = Router();

router.get("/orders", GetAllOrders); // Obtener todas las órdenes
router.get("/orders/:id", GetOrderById); // Obtener una orden por ID
router.put("/orders/:id", UpdateOrderById); // Editar una orden por ID

export default router;
