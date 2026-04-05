import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboardSection from '../components/admin/AdminDashboardSection';
import AdminTransactionSection from '../components/admin/AdminTransactionSection';
import AdminAddTransactionSection from '../components/admin/AdminAddTransactionSection';
import AdminEditTransactionSection from '../components/admin/AdminEditTransactionSection';
import AdminDeleteSection from '../components/admin/AdminDeleteSection';
import Toast from '../components/common/Toast';
import { getAllUsers, getAllTransactions } from '../utils/authUtils';
import './Dashboard.css';

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('finsight_theme');
    // Default to dark if no preference is stored
    return stored ? stored === 'dark' : true;
  });
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch all users and transactions
  const [allUsers, setAllUsers] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  // ── Lifted toast state (survives child remounts) ──
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast(t => ({ ...t, show: false }));
  }, []);

  const refreshData = useCallback(() => {
    setAllUsers(getAllUsers());
    setAllTransactions(getAllTransactions());
    setRefreshKey(k => k + 1);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    localStorage.setItem('finsight_theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`admin-page-layout ${isDark ? 'dark' : 'light'}`}>
      <AdminSidebar
        user={currentUser}
        isDark={isDark}
        toggleDark={() => setIsDark(d => !d)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeSection={activeSection}
        onNav={setActiveSection}
        onLogout={handleLogout}
      />

      <div className="admin-main-content">
        {activeSection === 'dashboard' && (
          <AdminDashboardSection
            allUsers={allUsers}
            allTransactions={allTransactions}
            isDark={isDark}
            key={refreshKey}
          />
        )}
        {activeSection === 'view-transactions' && (
          <AdminTransactionSection
            allTransactions={allTransactions}
            allUsers={allUsers}
            isDark={isDark}
            onRefresh={refreshData}
            showToast={showToast}
            key={refreshKey}
          />
        )}
        {activeSection === 'add-transaction' && (
          <AdminAddTransactionSection
            allUsers={allUsers}
            isDark={isDark}
            onSaved={refreshData}
            showToast={showToast}
            key={refreshKey}
          />
        )}
        {activeSection === 'edit-transaction' && (
          <AdminEditTransactionSection
            allTransactions={allTransactions}
            allUsers={allUsers}
            isDark={isDark}
            onSaved={refreshData}
            showToast={showToast}
            key={refreshKey}
          />
        )}
        {activeSection === 'delete' && (
          <AdminDeleteSection
            allTransactions={allTransactions}
            allUsers={allUsers}
            isDark={isDark}
            onRefresh={refreshData}
            showToast={showToast}
            key={refreshKey}
          />
        )}
      </div>

      {/* Top-level Toast — survives child component remounts */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    </div>
  );
}
