import React from 'react';
import './Dashboard.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

import {
  BoxIcon,
  Truck,
  AlertTriangle,
  CheckCircle2,

} from "lucide-react";

const weeklyData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 61 },
  { day: "Fri", value: 55 },
  { day: "Sat", value: 38 },
  { day: "Sun", value: 28 }
];

const monthlyData = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 4800 },
  { month: "Mar", value: 5100 },
  { month: "Apr", value: 4900 },
  { month: "May", value: 5600 },
  { month: "Jun", value: 6200 }
];

const StatCard = ({ logo, title, value, change, positive, color }) => (
  <div className="card">
    <div className="card-header">
      <span>{title}</span>
      <div className="icon" style={{ background: color }}>
        {logo}
      </div>
    </div>
    <h2>{value}</h2>
    <p className={positive ? "positive" : "negative"}>
      {change} vs last week
    </p>
  </div>
);

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <p className="subtitle">
        Welcome back! Here's what's happening in your warehouse.
      </p>

      {/* STAT CARDS */}
      <div className="cards">
        <StatCard
          logo={<BoxIcon size={18} strokeWidth={2} />}
          title="Total Inventory"
          value="12,458"
          change="+12%"
          positive
          color="#3b82f6"
        />
        <StatCard
          logo={<Truck size={18} strokeWidth={2} />}
          title="Active Shipments"
          value="89"
          change="+5%"
          positive
          color="#22c55e"
        />
        <StatCard
          logo={<AlertTriangle size={18} strokeWidth={2} />}
          title="Pending Orders"
          value="234"
          change="-8%"
          color="#f97316"
        />
        <StatCard
          logo={<CheckCircle2 size={18} strokeWidth={2} />}
          title="Completed Today"
          value="156"
          change="+23%"
          positive
          color="#a855f7"
        />
      </div>

      {/* CHARTS */}
      <div className="charts">
        <div className="chart-card">
          <h3>Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="activity">
        <h3>Recent Activity</h3>

        <div className="activity-item">
          <span className="dot green" />
          Shipment #SH-2045 delivered
          <small>5 minutes ago</small>
        </div>

        <div className="activity-item">
          <span className="dot orange" />
          Low stock alert: Item #SKU-4521
          <small>12 minutes ago</small>
        </div>

        <div className="activity-item">
          <span className="dot green" />
          New order received #ORD-8821
          <small>25 minutes ago</small>
        </div>

        <div className="activity-item">
          <span className="dot green" />
          Inventory updated: +500 units
          <small>1 hour ago</small>
        </div>

        <div className="activity-item">
          <span className="dot blue" />
          Shipment #SH-2040 in transit
          <small>2 hours ago</small>
        </div>

      </div>
    </div>
  );
}