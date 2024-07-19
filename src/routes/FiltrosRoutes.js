import { Router } from "express";
import { filtrarFiltros, getListProductsWithImagenPrincipal } from "../controllers/filtrosController.js";

const router = Router();

// ...otras rutas

router.get("/filtrar-filtros", filtrarFiltros);
router.get("/listar-productos-imagen-principal", getListProductsWithImagenPrincipal);

export default router;
