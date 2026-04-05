import React from 'react';
import {
  LayoutDashboard, PlusCircle, Edit3, Trash2,
  LogOut, Sun, Moon, ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import './AdminSidebar.css';

export default function AdminSidebar({
  user, isDark, toggleDark, collapsed, setCollapsed,
  activeSection, onNav, onLogout
}) {
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();
  const avatarSrc = user?.avatar;

  const navItems = [
    { id: 'dashboard',        icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { id: 'view-transactions',icon: <Eye size={18} />,             label: 'View Transactions' },
    { id: 'add-transaction',  icon: <PlusCircle size={18} />,      label: 'Add Transaction' },
    { id: 'edit-transaction', icon: <Edit3 size={18} />,           label: 'Edit' },
    { id: 'delete',           icon: <Trash2 size={18} />,          label: 'Delete' },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${isDark ? 'dark' : 'light'}`}>

      {/* Collapse toggle */}
      <button className="admin-sidebar-toggle" onClick={() => setCollapsed(c => !c)} aria-label="Toggle sidebar">
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Profile */}
      <div className="admin-sidebar-profile">
        <div className="admin-sidebar-avatar-wrap">
          {avatarSrc ? (
            <img src={avatarSrc} alt={user?.firstName} className="admin-sidebar-avatar-img" />
          ) : (
            <div className="admin-sidebar-avatar-initials">{initials}</div>
          )}
          <div className="admin-sidebar-status" />
        </div>
        {!collapsed && (
          <div className="admin-sidebar-user-info">
            <span className="admin-sidebar-name">{user?.firstName} {user?.lastName}</span>
            <span className="admin-sidebar-email">{user?.email}</span>
            <span className="admin-sidebar-role-tag">Admin</span>
          </div>
        )}
      </div>

      <div className="admin-sidebar-divider" />

      {/* Nav */}
      <nav className="admin-sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`admin-sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onNav(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className="admin-sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="admin-sidebar-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="admin-sidebar-spacer" />

      {/* Bottom */}
      <div className="admin-sidebar-bottom">
        <button className="admin-sidebar-item theme-toggle" onClick={toggleDark}
          title={isDark ? 'Light mode' : 'Dark mode'}>
          <span className="admin-sidebar-icon">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </span>
          {!collapsed && <span className="admin-sidebar-label">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <button className="admin-sidebar-item logout-btn" onClick={onLogout} title="Logout">
          <span className="admin-sidebar-icon"><LogOut size={18} /></span>
          {!collapsed && <span className="admin-sidebar-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
