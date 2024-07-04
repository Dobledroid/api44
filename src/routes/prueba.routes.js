import { Router } from "express";
import { prueba } from "../controllers/prueba.controller";

const router = Router();

router.get("/prueba", prueba);

export default router;
