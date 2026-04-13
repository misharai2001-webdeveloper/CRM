import express from "express";
import multer from "multer";
import { uploadLeadsCSV } from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.memoryStorage(); // ⭐ important
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadLeadsCSV);

export default router;