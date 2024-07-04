import { Router } from "express";
import {
  addNewLogInicioSesionOAuth,
  getLogInicioSesionOAuthById,
  deleteLogInicioSesionOAuthById,
  updateLogInicioSesionOAuthById,
  getAllLogsInicioSesionOAuth
} from "../controllers/logsInicioSesionOAuth.controller";

const router = Router();

router.get("/logsInicioSesionOAuth", getAllLogsInicioSesionOAuth);
router.post("/logsInicioSesionOAuth", addNewLogInicioSesionOAuth);
router.get("/logsInicioSesionOAuth/:id", getLogInicioSesionOAuthById);
router.delete("/logsInicioSesionOAuth/:id", deleteLogInicioSesionOAuthById);
router.put("/logsInicioSesionOAuth/:id", updateLogInicioSesionOAuthById);

export default router;
