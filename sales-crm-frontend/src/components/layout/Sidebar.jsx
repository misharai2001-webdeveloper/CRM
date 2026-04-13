import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

export default function Sidebar({ closeSidebar }) {
  return (
    <aside className="sidebar">

      <div className="logo">
        Canova<span className="logo-blue">CRM</span>
      </div>

      <div className="divider"></div>

      <nav className="menu">
        <NavLink to="/dashboard" onClick={closeSidebar}> Dashboard</NavLink>
        <NavLink to="/leads" onClick={closeSidebar}>Leads</NavLink>
        <NavLink to="/employees" onClick={closeSidebar}>Employees</NavLink>
        <NavLink to="/settings" onClick={closeSidebar}>Settings</NavLink>
      </nav>
    </aside>
  );
}