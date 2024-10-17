import { Router } from "express";
import { handleUserImageUpload, getUserImageById, upload } from "../controllers/cloudinaryIonic.controller";

const router = Router();

// Ruta para subir la imagen del usuario
router.post("/upload-user-image", upload.single('imagen'), handleUserImageUpload);
router.get("/user-image/:ID_usuario", getUserImageById);

export default router;
