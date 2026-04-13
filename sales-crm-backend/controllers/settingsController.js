import Admin from "../models/Admin.js";

// GET ADMIN PROFILE
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findOne().select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ADMIN PROFILE
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    await admin.save();

    res.json({ message: "Profile updated successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};