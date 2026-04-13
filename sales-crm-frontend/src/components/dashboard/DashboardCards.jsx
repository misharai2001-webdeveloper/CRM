import React from "react";

function Card({ title, value }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

function DashboardCards() {
  return (
    <div className="cards">

      <Card title="Unassigned Leads" value="24" />
      <Card title="Assigned This Week" value="58" />
      <Card title="Active Sales People" value="12" />
      <Card title="Conversion Rate" value="32%" />

    </div>
  );
}

export default DashboardCards;