import React, { useState } from 'react';
import './Settings.css';
import { Bell, Shield, Database, Users, Mail } from 'lucide-react';

export default function Settings() {
  const [toggles, setToggles] = useState({
    lowStock: true,
    shipmentUpdates: true,
    orderConfirmations: false,
    twoFactor: true,
    loginAlerts: true,
    dailySummary: true,
    weeklyAnalytics: true,
    monthlyReports: false,
    marketingEmails: false,
  });

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p className="subtitle">Manage your warehouse system preferences</p>

      <div className="settings-grid">

        {/* NOTIFICATIONS */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon blue-icon"><Bell size={18} /></div>
            <h2>Notifications</h2>
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-title">Low Stock Alerts</p>
              <p className="settings-row-sub">Get notified when inventory is low</p>
            </div>
            <Toggle on={toggles.lowStock} onClick={() => toggle('lowStock')} />
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-title">Shipment Updates</p>
              <p className="settings-row-sub">Track shipment status changes</p>
            </div>
            <Toggle on={toggles.shipmentUpdates} onClick={() => toggle('shipmentUpdates')} />
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-title">Order Confirmations</p>
              <p className="settings-row-sub">Email confirmation for new orders</p>
            </div>
            <Toggle on={toggles.orderConfirmations} onClick={() => toggle('orderConfirmations')} />
          </div>
        </div>

        {/* SECURITY */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon purple-icon"><Shield size={18} /></div>
            <h2>Security</h2>
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-title">Two-Factor Authentication</p>
              <p className="settings-row-sub">Add extra security to your account</p>
            </div>
            <Toggle on={toggles.twoFactor} onClick={() => toggle('twoFactor')} />
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row-title">Login Alerts</p>
              <p className="settings-row-sub">Get notified of new logins</p>
            </div>
            <Toggle on={toggles.loginAlerts} onClick={() => toggle('loginAlerts')} />
          </div>
          <div className="settings-row">
            <button className="change-password-btn">Change Password</button>
          </div>
        </div>

        {/* DATA MANAGEMENT */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon green-icon"><Database size={18} /></div>
            <h2>Data Management</h2>
          </div>
          <button className="data-btn">Export All Data</button>
          <button className="data-btn">Import Data</button>
          <button className="data-btn">Backup Database</button>
        </div>

        {/* TEAM MANAGEMENT */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon orange-icon"><Users size={18} /></div>
            <h2>Team Management</h2>
          </div>
          <div className="team-member">
            <div className="team-avatar">WM</div>
            <div>
              <p className="team-name">Warehouse Manager</p>
              <p className="team-email">admin@logistics.com</p>
            </div>
            <span className="team-role">Admin</span>
          </div>
          <button className="invite-btn">Invite Team Member</button>
        </div>

      </div>

      {/* EMAIL PREFERENCES */}
      <div className="settings-card settings-card-full">
        <div className="settings-card-header">
          <div className="settings-icon blue-icon"><Mail size={18} /></div>
          <h2>Email Preferences</h2>
        </div>
        <div className="email-grid">
          <div className="settings-row">
            <p className="settings-row-title">Daily Summary Reports</p>
            <Toggle on={toggles.dailySummary} onClick={() => toggle('dailySummary')} />
          </div>
          <div className="settings-row">
            <p className="settings-row-title">Weekly Analytics</p>
            <Toggle on={toggles.weeklyAnalytics} onClick={() => toggle('weeklyAnalytics')} />
          </div>
          <div className="settings-row">
            <p className="settings-row-title">Monthly Reports</p>
            <Toggle on={toggles.monthlyReports} onClick={() => toggle('monthlyReports')} />
          </div>
          <div className="settings-row">
            <p className="settings-row-title">Marketing Emails</p>
            <Toggle on={toggles.marketingEmails} onClick={() => toggle('marketingEmails')} />
          </div>
        </div>
      </div>

    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <div className={`toggle ${on ? 'toggle-on' : 'toggle-off'}`} onClick={onClick}>
      <div className="toggle-thumb" />
    </div>
  );
}