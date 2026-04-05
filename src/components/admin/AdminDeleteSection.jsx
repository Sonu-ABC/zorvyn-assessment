import React, { useState } from 'react';
import { Trash2, ShieldAlert } from 'lucide-react';
import { deleteUser } from '../../utils/authUtils';
import './AdminDeleteSection.css';

export default function AdminDeleteSection({ allTransactions, allUsers, isDark, onRefresh, showToast }) {
  const cls = isDark ? 'dark' : 'light';

  const [deleteMode, setDeleteMode] = useState('transaction'); // 'transaction' or 'user'
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  // Transaction Deletion
  const [txnId, setTxnId] = useState('');
  const foundTxn = allTransactions.find(t => t.id === txnId.trim());

  const handleDeleteTransaction = async () => {
    if (!foundTxn) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 300));

    try {
      // Add to delete list
      const deletedIds = JSON.parse(localStorage.getItem('finsight_deleted_txn_ids') || '[]');
      if (!deletedIds.includes(foundTxn.id)) {
        localStorage.setItem('finsight_deleted_txn_ids', JSON.stringify([...deletedIds, foundTxn.id]));
      }

      showToast('Transaction deleted Successfully', 'success');
      setTxnId('');
      setDeleteTarget(null);
      onRefresh();
    } catch (err) {
      showToast('Error deleting transaction. Please try again.', 'error');
      console.error(err);
    }

    setLoading(false);
  };

  // User Deletion
  const johnDoe = allUsers.find(u => u.username === 'john_doe');
  const [selectedUser, setSelectedUser] = useState(johnDoe?.username || allUsers[0]?.username || '');

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 300));

    try {
      deleteUser(selectedUser);
      showToast('User deleted Successfully', 'success');
      setSelectedUser(allUsers.filter(u => u.username !== selectedUser)[0]?.username || '');
      setDeleteTarget(null);
      onRefresh();
    } catch (err) {
      showToast('Error deleting user. Please try again.', 'error');
      console.error(err);
    }

    setLoading(false);
  };

  const getUserName = (username) => {
    const u = allUsers.find(uu => uu.username === username);
    return u ? `${u.firstName} ${u.lastName}` : username;
  };

  return (
    <div className={`admin-delete-section ${cls}`}>
      <div className="admin-section-header-lg">
        <div className="admin-section-header-left">
          <h1 className="admin-section-title-lg">Delete</h1>
          <p className="admin-section-desc">Permanently delete transactions or users</p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="ads-mode-tabs">
        <button
          className={`ads-tab ${deleteMode === 'transaction' ? 'active' : ''}`}
          onClick={() => {
            setDeleteMode('transaction');
            setDeleteTarget(null);
            setTxnId('');
            setSelectedUser('');
          }}
        >
          Delete Transaction
        </button>
        <button
          className={`ads-tab ${deleteMode === 'user' ? 'active' : ''}`}
          onClick={() => {
            setDeleteMode('user');
            setDeleteTarget(null);
            setTxnId('');
          }}
        >
          Delete User
        </button>
      </div>

      {deleteMode === 'transaction' ? (
        <div className="ads-delete-panel transaction">
          <div className="ads-search-group">
            <label className="ads-label">Transaction ID</label>
            <input
              type="text"
              placeholder="Enter transaction ID..."
              value={txnId}
              onChange={e => {
                setTxnId(e.target.value);
                setDeleteTarget(null);
              }}
              className="ads-input"
            />
            {txnId && !foundTxn && (<p className="ads-not-found">Transaction not found</p>)}
          </div>

          {foundTxn && (
            <>
              <div className="ads-info-card">
                <div className="ads-info-row">
                  <span className="ads-info-label">ID:</span>
                  <span className="ads-info-value">{foundTxn.id}</span>
                </div>
                <div className="ads-info-row">
                  <span className="ads-info-label">User:</span>
                  <span className="ads-info-value">{getUserName(foundTxn.username)}</span>
                </div>
                <div className="ads-info-row">
                  <span className="ads-info-label">Date:</span>
                  <span className="ads-info-value">
                    {new Date(foundTxn.date).toLocaleDateString('en-US', { 
                      day: '2-digit', month: 'short', year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="ads-info-row">
                  <span className="ads-info-label">Description:</span>
                  <span className="ads-info-value">{foundTxn.description}</span>
                </div>
                <div className="ads-info-row">
                  <span className="ads-info-label">Amount:</span>
                  <span className={`ads-info-value ${foundTxn.type}`}>
                    {foundTxn.type === 'income' ? '+' : '-'}${foundTxn.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {!deleteTarget && (
                <button
                  className="btn-ads-initiate-delete"
                  onClick={() => setDeleteTarget(foundTxn)}
                >
                  <Trash2 size={16} />
                  Delete this Transaction
                </button>
              )}
            </>
          )}

          {deleteTarget === foundTxn && (
            <div className="ads-confirmation-modal">
              <div className={`ads-modal ${cls}`}>
                <div className="ads-modal-icon">
                  <ShieldAlert size={36} color="#ef4444" />
                </div>
                <h3 className="ads-modal-title">Delete Transaction?</h3>
                <p className="ads-modal-body">
                  Do you really want to delete this transaction?<br/>
                  <strong>{deleteTarget.description}</strong> — ${deleteTarget.amount.toLocaleString()}
                </p>
                <div className="ads-modal-actions">
                  <button 
                    className="btn-ads-cancel"
                    onClick={() => setDeleteTarget(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-ads-confirm-delete"
                    onClick={handleDeleteTransaction}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="ads-delete-panel user">
          <div className="ads-select-group">
            <label className="ads-label">Select User to Delete</label>
            <select
              value={selectedUser}
              onChange={e => {
                setSelectedUser(e.target.value);
                setDeleteTarget(null);
              }}
              className="ads-select"
            >
              {allUsers.map(u => (
                <option key={u.username} value={u.username}>
                  {u.firstName} {u.lastName} ({u.username})
                </option>
              ))}
            </select>
          </div>

          {selectedUser && (() => {
            const selUserObj = allUsers.find(u => u.username === selectedUser);
            const isAdmin = selUserObj?.role === 'admin';
            return (
              <>
                <div className="ads-user-info-card">
                  {selUserObj?.avatar && (
                    <img 
                      src={selUserObj.avatar}
                      alt="User"
                      className="ads-user-avatar"
                    />
                  )}
                  <div className="ads-user-details">
                    <div className="ads-user-name">
                      {selUserObj?.firstName}{' '}{selUserObj?.lastName}
                    </div>
                    <div className="ads-user-email">{selUserObj?.email}</div>
                    <div className="ads-user-username">@{selectedUser}</div>
                  </div>
                </div>

                {isAdmin ? (
                  <div className="ads-admin-warning">
                    <ShieldAlert size={20} className="ads-admin-warning-icon" />
                    <span>Admin accounts cannot be removed. Only non-admin users can be deleted.</span>
                  </div>
                ) : (
                  !deleteTarget && (
                    <button
                      className="btn-ads-initiate-delete"
                      onClick={() => setDeleteTarget(selectedUser)}
                    >
                      <Trash2 size={16} />
                      Delete this User
                    </button>
                  )
                )}
              </>
            );
          })()}

          {deleteTarget === selectedUser && (
            <div className="ads-confirmation-modal">
              <div className={`ads-modal ${cls}`}>
                <div className="ads-modal-icon">
                  <ShieldAlert size={36} color="#ef4444" />
                </div>
                <h3 className="ads-modal-title">Delete User?</h3>
                <p className="ads-modal-body">
                  Do you really want to remove <strong>{getUserName(selectedUser)}</strong>?<br/>
                  This action is permanent and cannot be undone.
                </p>
                <div className="ads-modal-actions">
                  <button 
                    className="btn-ads-cancel"
                    onClick={() => setDeleteTarget(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-ads-confirm-delete"
                    onClick={handleDeleteUser}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Yes, Delete User'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
