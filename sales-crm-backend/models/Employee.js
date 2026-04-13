import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    department: String,
    designation: String,
    language: {
      type: String,
      default: "English"
    },
    assignedLeads: {
  type: Number,
  default: 0
},
    status: { type: String, default: "Active" }
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);