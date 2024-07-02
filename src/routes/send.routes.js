import { Router } from "express";
import {
  sendMethod
} from "../controllers/send.controlller";

const router = Router();

router.post("/sendMethod", sendMethod);

export default router;
