import { Router } from "express";
import { GetPedidos, editPedido } from "../controllers/pedidos.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isadmin.middleware";

const router = Router();
router.get("/pedidos", GetPedidos);
router.put("/pedidos/:id", authenticateToken, isAdmin, editPedido);

export default router;
