import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";


// GET employees
export const getEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // total employees count
    const total = await Employee.countDocuments();

    // paginated employees
    const employees = await Employee.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      employees,
      total,
      page,
      pages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching employees" });
  }
};
// ⭐ CREATE employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, designation, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name & Email required" });
    }

    const newEmployee = await Employee.create({
      name,
      email,
      phone,
      department,
      designation,
      status
    });

    res.status(201).json({
      message: "Employee created",
      employee: newEmployee
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE employee
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed" });
  }
};