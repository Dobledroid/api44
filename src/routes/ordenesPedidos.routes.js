import { Router } from "express";
import {
  addNewOrdenPedido,
  getOrdenPedidoByUserID,
  getOrdenPedidoByID,
  updateOrdenPedidoByID,
  deleteOrdenPedidoByID,
  existeUnOrdenPedidoByID,
  getDetallesOrdenPetidoByID,getAllOrdenesPedido
} from "../controllers/ordenesPedidos.controller";

const router = Router();
router.get("/orden-pedido/all", getAllOrdenesPedido);

router.post("/orden-pedido", addNewOrdenPedido);
router.get("/orden-pedido/usuario/:ID_usuario", getOrdenPedidoByUserID);
router.get("/orden-pedido-existe/:id", existeUnOrdenPedidoByID);
router.get("/orden-pedido/:ID_pedido", getOrdenPedidoByID);
router.get("/orden-pedido-detalle-pedido/:ID_pedido", getDetallesOrdenPetidoByID);
router.put("/orden-pedido/:ID_pedido", updateOrdenPedidoByID);
router.delete("/orden-pedido/:ID_pedido", deleteOrdenPedidoByID);

export default router;
