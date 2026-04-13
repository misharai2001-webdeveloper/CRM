import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../styles/layout.css";
import Navbar from "../layout/Navbar";
export default function Layout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="layout">

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${openSidebar ? "show" : ""}`}>
        <Sidebar closeSidebar={() => setOpenSidebar(false)} />
      </div>

      {/* Pages */}
      <main className="content">
  <Navbar />
  <div className="page-content">
    <Outlet />
  </div>
</main>
    </div>
  );
}