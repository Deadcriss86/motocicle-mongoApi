import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isadmin.middleware.js";
import {
  editPedido,
  GetPedido,
  GetAllPedidos,
  NewPedido,
  deletePedido,
} from "../controllers/pedidos.controller.js";

const router = Router();

router.get("/pedido", authenticateToken, GetPedido);
router.get("/pedidos", GetAllPedidos);
router.put("/pedidos/:id", authenticateToken, isAdmin, editPedido);
router.post("/newpedido", authenticateToken, NewPedido);
router.delete("/pedido/:id", deletePedido);

export default router;
