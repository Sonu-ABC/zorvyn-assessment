import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { validateCredentials } from '../../utils/authUtils';
import { useAuth } from '../../hooks/useAuth';
import './AuthForms.css';

export default function LoginForm({ role, onSwitchToSignUp }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Small delay to simulate async check
    await new Promise((r) => setTimeout(r, 400));

    const matched = validateCredentials(formData.username.trim(), formData.password, role);

    if (matched) {
      login(matched);
      navigate(matched.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
    } else {
      setError('Account not found. Please sign up.');
    }
    setLoading(false);
  };

  const roleLabel = role === 'admin' ? 'Admin' : 'User';

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <div className={`role-badge ${role}`}>{roleLabel}</div>
        <h2 className="auth-form-title">Welcome back</h2>
        <p className="auth-form-subtitle">Sign in to your FinSight {roleLabel.toLowerCase()} account</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="login-username">Username</label>
          <input
            id="login-username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <div className="password-wrapper">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <button type="submit" className="btn-auth-submit" disabled={loading}>
          {loading ? (
            <span className="spinner" />
          ) : (
            <>
              <LogIn size={16} />
              Log In
            </>
          )}
        </button>
      </form>

      <p className="auth-switch-text">
        Don&apos;t have an account?{' '}
        <button className="link-btn" onClick={onSwitchToSignUp}>
          Sign Up
        </button>
      </p>
    </div>
  );
}
