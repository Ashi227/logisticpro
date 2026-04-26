import React from "react";
import "./Shipments.css";
import { Truck, Clock, CheckCircle2, MapPin } from "lucide-react";

export default function Shipments() {
  return (
    <div className="shipments-page">
      <h1>Shipment Tracking</h1>
      <p className="subtitle">Monitor all active and recent shipments</p>

      {/* STAT CARDS */}
      <div className="cards">
        <StatCard icon={<Truck size={35} />} title="In Transit" value="2" colorClass="blue" />
        <StatCard icon={<Clock size={35} />} title="Processing" value="2" colorClass="orange" />
        <StatCard icon={<CheckCircle2 size={35} />} title="Delivered Today" value="1" colorClass="green" />
      </div>

      {/* SHIPMENTS */}
      <ShipmentCard
        id="SH-2045"
        carrier="FedEx Freight • FX456789012"
        status="delivered"
        icon={<CheckCircle2 size={18} />}
        progress={100}
        origin="Main Warehouse"
        destination="SPX Express Camanava Hub"
        items={45}
        eta="2026-04-18 14:30"
      />
      <ShipmentCard
        id="SH-2044"
        carrier="UPS Logistics • UP789456123"
        status="in-transit"
        icon={<Truck size={18} />}
        progress={65}
        origin="Main Warehouse"
        destination="Shopee Collection Point - TAÑONG MALABON"
        items={32}
        eta="2026-04-19 10:00"
      />
      <ShipmentCard
        id="SH-2043"
        carrier="DHL Express • DH234567890"
        status="in-transit"
        icon={<Truck size={18} />}
        progress={45}
        origin="Main Warehouse"
        destination="Shopee Xpress Mandaluyong Hub"
        items={28}
        eta="2026-04-20 16:45"
      />
      <ShipmentCard
        id="SH-2042"
        carrier="FedEx Freight • FX890123456"
        status="processing"
        icon={<Clock size={18} />}
        progress={15}
        origin="Main Warehouse"
        destination="Lazada KNG Hub"
        items={28}
        eta="2026-04-20 16:45"
      />
      <ShipmentCard
        id="SH-2041"
        carrier="UPS Logistics • UP345678901"
        status="processing"
        icon={<Clock size={18} />}
        progress={10}
        origin="Main Warehouse"
        destination="LAZADA (LEX) / SHOPEE (SPX) / FLASH DROP OFF / J&T HOME A3M3 Express"
        items={28}
        eta="2026-04-20 16:45"
      />
    </div>
  );
}

function StatCard({ icon, title, value, colorClass }) {
  return (
    <div className={`card stat-card ${colorClass}`}>
      <div className="card-header">
        <div className="icon">{icon}</div>
        <div>
          <p className="stat-card-label">{title}</p>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
}

function ShipmentCard({ id, carrier, status, icon, progress, origin, destination, items, eta }) {
  const statusLabel = status === "in-transit" ? "in transit" : status;

  return (
    <div className="shipment-card">


      <div className="shipment-header">
        <div className="shipment-id-wrap">
          <div className="shipment-icon">{icon}</div>
          <div>
            <h3>
              {id}
              <span className={`status ${status}`}>{statusLabel}</span>
            </h3>
            <p className="shipment-carrier">{carrier}</p>
          </div>
        </div>
        <div className="shipment-eta">
          <div className="shipment-eta-label">ETA</div>
          <div className="shipment-eta-value">{eta}</div>
        </div>
      </div>

      <div className="shipment-info">
        <div>
          <span className="info-label">Origin</span>
          <span className="info-value"><MapPin size={11} /> {origin}</span>
        </div>
        <div>
          <span className="info-label">Destination</span>
          <span className="info-value"><MapPin size={11} /> {destination}</span>
        </div>
        <div>
          <span className="info-label">Items</span>
          <span className="info-value">{items} units</span>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="progress-row">
        <span className="progress-label">Progress</span>
        <span className="progress-pct">{progress}%</span>
      </div>
      <div className={`progress-bar ${status}`}>
        <div style={{ width: `${progress}%` }} />
      </div>

    </div>
  );
}