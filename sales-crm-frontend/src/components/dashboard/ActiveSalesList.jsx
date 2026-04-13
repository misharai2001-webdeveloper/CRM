import React from "react";

const users = [
  { name: "Rahul Sharma", id: "EMP01", assigned: 10, closed: 5, status: "Active" },
  { name: "Priya Singh", id: "EMP02", assigned: 8, closed: 3, status: "Active" },
  { name: "Amit Kumar", id: "EMP03", assigned: 6, closed: 2, status: "Inactive" },
];

function ActiveSalesList() {
  return (
    <div className="table-box">
      <h3>Active Sales People</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Assigned Leads</th>
            <th>Closed Leads</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.id}</td>
              <td>{u.assigned}</td>
              <td>{u.closed}</td>
              <td>
                <span className={u.status === "Active" ? "status active" : "status inactive"}>
                  {u.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveSalesList;