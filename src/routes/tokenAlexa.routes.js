import { Router } from "express";
import { 
  getAllTokens, 
  getTokensByUsuario, 
  addNuevoToken, 
  getTokenById, 
  deleteTokenById, 
  updateTokenByUsuario 
} from "../controllers/tokenAlexa.controller.js";

const router = Router();

router.get("/tokensAlexa", getAllTokens);
router.get("/tokensAlexa/usuario/:id", getTokensByUsuario);
router.post("/tokensAlexa", addNuevoToken);
router.get("/tokensAlexa/:id", getTokenById);
router.delete("/tokensAlexa/:id", deleteTokenById);
router.put("/tokensAlexa/usuario/:id", updateTokenByUsuario);

export default router;