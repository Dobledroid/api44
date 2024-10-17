import { Router } from "express";
import { handleUserImageUpload, getUserImageById } from "../controllers/cloudinaryIonic.controller";
const multer = require("multer");
const upload = multer({ dest: 'uploads' }); // Directorio temporal para la subida de archivos

const router = Router();

// Ruta para subir la imagen del usuario
router.post("/upload-user-image", upload.single('imagen'), handleUserImageUpload);
router.get("/user-image/:ID_usuario", getUserImageById);

export default router;
