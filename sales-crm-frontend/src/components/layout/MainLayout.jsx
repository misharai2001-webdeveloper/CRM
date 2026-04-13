import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children, title }) {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="page-container">
          <div className="breadcrumb">Home › {title}</div>
          {children}
        </div>
      </div>
    </div>
  );
}