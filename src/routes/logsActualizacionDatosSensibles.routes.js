import { Router } from "express";
import {
  addNewLogActualizacionDatosSensibles,
  getLogActualizacionDatosSensiblesById,
  deleteLogActualizacionDatosSensiblesById,
  updateLogActualizacionDatosSensiblesById,
  getAllLogsActualizacionDatosSensibles
} from "../controllers/logsActualizacionDatosSensibles.controller";

const router = Router();

router.get("/logsActualizacionDatosSensibles", getAllLogsActualizacionDatosSensibles);
router.post("/logsActualizacionDatosSensibles", addNewLogActualizacionDatosSensibles);
router.get("/logsActualizacionDatosSensibles/:id", getLogActualizacionDatosSensiblesById);
router.delete("/logsActualizacionDatosSensibles/:id", deleteLogActualizacionDatosSensiblesById);
router.put("/logsActualizacionDatosSensibles/:id", updateLogActualizacionDatosSensiblesById);

export default router;
