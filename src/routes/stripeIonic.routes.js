import { Router } from "express";
import {
  createPaymentIntent,
} from "../controllers/stripeIonic.controller";

const router = Router();


router.post("/create-payment-intent-ionic", createPaymentIntent);

export default router;
