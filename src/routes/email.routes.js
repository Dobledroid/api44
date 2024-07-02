import { Router } from "express";
import {
  sendRecoveryEmail,
  envioCorreoAccesoNoBloqueado, 
  envioCorreoCuentaBloqueada,
  envioCorreoInicioSesion
} from "../controllers/email.controller"; // Asegúrate de importar los controladores de usuarios

const router = Router();

router.post("/send-email", sendRecoveryEmail);
router.post("/envio-cuenta-nobloqueada", envioCorreoAccesoNoBloqueado);
router.post("/envio-cuenta-bloqueado", envioCorreoCuentaBloqueada);
router.post("/envio-cuenta-nueva-sesion", envioCorreoInicioSesion);

export default router;
