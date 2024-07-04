import { Router } from "express";
import {
  addNewLogInicioSesion,
  getLogInicioSesionById,
  deleteLogInicioSesionById,
  updateLogInicioSesionById,
  getAllLogsInicioSesion
} from "../controllers/logsInicioSesion.controller";

const router = Router();

router.get("/logsInicioSesion", getAllLogsInicioSesion);
router.post("/logsInicioSesion", addNewLogInicioSesion);
router.get("/logsInicioSesion/:id", getLogInicioSesionById);
router.delete("/logsInicioSesion/:id", deleteLogInicioSesionById);
router.put("/logsInicioSesion/:id", updateLogInicioSesionById);

export default router;
