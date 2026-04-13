import React from "react";

export default function RoleRoute({ children, allowedRoles }) {
  // ⚠️ TEMP FAKE USER (until login API connected)
  const user = {
    role: "admin"   // change to "employee" to test employee view
  };

  // If no user → allow for now (prevents blank screen)
  if (!user) {
    return children;
  }

  // If role not allowed → show message instead of blank page
  if (!allowedRoles.includes(user.role)) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Access Denied</h2>
        <p>You don’t have permission to view this page.</p>
      </div>
    );
  }

  return children;
}