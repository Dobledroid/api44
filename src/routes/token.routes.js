import { Router } from "express";
import {
  getUserTokenById,
  createNewUserToken,
  validateToken,
  updateTokenById
} from "../controllers/token.controller"; // Asegúrate de importar los controladores de usuarios

const router = Router();

router.post("/token", createNewUserToken);

router.get("/token/:id", getUserTokenById);

router.post("/validateToken", validateToken);

router.put("/users/update-token/:id", updateTokenById);

export default router;
