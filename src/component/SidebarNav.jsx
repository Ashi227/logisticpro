import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Truck,
  ClipboardList,
  BarChart3,
  Settings,
  Package
} from "lucide-react";
import "./SidebarNav.css";
import logo from "../asset/logo.png";
export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Inventory", path: "/inventory", icon: Boxes },
    { name: "Shipments", path: "/shipments", icon: Truck },
    { name: "Orders", path: "/orders", icon: ClipboardList },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-box">
          <img src={logo} alt="LogisticsPro Logo" className="logo-img" />
        </div>
        <div>
          <h2 className="company">LogisticsPro</h2>
          <p>Warehouse Management</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`menu-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} strokeWidth={2} className="menu-icon" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="avatar">WM</div>
        <div className="user-info">
          <strong>Warehouse Manager</strong>
          <span>admin@logistics.com</span>
        </div>
      </div>
    </div>
  );
}
