import React, { useState } from "react";
import "../../styles/tables.css";

const dummyLeads = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "Lead " + (i + 1),
  email: "lead@mail.com",
  language: i % 2 ? "English" : "Hindi",
  type: "Cold",
  status: "Ongoing",
  scheduled: ""
}));

function LeadsTable() {
  const [leads, setLeads] = useState(dummyLeads);

  const updateType = (id, type) => {
    setLeads(leads.map(l => l.id === id ? { ...l, type } : l));
  };

  const updateSchedule = (id, date) => {
    setLeads(leads.map(l => l.id === id ? { ...l, scheduled: date } : l));
  };

  return (
    <div className="table-box">
      <h3>Leads List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Language</th>
            <th>Type</th>
            <th>Schedule</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map(lead => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.language}</td>

              <td>
                <select
                  value={lead.type}
                  onChange={e => updateType(lead.id, e.target.value)}
                >
                  <option>Cold</option>
                  <option>Warm</option>
                  <option>Hot</option>
                  <option>Scheduled</option>
                </select>
              </td>

              <td>
                {lead.type === "Scheduled" && (
                  <input
                    type="date"
                    value={lead.scheduled}
                    onChange={e => updateSchedule(lead.id, e.target.value)}
                  />
                )}
              </td>

              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;