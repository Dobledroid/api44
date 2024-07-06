import { Router } from "express";
import {
  getSmartwatchUsers,
  createNewSmartwatchUser,
  getSmartwatchUserById,
  updateSmartwatchUserById,
  deleteSmartwatchUserById,
} from "../controllers/SmartwatchUser.controller";

const router = Router();

router.get("/smartwatch-users", getSmartwatchUsers);

router.post("/smartwatch-users", createNewSmartwatchUser);

router.get("/smartwatch-users/:id", getSmartwatchUserById);

router.put("/smartwatch-users/:id", updateSmartwatchUserById);

router.delete("/smartwatch-users/:id", deleteSmartwatchUserById);

export default router;
