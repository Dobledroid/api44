import { Router } from "express";
import {
  addNewMembershipType,
  getMembershipTypeById,
  getAllMembershipTypes,
  deleteMembershipTypeById,
  updateMembershipTypeById,
  getMembresiaIdUnico
} from "../controllers/tiposMembresias.controller";

const router = Router();

router.get("/membershipTypes", getAllMembershipTypes);
router.get("/membresiasIdUnico/:ID_UnicoMembresia", getMembresiaIdUnico);
router.post("/membershipTypes", addNewMembershipType);
router.get("/membershipTypes/:id", getMembershipTypeById);
router.delete("/membershipTypes/:id", deleteMembershipTypeById);
router.put("/membershipTypes/:id", updateMembershipTypeById);

export default router;
