import React from 'react';
import { Home, ArrowLeftRight, Lightbulb, LogOut, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({
  user, isDark, toggleDark, collapsed, setCollapsed,
  onNavHome, onNavTransactions, onNavInsights, onLogout, activeSection
}) {
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();
  const avatarSrc = user?.avatar;

  const navItems = [
    { id: 'home',         icon: <Home size={18} />,           label: 'Home',         action: onNavHome },
    { id: 'transactions', icon: <ArrowLeftRight size={18} />, label: 'Transactions', action: onNavTransactions },
    { id: 'insights',     icon: <Lightbulb size={18} />,      label: 'Insights',     action: onNavInsights },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isDark ? 'dark' : 'light'}`}>

      {/* Collapse toggle */}
      <button className="sidebar-toggle" onClick={() => setCollapsed(c => !c)} aria-label="Toggle sidebar">
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Profile */}
      <div className="sidebar-profile">
        

        <div className="admin-sidebar-avatar-wrap">
          {avatarSrc ? (
            <img src={avatarSrc} alt={user?.firstName} className="admin-sidebar-avatar-img" />
          ) : (
            <div className="admin-sidebar-avatar-initials">{initials}</div>
          )}
        </div>

        {!collapsed && (
          <div className="sidebar-user-info">
            <span className="sidebar-name">{user?.firstName} {user?.lastName}</span>
            <span className="sidebar-email">{user?.email}</span>
            <span className={`sidebar-role-tag ${user?.role}`}>{user?.role}</span>
          </div>
        )}
      </div>

      <div className="sidebar-divider" />

      {/* Nav links */}
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={item.action}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      {/* Dark mode toggle */}
      <div className="sidebar-bottom">
        <button className="sidebar-nav-item theme-toggle" onClick={toggleDark} title={isDark ? 'Light mode' : 'Dark mode'}>
          <span className="sidebar-nav-icon">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </span>
          {!collapsed && <span className="sidebar-nav-label">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <button className="sidebar-nav-item logout-btn" onClick={onLogout} title="Logout">
          <span className="sidebar-nav-icon"><LogOut size={18} /></span>
          {!collapsed && <span className="sidebar-nav-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
