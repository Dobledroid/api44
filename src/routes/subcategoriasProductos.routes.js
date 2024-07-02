import { Router } from "express";
import {
  getAllSubcategoriasProductos,
  getSubcategoriaProductoById,
  addNewSubcategoriaProducto,
  deleteSubcategoriaProductoById,
  getTotalSubcategoriasProductos,
  updateSubcategoriaProductoById,
  getSubcategoriasByCategoriaId,
} from "../controllers/subcategoriasProductos.controlller";

const router = Router();

router.get("/subcategorias", getAllSubcategoriasProductos);

router.get("/subcategorias/:id", getSubcategoriaProductoById);

router.get("/subcategoriasByIDCategoria/:id", getSubcategoriasByCategoriaId);

router.post("/subcategorias", addNewSubcategoriaProducto);

router.delete("/subcategorias/:id", deleteSubcategoriaProductoById);

router.get("/subcategorias/count", getTotalSubcategoriasProductos);

router.put("/subcategorias/:id", updateSubcategoriaProductoById);

export default router;
