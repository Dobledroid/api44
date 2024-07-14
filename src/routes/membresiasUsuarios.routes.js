import { Router } from "express";
import {
  getAllMembresiaUsuarios,
  getMembresiaUsuarioByUserId,
  addNewMembresiaUsuario,
  deleteMembresiaUsuarioById,
  updateMembresiaUsuarioById,
  getMembresiaUsuarioByIDUnicoMembresia,
  existeUnaMembresiaUsuarioByID,
  existeUnaMembresiaUsuarioByIDMembresiaTodo,
  getDetalleMembresiaSkill
} from "../controllers/membresiasUsuarios.controller";

const router = Router();

router.get("/membresia-usuario", getAllMembresiaUsuarios);
router.get("/membresia-usuario/:id", getMembresiaUsuarioByUserId);
router.get("/membresia-usuario-ID-unico-membresia/:ID_UnicoMembresia", getMembresiaUsuarioByIDUnicoMembresia);
router.get("/membresia-usuario-existe/:id", existeUnaMembresiaUsuarioByID);
router.get("/membresia-usuario-existe-id-membresia/:id", existeUnaMembresiaUsuarioByIDMembresiaTodo);
router.get('/membresias-usuarios/detalle/:id', getDetalleMembresiaSkill);

router.post("/membresia-usuario", addNewMembresiaUsuario);
router.delete("/membresia-usuario/:id", deleteMembresiaUsuarioById);
router.put("/membresia-usuario/:id", updateMembresiaUsuarioById);

export default router;
