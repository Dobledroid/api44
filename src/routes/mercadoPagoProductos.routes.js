import { Router } from "express";
import {
  createOrder,
  receiveWebhook,
} from "../controllers/mercadoPagoProductos.controller";

const router = Router();

router.post("/create-order", createOrder);

router.post("/webhook", receiveWebhook);

router.get("/success", (req, res) => res.send("Success"));

export default router;
