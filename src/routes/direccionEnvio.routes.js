import { Router } from "express";
import {
  addNewDireccion,
  getDireccionByID,
  updateDireccionByID,
  deleteDireccionByID,
  getDireccionByUserID
} from "../controllers/direccionEnvio.controller";

const router = Router();

router.post("/direccion-envio", addNewDireccion);
router.get("/direccion-envio/:ID_direccion", getDireccionByID);
router.get("/direccion-envio-user/:ID_usuario", getDireccionByUserID);
router.put("/direccion-envio/:ID_direccion", updateDireccionByID);
router.delete("/direccion-envio/:ID_direccion", deleteDireccionByID);

export default router;
