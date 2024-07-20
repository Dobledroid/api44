import { Router } from "express";
import { 
    getResenas, 
    getResenasByProducto, 
    addNewResena, 
    getResenaById, 
    deleteResenaById, 
    updateResenaById 
} from "../controllers/reseñas.controller.js";

const router = Router();

router.get("/resenas", getResenas);
router.get("/resenas/:id", getResenasByProducto);
router.post("/resenas", addNewResena);
router.get("/resena/:id", getResenaById);
router.delete("/resena/:id", deleteResenaById);
router.put("/resena/:id", updateResenaById);

export default router;
