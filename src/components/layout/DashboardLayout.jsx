import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './DashboardLayout.css';

export default function DashboardLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="dashboard-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <ArrowUpRight size={20} />
          FinSight
        </div>

        <div className="dashboard-header-right">
          <div className="dashboard-user-info">
            <div className="user-avatar">
              {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
            </div>
            <div className="user-details">
              <span className="user-name">{currentUser?.firstName} {currentUser?.lastName}</span>
              <span className={`user-role-tag ${currentUser?.role}`}>{currentUser?.role}</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <a href="#" className="sidebar-link active">
              <LayoutDashboard size={17} />
              Dashboard
            </a>
          </nav>
        </aside>

        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}
