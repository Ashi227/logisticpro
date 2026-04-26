import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./component/SidebarNav";

import Login from "./component/pages/Login";
import Dashboard from "./component/pages/Dashboard";
import Inventory from "./component/pages/Inventory";
import Shipments from "./component/pages/Shipments";
import Orders from "./component/pages/Orders";
import Analytics from "./component/pages/Analytics";
import Settings from "./component/pages/Settings";

function Layout() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", background: "#f5f7fb", overflowY: "auto" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}