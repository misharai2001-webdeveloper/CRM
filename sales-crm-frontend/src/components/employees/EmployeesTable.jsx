import React, { useState } from "react";
import Pagination from "./Pagination";
import EditEmployeeModal from "./EditEmployeeModal";
import "../../styles/tables.css";

const dummyEmployees = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  name: "Employee " + (i + 1),
  empId: "EMP" + (100 + i),
  assigned: Math.floor(Math.random() * 10),
  closed: Math.floor(Math.random() * 5),
  status: i % 2 ? "Active" : "Inactive"
}));

function EmployeesTable() {
  const [employees, setEmployees] = useState(dummyEmployees);
  const [selected, setSelected] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [page, setPage] = useState(1);

  const perPage = 8;
  const start = (page - 1) * perPage;
  const current = employees.slice(start, start + perPage);

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setEmployees(employees.filter(e => !selected.includes(e.id)));
    setSelected([]);
  };

  return (
    <div className="table-box">

      {selected.length > 0 && (
        <button className="delete-btn" onClick={deleteSelected}>
          Delete Selected ({selected.length})
        </button>
      )}

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Assigned</th>
            <th>Closed</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {current.map(emp => (
            <tr key={emp.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(emp.id)}
                  onChange={() => toggleSelect(emp.id)}
                />
              </td>

              <td>{emp.name}</td>
              <td>{emp.empId}</td>
              <td>{emp.assigned}</td>
              <td>{emp.closed}</td>
              <td>{emp.status}</td>

              <td>
                <button onClick={() => setEditUser(emp)}>Edit</button>
                <button
                  onClick={() =>
                    setEmployees(employees.filter(e => e.id !== emp.id))
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        total={employees.length}
        perPage={perPage}
        page={page}
        setPage={setPage}
      />

      {editUser && (
        <EditEmployeeModal user={editUser} close={() => setEditUser(null)} />
      )}
    </div>
  );
}

export default EmployeesTable;