import { Router } from 'express';
import {
  getAllMarcas,
  getMarcaById,
  addNewMarca,
  deleteMarca,
  getTotalMarcas,
  updateMarcaById,
  getMarcasByCategoriaId,
} from '../controllers/marcasProductos.controller';

const router = Router();

router.get('/marcas', getAllMarcas);

router.get('/marcas/:id', getMarcaById);

router.get("/marcasByIdCategoria/:id", getMarcasByCategoriaId);

router.post('/marcas', addNewMarca);

router.delete('/marcas/:IdMarca', deleteMarca);

router.get('/marcas/count', getTotalMarcas);

router.put('/marcas/:IdMarca', updateMarcaById);

export default router;
