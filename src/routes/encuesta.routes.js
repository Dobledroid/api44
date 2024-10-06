import { Router } from "express";
import { 
  getRespuestas, 
  getRespuestasByUsuario, 
  addNewRespuesta, 
  getRespuestaById, 
  deleteRespuestaById, 
  updateRespuestaById 
} from "../controllers/encuesta.controller.js";

const router = Router();

router.get("/respuestas", getRespuestas); // Obtener todas las respuestas
router.get("/respuestas/:id", getRespuestasByUsuario); // Obtener respuestas por ID de usuario
router.post("/respuestas", addNewRespuesta); // Añadir una nueva respuesta
router.get("/respuesta/:id", getRespuestaById); // Obtener una respuesta específica por ID de encuesta
router.delete("/respuesta/:id", deleteRespuestaById); // Eliminar una respuesta por ID de encuesta
router.put("/respuesta/:id", updateRespuestaById); // Actualizar una respuesta por ID de encuesta

export default router;
