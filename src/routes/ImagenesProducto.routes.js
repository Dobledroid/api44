import { Router } from 'express';
import { addNewImagen, getImagenesByProductoId, deleteImagenById, updateImagenById } from '../controllers/ImagenesProducto.controller.js';

const router = Router();

router.post('/imagenes', addNewImagen);
router.get('/imagenes/:ID_producto', getImagenesByProductoId);
router.delete('/imagenes/:ID_imagen', deleteImagenById);
router.put('/imagenes/:ID_imagen', updateImagenById);

export default router;
