import { Router } from "express";
import {
  getHistorialMembresiaByUserId,
  addNewHistorialMembresia,
  deleteHistorialMembresiaById,
  updateHistorialMembresiaById,
  getTodasHistorialMembresiasByUsuarioID
} from "../controllers/historialMembresias.controller";

const router = Router();

router.get("/historial-membresias/:id", getHistorialMembresiaByUserId);
router.get("/mi-historial-membresias/:id", getTodasHistorialMembresiasByUsuarioID);
// router.get("/detalle-historial-membresia/:id", getTodasHistorialMembresiasByUsuarioID);
router.post("/historial-membresias", addNewHistorialMembresia);
router.delete("/historial-membresias/:id", deleteHistorialMembresiaById);
router.put("/historial-membresias/:id", updateHistorialMembresiaById);

export default router;
