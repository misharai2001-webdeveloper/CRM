import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Leads from "./pages/Leads";
import Settings from "./pages/Settings";
import RoleRoute from "./components/RoleRoute";



function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Redirect root to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Admin only */}
          <Route
            path="dashboard"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <Dashboard />
              </RoleRoute>
            }
          />
          <Route
            path="settings"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <Settings />
              </RoleRoute>
            }
          />

          {/* Admin + Employee */}
          <Route
            path="employees"
            element={
              <RoleRoute allowedRoles={["admin", "employee"]}>
                <Employees />
              </RoleRoute>
            }
          />
          <Route
            path="leads"
            element={
              <RoleRoute allowedRoles={["admin", "employee"]}>
                <Leads />
              </RoleRoute>
            }
          />

          {/* Catch-all: redirect to employees if route not found */}
          <Route path="*" element={<Navigate to="employees" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;