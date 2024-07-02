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
  login_skill
} from "../controllers/users.controller"; // Asegúrate de importar los controladores de usuarios

const router = Router();

router.get("/users", getUsers);

router.post("/users", createNewUser);

router.get("/users/count", getTotalUsers);

router.get("/users/:id", getUserById);

router.get("/users/email/:email", getUserByEmail);

router.post("/users/login", login);

router.post("/users/login-skill", login_skill);

router.delete("/users/:id", deleteUserById);

router.put("/users/:id", updateUserById);

router.put("/users/update-password/:id", updatePasswordById);

export default router;
