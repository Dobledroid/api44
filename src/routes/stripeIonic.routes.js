import { Router } from "express";
import {
  createPaymentIntent,
  processPayment
} from "../controllers/stripeIonic.controller";

const router = Router();



router.post("/create-payment-intent-ionic", createPaymentIntent);


router.post("/process-payment-ionic", processPayment);

export default router;
