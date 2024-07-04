import { Router } from "express";
import {
  addItemToCart,
  getItemsByUserID,
  deleteItemByID,
  updateItemQuantityByID,
  getItemsOrderByUserID,
  getTotalItemsByUserID,
  existeUnProductoEnCarritoByUserIDProductID,
  getItemsByID
} from "../controllers/carritoCompras.controller";

const router = Router();

router.post("/carrito-compras", addItemToCart);
router.get("/carrito-compras/:ID_carrito", getItemsByID);
router.get("/carrito-compras-ID-usuario/:ID_usuario", getItemsByUserID);
router.get("/carrito-compras-order/:ID_usuario", getItemsOrderByUserID);
router.get("/carrito-compras-total-usuario/:ID_usuario", getTotalItemsByUserID);
router.get("/carrito-compras-existe-prod/:ID_usuario/:ID_producto", existeUnProductoEnCarritoByUserIDProductID);
router.delete("/carrito-compras/:ID_carrito", deleteItemByID);
router.put("/carrito-compras/:ID_carrito", updateItemQuantityByID);

export default router;
