import { Router } from "express";
import {
  getSmartwatchMetrics,
  createNewSmartwatchMetrics,
  getSmartwatchMetricsById,
  updateSmartwatchMetricsById,
  deleteSmartwatchMetricsById,
  getSmartwatchMetricsByUserId,
} from "../controllers/SmartwatchMetrics.controller"; 

const router = Router();

router.get("/smartwatch-metrics", getSmartwatchMetrics);

router.post("/smartwatch-metrics", createNewSmartwatchMetrics);

router.get("/smartwatch-metrics/:id", getSmartwatchMetricsById);

router.put("/smartwatch-metrics/:id", updateSmartwatchMetricsById);

router.delete("/smartwatch-metrics/:id", deleteSmartwatchMetricsById);

router.get("/smartwatch-metrics/user/:userId", getSmartwatchMetricsByUserId);

export default router;
