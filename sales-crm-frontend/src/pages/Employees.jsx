import React, { useState, useEffect, useCallback } from "react";
import "../styles/employees.css";
import {
  getEmployees,
  deleteEmployee as deleteEmployeeAPI,
  createEmployee,
  updateEmployee
} from "../api/employeeApi";

import AddEmployeeModal from "../components/employees/AddEmployeeModal";

export default function Employees() {
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // 🔥 Fetch employees
  const fetchEmployees = useCallback(async (currentPage = page) => {
  try {
    const data = await getEmployees(currentPage);

    setEmployees(data.employees);
    setTotalPages(data.pages);
    setPage(data.page);

  } catch (err) {
    console.error("Error fetching employees", err);
  }
}, [page]);
  useEffect(() => {
  fetchEmployees(page);
}, [fetchEmployees, page]);

  // 🔥 DELETE employee (FIXED)
  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployeeAPI(id);

      // update UI instantly
      setEmployees(prev =>
        prev.filter(emp => emp._id !== id)
      );

      alert("Employee deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // 🔥 Open modal in edit mode
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // 🔥 CREATE + UPDATE employee
  const handleSaveEmployee = async (employeeData) => {
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee._id, employeeData);
        alert("Employee updated successfully");
      } else {
        await createEmployee(employeeData);
        alert("Employee created successfully");
      }

      setShowModal(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Error saving employee");
    }
  };

  return (
    <div className="employees-page">

      <div className="employees-header">
        <h2>Home <span>&gt;</span> Employees</h2>

        <button
          className="add-btn"
          onClick={() => {
            setSelectedEmployee(null);
            setShowModal(true);
          }}
        >
          + Add Employee
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td><input type="checkbox" /></td>

                <td className="emp-info">
                  <div className="avatar">
                    {emp.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="emp-name">{emp.name}</p>
                    <p className="emp-email">{emp.email}</p>
                  </div>
                </td>

                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>

                <td>
                  <span className={`status ${emp.status?.toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>

                <td className="menu-cell">
                  <button
                    className="dots"
                    onClick={() =>
                      setMenuOpen(menuOpen === emp._id ? null : emp._id)
                    }
                  >
                    ⋮
                  </button>

                  {menuOpen === emp._id && (
                    <div className="menu">
                      <p onClick={() => handleEditClick(emp)}>Edit</p>
                      <p
                        className="delete"
                        onClick={() => handleDeleteEmployee(emp._id)}
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddEmployeeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveEmployee}
        initialData={selectedEmployee}
      />
      <div className="pagination">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    ← Previous
  </button>

  <div className="pages">
    {[...Array(totalPages)].map((_, i) => (
      <span
        key={i}
        className={page === i + 1 ? "active" : ""}
        onClick={() => setPage(i + 1)}
      >
        {i + 1}
      </span>
    ))}
  </div>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next →
  </button>

</div>
    </div>
  );
}