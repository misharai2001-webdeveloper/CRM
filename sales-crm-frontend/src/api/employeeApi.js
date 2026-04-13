import API from "./axios";

// GET all employees
export const getEmployees = async (page = 1) => {
  const res = await API.get(`/employees?page=${page}&limit=5`);
  return res.data;
};
// DELETE employee
export const deleteEmployee = async (id) => {
  const res = await API.delete(`/employees/${id}`);
  return res.data;
};

// ⭐ CREATE employee (MAIN STEP)
export const createEmployee = async (employeeData) => {
  const res = await API.post("/employees", employeeData);
  return res.data;
};

export const updateEmployee = async (id, employeeData) => {
  const { data } = await API.put(`/employees/${id}`, employeeData);
  return data;
};