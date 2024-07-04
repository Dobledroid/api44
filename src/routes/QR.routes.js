import { Router } from "express";
import { crearQRMembresia } from "../controllers/QR.controller";

const router = Router();

router.post("/generar-qr", crearQRMembresia);

export default router;
