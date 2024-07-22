import { Router } from "express";
import { 
  getAllTokens, 
  getTokensByUsuario, 
  addNuevoToken, 
  getTokenById, 
  deleteTokenById, 
  updateTokenByUsuario,
  validarToken 
} from "../controllers/tokenAlexa.controller.js";

const router = Router();

router.get("/tokensAlexa", getAllTokens);
router.get("/tokensAlexa/usuario/:id", getTokensByUsuario);
router.get("/tokens-validar/:token", validarToken);

router.post("/tokensAlexa", addNuevoToken);
router.get("/tokensAlexa/:id", getTokenById);
router.delete("/tokensAlexa/:id", deleteTokenById);
router.put("/tokensAlexa/usuario/:id", updateTokenByUsuario);

export default router;
