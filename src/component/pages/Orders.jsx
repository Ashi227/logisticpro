import React, { useState } from 'react';
import './Orders.css';
import { Package, User, Calendar, DollarSign, X, CheckCircle2, Clock, Truck, MapPin, PhoneCall } from 'lucide-react';

const ordersData = [
  {
    orderID: "ORD-8821", customer: "TechCorp Industries", date: "2026-04-18",
    items: 12, total: 24580, priority: "High", status: "Pending",
    phone: "+63 912 345 6789", address: "123 Ayala Ave, Makati City, Metro Manila",
    products: [
      { name: "Industrial Bearing Set",   qty: 5, price: 2450 },
      { name: "Steel Cable Spool",        qty: 4, price: 1890 },
      { name: "Safety Valve Kit",         qty: 3, price: 1580 },
    ]
  },
  {
    orderID: "ORD-8820", customer: "Manufacturing Solutions Ltd", date: "2026-04-18",
    items: 8, total: 15200, priority: "Medium", status: "Processing",
    phone: "+63 917 234 5678", address: "456 EDSA, Quezon City, Metro Manila",
    products: [
      { name: "Hydraulic Pump Assembly",  qty: 3, price: 2800 },
      { name: "Electric Motor 5HP",       qty: 5, price: 1640 },
    ]
  },
  {
    orderID: "ORD-8819", customer: "Global Parts Co.", date: "2026-04-17",
    items: 25, total: 42750, priority: "High", status: "Shipped",
    phone: "+63 918 765 4321", address: "789 Bonifacio Global City, Taguig",
    products: [
      { name: "Industrial Bearing Set",   qty: 10, price: 2450 },
      { name: "Hydraulic Pump Assembly",  qty: 8,  price: 2800 },
      { name: "Belt (10m)",               qty: 7,  price: 950  },
    ]
  },
  {
    orderID: "ORD-8818", customer: "Industrial Equipment Inc.", date: "2026-04-17",
    items: 6, total: 8900, priority: "Low", status: "Delivered",
    phone: "+63 920 111 2233", address: "321 Ortigas Ave, Pasig City",
    products: [
      { name: "Safety Valve Kit",         qty: 4, price: 1580 },
      { name: "Steel Cable Spool",        qty: 2, price: 890  },
    ]
  },
  {
    orderID: "ORD-8817", customer: "Automation Systems Group", date: "2026-04-16",
    items: 18, total: 31200, priority: "Medium", status: "Processing",
    phone: "+63 921 444 5566", address: "654 Shaw Blvd, Mandaluyong City",
    products: [
      { name: "Electric Motor 5HP",       qty: 8,  price: 1640 },
      { name: "Pneumatic Cylinder",       qty: 6,  price: 1700 },
      { name: "Industrial Bearing Set",   qty: 4,  price: 2450 },
    ]
  },
  {
    orderID: "ORD-8816", customer: "Heavy Machinery Partners", date: "2026-04-16",
    items: 15, total: 28600, priority: "High", status: "Shipped",
    phone: "+63 922 777 8899", address: "987 Commonwealth Ave, Quezon City",
    products: [
      { name: "Hydraulic Pump Assembly",  qty: 7,  price: 2800 },
      { name: "Belt (10m)",               qty: 8,  price: 950  },
    ]
  },
  {
    orderID: "ORD-8815", customer: "Precision Tools Ltd", date: "2026-04-15",
    items: 10, total: 12450, priority: "Low", status: "Delivered",
    phone: "+63 923 000 1122", address: "147 Taft Ave, Pasay City",
    products: [
      { name: "Safety Valve Kit",         qty: 5,  price: 1580 },
      { name: "Steel Cable Spool",        qty: 3,  price: 890  },
      { name: "Belt (10m)",               qty: 2,  price: 950  },
    ]
  },
];

const TIMELINE_STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

