import { Router } from "express";
import { 
  getFavoritos, 
  getFavoritosByUsuario, 
  addNuevoFavorito, 
  getFavoritoById, 
  deleteFavoritoById, 
  updateFavoritoById,
  isFavorito,
  getCantidadFavoritosByUsuario,
  getFavoritosPorUsuario 
} from "../controllers/favoritos.controller.js";

const router = Router();

router.get("/favoritos", getFavoritos);
router.get("/favoritos/usuario/:id", getFavoritosByUsuario);
router.get("/favoritos/:ID_usuario/:ID_producto", isFavorito);
router.get("/favoritos-cantidad/:ID_usuario", getCantidadFavoritosByUsuario);
router.get("/favoritos-productos/:id", getFavoritosPorUsuario);
router.post("/favoritos", addNuevoFavorito);
router.get("/favorito/:id", getFavoritoById);
router.delete("/favorito/:id", deleteFavoritoById);
router.put("/favorito/:id", updateFavoritoById);


export default router;
