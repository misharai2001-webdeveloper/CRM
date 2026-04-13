import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },


    language: {
      type: String,
      required: true
    },

    source: {
      type: String,
      default: "Manual"
    },

    status: {
      type: String,
      enum: ["ongoing", "hot", "warm", "cold", "scheduled"],
      default: "ongoing"
    },

    // ⭐ employee reference (VERY IMPORTANT)
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);