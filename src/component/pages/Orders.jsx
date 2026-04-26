import React, { useState } from 'react';
import './Orders.css';
import { Package, User, Calendar, PhilippinePeso } from 'lucide-react';

const ordersData = [
  { orderID: "ORD-8821", customer: "TechCorp Industries",        date: "2026-04-18", items: 12, total: 24580,  priority: "High",   status: "Pending"    },
  { orderID: "ORD-8820", customer: "Manufacturing Solutions Ltd", date: "2026-04-18", items: 8,  total: 15200,  priority: "Medium", status: "Processing" },
  { orderID: "ORD-8819", customer: "Global Parts Co.",            date: "2026-04-17", items: 25, total: 42750,  priority: "High",   status: "Shipped"    },
  { orderID: "ORD-8818", customer: "Industrial Equipment Inc.",   date: "2026-04-17", items: 6,  total: 8900,   priority: "Low",    status: "Delivered"  },
  { orderID: "ORD-8817", customer: "Automation Systems Group",    date: "2026-04-16", items: 18, total: 31200,  priority: "Medium", status: "Processing" },
  { orderID: "ORD-8816", customer: "Heavy Machinery Partners",    date: "2026-04-16", items: 15, total: 28600,  priority: "High",   status: "Shipped"    },
  { orderID: "ORD-8815", customer: "Precision Tools Ltd",         date: "2026-04-15", items: 10, total: 12450,  priority: "Low",    status: "Delivered"  },
];

export default function Orders() {
  const [data] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
                <td>
                  <span className="customer-cell">
                    <User size={13} className="cell-icon" /> {item.customer}
                  </span>
                </td>
                <td>
                  <span className="date-cell">
                    <Calendar size={13} className="cell-icon" /> {item.date}
                  </span>
                </td>
                <td>{item.items} items</td>
                <td>
                  <span className="total-cell">
                    <PhilippinePeso size={13} className="cell-icon" /> {item.total.toLocaleString()}
                  </span>
                </td>
                <td>
                  <span className={`priority priority-${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </span>
                </td>
                <td>
                  <span className={`order-status status-${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="btn-view-details">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>Delete Order</h3>
            <p>Are you sure you want to delete <strong>{selectedOrder}</strong>?</p>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={() => setShowDeleteModal(false)}>Delete</button>
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}