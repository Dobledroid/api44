import { Router } from "express";
import {
  getEstadoUsuarioByUserId,
  addNewEstadoUsuario,
  deleteEstadoUsuarioById,
  updateEstadoUsuarioById,
} from "../controllers/estadoUsuario.controller";

const router = Router();

router.get("/estado-usuario/:id", getEstadoUsuarioByUserId);
router.post("/estado-usuario", addNewEstadoUsuario);
router.delete("/estado-usuario/:id", deleteEstadoUsuarioById);
router.put("/estado-usuario/:id", updateEstadoUsuarioById);

export default router;
