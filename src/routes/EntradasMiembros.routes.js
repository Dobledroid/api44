import { Router } from "express";
import {
  getEntradasMiembros,
  createNewEntradaMiembro,
  getEntradasMiembrosById,
  updateEntradasMiembrosById,
  deleteEntradasMiembrosById,
  getEntradasMiembrosByUsuarioId
} from "../controllers/EntradasMiembros.controller";

const router = Router();

router.get("/entradas-miembros", getEntradasMiembros);

router.post("/entradas-miembros", createNewEntradaMiembro);

router.get("/entradas-miembros/:id", getEntradasMiembrosById);

router.get("/entradas-miembros/usuario/:id", getEntradasMiembrosByUsuarioId);

router.put("/entradas-miembros/:id", updateEntradasMiembrosById);

router.delete("/entradas-miembros/:id", deleteEntradasMiembrosById);

export default router;
