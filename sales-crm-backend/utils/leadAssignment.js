import Employee from "../models/Employee.js";

export const assignLeadRoundRobin = async (language) => {
  const employees = await Employee.find({ language, status: "Active" })
                                  .sort({ assignedLeads: 1 });

  if (!employees.length) return null;

  const employee = employees[0];

  employee.assignedLeads += 1;
  await employee.save();

  return employee._id;
};