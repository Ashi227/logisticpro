import React, { useState } from 'react';
import './Settings.css';
import { Bell, Shield, Database, Users, Mail, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

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

  const [members, setMembers] = useState([
    { name: 'Warehouse Manager', email: 'admin@logistics.com', role: 'Admin' }
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Viewer' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const handleInvite = () => {
    if (!newMember.name || !newMember.email || !newMember.role) return;
    setMembers(prev => [...prev, newMember]);
    setNewMember({ name: '', email: '', role: 'Viewer' });
    setShowInviteModal(false);
  };

  const handleChangePassword = () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (passwords.current !== 'admin123') {
      setPasswordError('Current password is incorrect.');
      return;
    }
    if (passwords.newPass.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setPasswordSuccess('Password changed successfully!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswords({ current: '', newPass: '', confirm: '' });
      setPasswordSuccess('');
    }, 1500);
  };

  const handleSignOut = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

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
            <button className="change-password-btn" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </button>
            <button className="sign-out-btn" onClick={() => setShowSignOutModal(true)}>
              Sign Out
            </button>
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
          <div className="team-list">
            {members.map((m, i) => (
              <div className="team-member" key={i}>
                <div className="team-avatar">
                  {m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="team-name">{m.name}</p>
                  <p className="team-email">{m.email}</p>
                </div>
                <span className="team-role">{m.role}</span>
              </div>
            ))}
          </div>
          <button className="invite-btn" onClick={() => setShowInviteModal(true)}>
            Invite Team Member
          </button>
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

      {/* INVITE MODAL */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Invite Team Member</h3>
              <button className="modal-close" onClick={() => setShowInviteModal(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-field">
              <label>Full Name</label>
              <input
                placeholder="Juan dela Cruz"
                value={newMember.name}
                onChange={e => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="juan@logistics.com"
                value={newMember.email}
                onChange={e => setNewMember({ ...newMember, email: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label>Role</label>
              <select
                value={newMember.role}
                onChange={e => setNewMember({ ...newMember, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-modal-primary" onClick={handleInvite}>Send Invite</button>
              <button className="btn-modal-secondary" onClick={() => setShowInviteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => {
                setShowPasswordModal(false);
                setPasswordError('');
                setPasswordSuccess('');
                setPasswords({ current: '', newPass: '', confirm: '' });
              }}>
                <X size={16} />
              </button>
            </div>
            {passwordError && <div className="modal-error">{passwordError}</div>}
            {passwordSuccess && <div className="modal-success">{passwordSuccess}</div>}
            <div className="modal-field">
              <label>Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwords.current}
                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label>New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwords.newPass}
                onChange={e => setPasswords({ ...passwords, newPass: e.target.value })}
              />
            </div>
            <div className="modal-field">
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwords.confirm}
                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-modal-primary" onClick={handleChangePassword}>Update Password</button>
              <button className="btn-modal-secondary" onClick={() => setShowPasswordModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* SIGN OUT MODAL */}
      {showSignOutModal && (
        <div className="modal-overlay">
          <div className="modal modal-sm">
            <div className="modal-header">
              <h3>Sign Out</h3>
              <button className="modal-close" onClick={() => setShowSignOutModal(false)}>
                <X size={16} />
              </button>
            </div>
            <p className="modal-text">Are you sure you want to sign out?</p>
            <div className="modal-actions">
              <button className="btn-modal-danger" onClick={handleSignOut}>Sign Out</button>
              <button className="btn-modal-secondary" onClick={() => setShowSignOutModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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