import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isadmin.middleware";
import { editPedido, GetPedidos } from "../controllers/pedidos.controller";

const router = Router();
router.get("/pedidos", GetPedidos);
router.put("/pedidos/:id", authenticateToken, isAdmin, editPedido);

export default router;
