import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { LayoutDashboard, Brain, Shield } from 'lucide-react';
import logo from '../../asset/logo.png';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'admin@logistics.com' && password === 'admin123') {
            localStorage.setItem('loggedIn', 'true');
            navigate('/');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="login-page">

            {/* LEFT PANEL */}
            <div className="login-left">
                <div className="login-left-brand">
                    <LogisticsLogo />
                    <span className="login-left-brand-name">LogisticsPro</span>
                    <span className="login-left-brand-tagline">Complete Visibility. Total Control.</span>
                </div>

                <div className="login-left-content">
                    <div className="login-badge">● WAREHOUSE MANAGEMENT</div>
                    <h2 className="login-left-title">Manage your warehouse with confidence.</h2>
                    <p className="login-left-sub">Trusted by warehouse teams to track inventory, shipments, and orders in real-time.</p>
                </div>

                <div className="login-features">
                    <div className="login-feature-item">
                        <div className="login-feature-icon"><LayoutDashboard size={16} /></div>
                        <span>Smart warehouse dashboard</span>
                    </div>
                    <div className="login-feature-item">
                        <div className="login-feature-icon"><Brain size={16} /></div>
                        <span>Real-time inventory insights</span>
                    </div>
                    <div className="login-feature-item">
                        <div className="login-feature-icon"><Shield size={16} /></div>
                        <span>Secure & private, always</span>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="login-right">
                <div className="login-form-wrap">
                    <h1>Welcome back</h1>
                    <p className="login-subtitle">Sign in to your account to continue</p>

                    {error && <div className="login-error">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="login-field">
                            <label>EMAIL ADDRESS</label>
                            <input
                                type="email"
                                placeholder="admin@logistics.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label>PASSWORD</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="login-btn">Sign In →</button>
                    </form>

                    <p className="login-hint">
                        Use <strong>admin@logistics.com</strong> / <strong>admin123</strong>
                    </p>
                </div>
            </div>

        </div>
    );
}

function LogisticsLogo() {
    return (
        <img src={logo} alt="LogisticsPro Logo" className="logistics-logo" />
    );
}