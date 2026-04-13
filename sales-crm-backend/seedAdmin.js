// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

// Connect to MongoDB
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@canova.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    // Create default admin
    const admin = new User({
      name: "Admin User",
      email: "admin@canova.com",
      password: "Admin@123", // default password
      role: "admin",
    });

    await admin.save();
    console.log("✅ Default admin created");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

start();