export default function Orders() {
  const [data] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const counts = {
    Pending:    data.filter(o => o.status === "Pending").length,
    Processing: data.filter(o => o.status === "Processing").length,
    Shipped:    data.filter(o => o.status === "Shipped").length,
    Delivered:  data.filter(o => o.status === "Delivered").length,
  };

  return (
    <div className="dashboard">
      <h1>Order Management</h1>
      <p className="subtitle">View and manage customer orders</p>

      {/* STAT CARDS */}
      <div className="order-stats">
        <div className="order-stat-card">
          <div>
            <p className="order-stat-label">Pending</p>
            <h2 className="order-stat-value">{counts.Pending}</h2>
          </div>
          <div className="order-stat-icon pending-icon"><Package size={20} /></div>
        </div>
        <div className="order-stat-card">
          <div>
            <p className="order-stat-label">Processing</p>
            <h2 className="order-stat-value">{counts.Processing}</h2>
          </div>
          <div className="order-stat-icon processing-icon"><Package size={20} /></div>
        </div>
        <div className="order-stat-card">
          <div>
            <p className="order-stat-label">Shipped</p>
            <h2 className="order-stat-value">{counts.Shipped}</h2>
          </div>
          <div className="order-stat-icon shipped-icon"><Package size={20} /></div>
        </div>
        <div className="order-stat-card">
          <div>
            <p className="order-stat-label">Delivered</p>
            <h2 className="order-stat-value">{counts.Delivered}</h2>
          </div>
          <div className="order-stat-icon delivered-icon"><Package size={20} /></div>
        </div>
      </div>

      {/* TABLE */}
      <div className="border">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.orderID}>
                <td className="order-id">{item.orderID}</td>
                <td><span className="customer-cell"><User size={13} className="cell-icon" /> {item.customer}</span></td>
                <td><span className="date-cell"><Calendar size={13} className="cell-icon" /> {item.date}</span></td>
                <td>{item.items} items</td>
                <td><span className="total-cell"><DollarSign size={13} className="cell-icon" /> {item.total.toLocaleString()}</span></td>
                <td><span className={`priority priority-${item.priority.toLowerCase()}`}>{item.priority}</span></td>
                <td><span className={`order-status status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                <td>
                  <button className="btn-view-details" onClick={() => setSelectedOrder(item)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={e => e.stopPropagation()}>

            {/* MODAL HEADER */}
            <div className="order-modal-header">
              <div>
                <h2>{selectedOrder.orderID}</h2>
                <p className="order-modal-date">Placed on {selectedOrder.date}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedOrder(null)}>
                <X size={18} />
              </button>
            </div>

            {/* TIMELINE */}
            <div className="order-timeline">
              {TIMELINE_STEPS.map((step, i) => {
                const currentIndex = TIMELINE_STEPS.indexOf(selectedOrder.status);
                const isDone = i <= currentIndex;
                const isActive = i === currentIndex;
                return (
                  <React.Fragment key={step}>
                    <div className="timeline-step">
                      <div className={`timeline-circle ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                        {isDone ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      </div>
                      <span className={`timeline-label ${isDone ? 'done' : ''}`}>{step}</span>
                    </div>
                    {i < TIMELINE_STEPS.length - 1 && (
                      <div className={`timeline-line ${i < currentIndex ? 'done' : ''}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="order-modal-body">

              {/* CUSTOMER INFO */}
              <div className="order-modal-section">
                <h3>Customer Information</h3>
                <div className="customer-info-grid">
                  <div className="customer-info-item">
                    <User size={14} className="info-icon" />
                    <div>
                      <p className="info-label">Customer</p>
                      <p className="info-value">{selectedOrder.customer}</p>
                    </div>
                  </div>
                  <div className="customer-info-item">
                    <PhoneCall size={14} className="info-icon" />
                    <div>
                      <p className="info-label">Phone</p>
                      <p className="info-value">{selectedOrder.phone}</p>
                    </div>
                  </div>
                  <div className="customer-info-item" style={{ gridColumn: '1/-1' }}>
                    <MapPin size={14} className="info-icon" />
                    <div>
                      <p className="info-label">Shipping Address</p>
                      <p className="info-value">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ITEMS BREAKDOWN */}
              <div className="order-modal-section">
                <h3>Items Breakdown</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((p, i) => (
                      <tr key={i}>
                        <td>{p.name}</td>
                        <td>{p.qty}</td>
                        <td>₱{p.price.toLocaleString()}</td>
                        <td>₱{(p.qty * p.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="total-label">Total</td>
                      <td className="total-value">₱{selectedOrder.total.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}