import { Router } from "express";
import {
  getDetallesPedidosByIdUser,
  getDetallesPedidoByPedidoID,
  addNewDetallePedido,
  deleteDetallePedidoByID,
  updateDetallePedidoByID,
  getItemsDetallesOrdenByUserID
} from "../controllers/detallesPedido.controller";

const router = Router();

router.get("/detalles-pedido-usuario/:ID_usuario", getDetallesPedidosByIdUser);
router.get("/detalles-pedido/:id", getDetallesPedidoByPedidoID);
router.get("/detalles-pedido-items/:ID_pedido", getItemsDetallesOrdenByUserID);
router.post("/detalles-pedido", addNewDetallePedido);
router.delete("/detalles-pedido/:id", deleteDetallePedidoByID);
router.put("/detalles-pedido/:id", updateDetallePedidoByID);

export default router;
