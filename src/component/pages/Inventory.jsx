import React, { useState } from 'react';
import './Inventory.css';

const inventoryData = [
  { sku: "SKU-1001", name: "Industrial Bearing Set", category: "Mechanical Parts", stock: 500, qty: 1250, location: "Aisle A-12", status: "in stock" },
  { sku: "SKU-1002", name: "Hydraulic Pump Assembly", category: "Hydraulics", stock: 200, qty: 340, location: "Aisle B-05", status: "in stock" },
  { sku: "SKU-1003", name: "Steel Cable Spool", category: "Raw Materials", stock: 100, qty: 85, location: "Aisle C-18", status: "low stock" },
  { sku: "SKU-1004", name: "Electric Motor 5HP", category: "Electronics", stock: 300, qty: 620, location: "Aisle D-22", status: "in stock" },
  { sku: "SKU-1005", name: "Safety Valve Kit", category: "Safety Equipment", stock: 150, qty: 42, location: "Aisle A-08", status: "critical" }
];

export default function InventorySearch() {
  const [data, setData] = useState(inventoryData);
  const [search, setSearch] = useState("");
 
  const [editingSku, setEditingSku] = useState(null);
 
  const [newQty, setNewQty] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newLocation, setNewLocation] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSku, setSelectedSku] = useState(null);
 
  const [newItem, setNewItem] = useState({
    sku: "", name: "", category: "", qty: "", stock: "", location: ""
  });

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const getStatus = (qty, stock) => {
    if (qty <= stock * 0.25) return "critical";
    if (qty < stock * 0.8) return "low stock";
    return "in stock";
  };

  const handleAdd = () => {
    const item = {
      ...newItem,
      qty: Number(newItem.qty),
      stock: Number(newItem.stock),
      status: getStatus(Number(newItem.qty), Number(newItem.stock))
    };
    setData(prev => [...prev, item]);
    setNewItem({ sku: "", name: "", category: "", qty: "", stock: "", location: "" });
    setShowModal(false);
  };

  const handleDelete = () => {
    setData(prev => prev.filter(item => item.sku !== selectedSku));
    setShowDeleteModal(false);
    setSelectedSku(null);
  };

  return (
    <div className="dashboard">
      <h1>Inventory Management</h1>
      <p className="subtitle">Track and manage warehouse inventory levels in real-time.</p>

      <div className="border">

        {/* SEARCH + ADD */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Item
          </button>
        </div>

        {/* TABLE */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Min Stock</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>

                <td>
                  {editingSku === item.sku ? (
                    <input className="qty-input" type="number" value={newQty}
                      onChange={e => setNewQty(e.target.value)} />
                  ) : item.qty}
                </td>

                <td>
                  {editingSku === item.sku ? (
                    <input className="stock-input" type="number" value={newStock}
                      onChange={e => setNewStock(e.target.value)} />
                  ) : item.stock}
                </td>

                <td>
                  {editingSku === item.sku ? (
                    <input className="location-input" type="text" value={newLocation}
                      onChange={e => setNewLocation(e.target.value)} />
                  ) : item.location}
                </td>

                <td>
                  <span className={`status ${item.status.replace(" ", "-")}`}>
                    {item.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    {editingSku === item.sku ? (
                      <>
                        <button className="btn btn-success" onClick={() => {
                          setData(prev => prev.map(p =>
                            p.sku === item.sku
                              ? { ...p, qty: Number(newQty), stock: Number(newStock), location: newLocation, status: getStatus(Number(newQty), Number(newStock)) }
                              : p
                          ));
                          setEditingSku(null);
                        }}>Save</button>
                        <button className="btn btn-secondary" onClick={() => setEditingSku(null)}>Cancel</button>
                      </>
                    ) : (
                      <button className="btn btn-primary" onClick={() => {
                        setEditingSku(item.sku);
                        setNewQty(item.qty);
                        setNewStock(item.stock);
                        setNewLocation(item.location);
                      }}>Edit</button>
                    )}
                    <button className="btn btn-danger" onClick={() => {
                      setSelectedSku(item.sku);
                      setShowDeleteModal(true);
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ADD MODAL */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add Inventory Item</h3>
              <input placeholder="SKU" value={newItem.sku} onChange={e => setNewItem({ ...newItem, sku: e.target.value })} />
              <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
              <input placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
              <input type="number" placeholder="Quantity" value={newItem.qty} onChange={e => setNewItem({ ...newItem, qty: e.target.value })} />
              <input type="number" placeholder="Min Stock" value={newItem.stock} onChange={e => setNewItem({ ...newItem, stock: e.target.value })} />
              <input placeholder="Location" value={newItem.location} onChange={e => setNewItem({ ...newItem, location: e.target.value })} />
              <div className="modal-actions">
                <button className="btn btn-success" onClick={handleAdd}>Add</button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal delete-modal">
              <h3>Delete Item</h3>
              <p>Are you sure you want to delete <strong>{selectedSku}</strong>?</p>
              <div className="modal-actions">
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}