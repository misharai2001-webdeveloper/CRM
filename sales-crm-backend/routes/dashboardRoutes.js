import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

// ONE route for entire dashboard
router.get("/stats", getDashboardStats);

export default router;