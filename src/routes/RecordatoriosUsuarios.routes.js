import { Router } from "express";
import {
  getRecordatoriosUsuarios,
  createNewRecordatorioUsuario,
  getRecordatoriosUsuariosById,
  updateRecordatorioUsuarioById,
  deleteRecordatorioUsuarioById,
  getAllRecordatoriosByUserId
} from "../controllers/RecordatoriosUsuarios.controller";

const router = Router();

router.get("/recordatorios-usuarios", getRecordatoriosUsuarios);

router.post("/recordatorios-usuarios", createNewRecordatorioUsuario);

router.get("/recordatorios-usuarios/:id", getRecordatoriosUsuariosById);

router.get("/recordatorios-usuarios/user/:id", getAllRecordatoriosByUserId);

router.put("/recordatorios-usuarios/:id", updateRecordatorioUsuarioById);

router.delete("/recordatorios-usuarios/:id", deleteRecordatorioUsuarioById);

export default router;
