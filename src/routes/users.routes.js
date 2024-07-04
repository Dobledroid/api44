const passport = require('passport');
import { Router } from "express";
import {
  getUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  getTotalUsers,
  updateUserById,
  getUserByEmail,
  updatePasswordById,
  login,
  validatePassword,
  getUserByEmailOAuth,
  createNewUserOAuth,
  login_skill
} from "../controllers/users.controller"; // Asegúrate de importar los controladores de usuarios
import { authenticateJWT, authorizeAdmin } from '../middleware/authMiddleware';


const router = Router();

router.get("/users", authenticateJWT, getUsers);

router.post("/users", createNewUser);
router.post("/users-oauth", createNewUserOAuth);

router.get("/users/count", authenticateJWT, authorizeAdmin, getTotalUsers);

router.get("/users/:id", getUserById);

router.get("/users/email/:email", getUserByEmail);
router.get("/users/email-oauth/:email", getUserByEmailOAuth);

router.post("/users/login", login);

router.post("/users/login-skill", login_skill);

router.post("/users/validate-password/", authenticateJWT, validatePassword);

router.delete("/users/:id", authenticateJWT, deleteUserById);

router.put("/users/:id", authenticateJWT, updateUserById);

router.put("/users/update-password/:id", updatePasswordById);




export default router;
