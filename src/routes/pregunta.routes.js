import { Router } from "express";
import {getPreguntas,getPreguntaByIdUser,insertarPregunta,buscarPregunta} from "../controllers/pregunta.controller.js";
const router = Router();
router.get("/pregunta", getPreguntas);
router.get("/pregunta/:id", getPreguntaByIdUser);
router.post("/pregunta", insertarPregunta);
router.post("/pregunta/buscar", buscarPregunta); // Ruta para buscar una pregunta
export default router;