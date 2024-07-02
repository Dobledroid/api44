import { Router } from "express";
import {
  getCategoriasProductos,
  getCategoriaProductoById,
  addNewCategoriaProducto,
  deleteCategoriaProductoById,
  getTotalCategoriasProductos,
  updateCategoriaProductoById,
} from "../controllers/categoriasProductos.controller"; 

const router = Router();

router.get("/categorias-productos", getCategoriasProductos);

router.get("/categorias-productos/count", getTotalCategoriasProductos);

router.get("/categorias-productos/:id", getCategoriaProductoById);

router.post("/categorias-productos", addNewCategoriaProducto);

router.delete("/categorias-productos/:id", deleteCategoriaProductoById);

router.put("/categorias-productos/:id", updateCategoriaProductoById);

export default router;
