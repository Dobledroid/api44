import { Router } from "express";
import {
  getEstadoCuentaByUserId,
  addNewEstadoCuenta,
  deleteEstadoCuentaById,
  updateEstadoCuentaById,
  desbloquearCuenta
} from "../controllers/estadoCuenta.controller"; 

const router = Router();

router.get("/estado-cuenta/:id", getEstadoCuentaByUserId);

router.post("/estado-cuenta", addNewEstadoCuenta);

router.delete("/estado-cuenta/:id", deleteEstadoCuentaById);

router.put("/estado-cuenta/:id", updateEstadoCuentaById);

router.put("/desbloquearcuenta/:ID_estadoCuenta", desbloquearCuenta);

export default router;
