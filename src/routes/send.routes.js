import { Router } from "express";
import {
  sendMethod,
  confirmarIdentidad
} from "../controllers/send.controlller";

const router = Router();

router.post("/sendMethod", sendMethod);
router.post("/confirmarIdentidad", confirmarIdentidad);

export default router;
