import { Router } from "express";
import { GetPedidos, EditPedidos } from "../controllers/pedidos.controller";

const router = Router();
router.get("/pedidos", GetPedidos);
router.put("/pedidos", EditPedidos);

export default router;
