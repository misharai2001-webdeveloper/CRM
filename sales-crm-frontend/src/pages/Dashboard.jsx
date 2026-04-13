import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats) return <h2 className="page-heading">Loading Dashboard...</h2>;

  return (
    <div className="dashboard-page">

      {/* PAGE HEADING */}
      <h2 className="page-heading">
        Home <span>›</span> <b>Dashboard</b>
      </h2>

      {/* ===== TOP STATS ===== */}
      <div className="stats-grid">

        <div className="stat-card">
          <p>Total Leads</p>
          <h3>{stats.totalLeads}</h3>
        </div>

        <div className="stat-card">
          <p>Assigned This Week</p>
          <h3>{stats.assignedThisWeek || 0}</h3>
        </div>

        <div className="stat-card">
          <p>Active Salespeople</p>
          <h3>{stats.activeSalespeople || 0}</h3>
        </div>

        <div className="stat-card">
          <p>Conversion Rate</p>
          <h3>{stats.conversionRate || 0}%</h3>
        </div>

      </div>

      {/* ===== ANALYTICS ROW ===== */}
      <div className="analytics-row">

        {/* BAR CHART */}
        <div className="chart-card">
          <h3>Sales Analytics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.sourceStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="activity-card">
          <h3>Leads by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.statusStats}
                dataKey="count"
                nameKey="_id"
                outerRadius={90}
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ===== EMPLOYEE TABLE ===== */}
      <div className="table-card">
        <h3 style={{marginBottom:"15px"}}>Top Employees</h3>
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
            {stats.topEmployees?.map(emp => (
              <tr key={emp._id}>
                <td>
                  <b>{emp.name}</b>
                  <p>{emp.email}</p>
                </td>
                <td>{emp.employeeId}</td>
                <td>{emp.assignedLeads}</td>
                <td>{emp.closedLeads}</td>
                <td className="active">• Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}