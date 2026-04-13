import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import employeeRoutes from "./routes/employeeRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();
connectDB();
import Admin from "./models/Admin.js";

import uploadRoutes from "./routes/uploadRoutes.js";


const createDefaultAdmin = async () => {
  const adminExists = await Admin.findOne();
  if (!adminExists) {
    await Admin.create({});
    console.log("Default Admin Created");
  }
};

createDefaultAdmin();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://crm-q3ca.onrender.com",
      "https://vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/upload", uploadRoutes);

app.use("/api/employees", employeeRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
