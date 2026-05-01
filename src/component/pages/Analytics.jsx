import React from 'react';
import './Analytics.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie, Cell,
  Legend,
} from "recharts";

import {
  TrendingDown,
  TrendingUp
} from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 125000, cost: 89000 },
  { month: "Feb", revenue: 142000, cost: 95000 },
  { month: "Mar", revenue: 158000, cost: 102000 },
  { month: "Apr", revenue: 175000, cost: 108000 },
  { month: "May", revenue: 168000, cost: 105000 },
  { month: "Jun", revenue: 192000, cost: 120000 }
];

const inventoryData = [
  { category: "Electronics", value: 25 },
  { category: "Mechanical Parts", value: 29 },
  { category: "Other", value: 12 },
  { category: "Safety Equipment", value: 15 },
  { category: "Raw Materials", value: 19 }
];

const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#6b7280", "#f59e0b", "#10b981"];

const inventoryProducts = [
  { rank: 1, name: "Industrial Bearing Set", unit: 1250, revenue: 156250, performance: 100 },
  { rank: 2, name: "Hydraulic Pump Assembly", unit: 890, revenue: 178000, performance: 75 },
  { rank: 3, name: "Electric Motor 5HP", unit: 720, revenue: 144000, performance: 65 },
  { rank: 4, name: "Belt (10m)", unit: 680, revenue: 102000, performance: 50 },
  { rank: 5, name: "Pneumatic Cylinder", unit: 550, revenue: 93500, performance: 35 }
];

const renderPieLabel = ({ cx, cy, midAngle, outerRadius, category, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 40;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} fontSize={12} fill="#6b7280">
      {category} {value}%
    </text>
  );
};

export default function Analytics() {
  return (
    <div className="analytics-page">
      <h1>Analytics & Insights</h1>
      <p className="subtitle">Performance metrics and business intelligence</p>

      {/* STAT CARDS */}
      <div className="cards">
        <div className="card">
          <p className="card-label">Total Revenue (6 months)</p>
          <h2 className="card-value">₱960,000</h2>
          <p className="positive">+18% from last period</p>
        </div>
        <div className="card">
          <p className="card-label">Average Order Value</p>
          <h2 className="card-value">₱22,450</h2>
          <p className="positive">+12% from last period</p>
        </div>
        <div className="card">
          <p className="card-label">Profit Margin</p>
          <h2 className="card-value">38.2%</h2>
          <p className="positive">+2.5% from last period</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts">
        <div className="chart-card">
          <h3>Revenue vs Costs</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#bfdbfe" strokeWidth={2} name="revenue"/>
              <Area type="monotone" dataKey="cost" stroke="#f43f5e" fill="#fecdd3" strokeWidth={2} name="cost" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="legend">
            <div className="legend-item">
              <TrendingUp size={12} strokeWidth={2} color="#3b82f6" />
              <span className="revenue">Revenue</span>
            </div>
            <div className="legend-item">
              <TrendingDown size={12} strokeWidth={2} color="#f43f5e" />
              <span className="cost">Cost</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Inventory by Category</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart margin={{ top: 20, bottom: 40, left: 30, right: 30 }}>
              <Pie
                data={inventoryData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="45%"
                outerRadius={85}
                labelLine={true}
                label={renderPieLabel}
              >
                {inventoryData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOP PRODUCTS TABLE */}
      <div className="table-card">
        <h3>Top Performing Products</h3>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Product Name</th>
              <th>Units Sold</th>
              <th>Revenue</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {inventoryProducts.map(item => (
              <tr key={item.rank}>
                <td><span className="rank-badge">#{item.rank}</span></td>
                <td>{item.name}</td>
                <td>{item.unit.toLocaleString()}</td>
                <td>₱{item.revenue.toLocaleString()}</td>
                <td>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: `${item.performance}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}