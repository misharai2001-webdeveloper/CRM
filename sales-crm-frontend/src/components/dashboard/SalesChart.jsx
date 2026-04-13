import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", rate: 20 },
  { day: "Tue", rate: 35 },
  { day: "Wed", rate: 30 },
  { day: "Thu", rate: 45 },
  { day: "Fri", rate: 40 },
  { day: "Sat", rate: 55 },
  { day: "Sun", rate: 60 },
];

function SalesChart() {
  return (
    <div className="chart-box">
      <h3>Sales Conversion</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rate" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;