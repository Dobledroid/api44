import { Router } from "express";
import {
  addNewRol,
  getRolById,
  deleteRolById,
  updateRolById,
} from "../controllers/roles.controller";

const router = Router();

router.post("/roles", addNewRol);
router.get("/roles/:id", getRolById);
router.delete("/roles/:id", deleteRolById);
router.put("/roles/:id", updateRolById);

export default router;
