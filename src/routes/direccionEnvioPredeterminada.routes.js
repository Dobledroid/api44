import { Router } from "express";
import {
  setDireccionPredeterminada,
  getDireccionPredeterminadaByUserID,
} from "../controllers/direccionEnvioPredeterminada.controller";

const router = Router();

router.post("/direccion-envio-predeterminada", setDireccionPredeterminada);
router.get("/direccion-envio-predeterminada-user/:ID_usuario", getDireccionPredeterminadaByUserID);

export default router;
