import React from "react";

const activities = [
  "Lead assigned to Rahul",
  "Employee Priya created",
  "Lead status updated",
  "New leads uploaded",
  "Lead scheduled",
  "Employee deleted",
  "Lead closed"
];

function RecentActivity() {
  return (
    <div className="activity-box">
      <h3>Recent Activity</h3>

      <div className="activity-list">
        {activities.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;