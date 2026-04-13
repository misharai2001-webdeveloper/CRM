import express from "express";
import { createLead, getLeads } from "../controllers/leadController.js";
import Lead from "../models/Lead.js"; 
const router = express.Router();

router.post("/", createLead);   // ⭐ THIS FIXES YOUR ERROR
router.get("/", getLeads);
// UPDATE SCHEDULE DATE
router.put("/schedule/:id", async (req, res) => {
  try {
    const { scheduledDate } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { scheduledDate },
      { new: true }
    );

    res.status(200).json(updatedLead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating schedule date" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(updatedLead);
  } catch (err) {
    res.status(500).json({ message: "Error updating lead" });
  }
});
export default router;