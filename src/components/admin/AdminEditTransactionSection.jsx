import React, { useState, useMemo } from 'react';
import { Edit3, X } from 'lucide-react';
import './AdminEditTransactionSection.css';

const CATEGORIES_ALL = ['Food','Bills','Medical','Shopping','Transport','Entertainment',
  'Education','Rent','Other','Salary','Freelance','Investment','Bonus','Other Income'];

export default function AdminEditTransactionSection({ allTransactions, allUsers, isDark, onSaved, showToast }) {
  const cls = isDark ? 'dark' : 'light';

  const [txnId, setTxnId] = useState('');
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Find transaction by ID
  const findTransaction = (id) => {
    return allTransactions.find(t => t.id === id);
  };

  const handleSearchChange = (e) => {
    const id = e.target.value;
    setTxnId(id);
    setErrors({});

    if (id.trim()) {
      const found = findTransaction(id.trim());
      if (found) {
        setEditTarget(found);
        setEditForm({
          date: found.date,
          type: found.type,
          category: found.category,
          description: found.description,
          amount: found.amount,
        });
      } else {
        setEditTarget(null);
        setEditForm({});
      }
    } else {
      setEditTarget(null);
      setEditForm({});
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!editForm.date) newErrors.date = 'Date is required';
    if (!editForm.type) newErrors.type = 'Type is required';
    if (!editForm.category) newErrors.category = 'Category is required';
    if (!editForm.description.trim()) newErrors.description = 'Description is required';
    const amt = parseFloat(editForm.amount);
    if (!editForm.amount || isNaN(amt) || amt <= 0) newErrors.amount = 'Valid amount is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editTarget) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 300));

    try {
      // Store edits in localStorage
      const editedMap = JSON.parse(localStorage.getItem('finsight_edited_txns') || '{}');
      editedMap[editTarget.id] = {
        ...editForm,
        amount: parseFloat(editForm.amount),
      };
      localStorage.setItem('finsight_edited_txns', JSON.stringify(editedMap));

      showToast('Transaction edited Successfully', 'success');
      setTxnId('');
      setEditTarget(null);
      setEditForm({});
      onSaved();
    } catch (err) {
      showToast('Error updating transaction. Please try again.', 'error');
      console.error(err);
    }

    setLoading(false);
  };

  const getUserName = (username) => {
    const u = allUsers.find(u => u.username === username);
    return u ? `${u.firstName} ${u.lastName}` : username;
  };

  return (
    <div className={`admin-edit-txn-section ${cls}`}>
      <div className="admin-section-header-lg">
        <div className="admin-section-header-left">
          <h1 className="admin-section-title-lg">Edit Transaction</h1>
          <p className="admin-section-desc">Search by transaction ID and modify the details</p>
        </div>
      </div>

      <div className="aets-search-wrapper">
        <div className="aets-search-group">
          <label className="aets-label">Transaction ID</label>
          <input
            type="text"
            placeholder="Enter transaction ID (e.g. jd-1, jane-5, admin-1234567890-5678)"
            value={txnId}
            onChange={handleSearchChange}
            className="aets-search-input"
          />
          {txnId && !editTarget && (<p className="aets-not-found">Transaction not found</p>)}
        </div>
      </div>

      {editTarget && (
        <form className="aets-edit-form" onSubmit={handleSubmit}>
          <div className="aets-info-card">
            <div className="aets-info-row">
              <span className="aets-info-label">Transaction ID:</span>
              <span className="aets-info-value">{editTarget.id}</span>
            </div>
            <div className="aets-info-row">
              <span className="aets-info-label">User:</span>
              <span className="aets-info-value">{getUserName(editTarget.username)}</span>
            </div>
            <div className="aets-info-row">
              <span className="aets-info-label">Current Amount:</span>
              <span className={`aets-info-value ${editTarget.type}`}>
                {editTarget.type === 'income' ? '+' : '-'}${editTarget.amount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="aets-form-grid">
            {/* Date */}
            <div className="aets-group">
              <label className="aets-label">Date</label>
              <input
                type="date"
                name="date"
                value={editForm.date}
                onChange={handleFormChange}
                className={`aets-input ${errors.date ? 'error' : ''}`}
              />
              {errors.date && <span className="aets-error">{errors.date}</span>}
            </div>

            {/* Type */}
            <div className="aets-group">
              <label className="aets-label">Type</label>
              <select
                name="type"
                value={editForm.type}
                onChange={handleFormChange}
                className={`aets-input ${errors.type ? 'error' : ''}`}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              {errors.type && <span className="aets-error">{errors.type}</span>}
            </div>

            {/* Category */}
            <div className="aets-group">
              <label className="aets-label">Category</label>
              <select
                name="category"
                value={editForm.category}
                onChange={handleFormChange}
                className={`aets-input ${errors.category ? 'error' : ''}`}
              >
                {CATEGORIES_ALL.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <span className="aets-error">{errors.category}</span>}
            </div>

            {/* Amount */}
            <div className="aets-group">
              <label className="aets-label">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="amount"
                value={editForm.amount}
                onChange={handleFormChange}
                className={`aets-input ${errors.amount ? 'error' : ''}`}
              />
              {errors.amount && <span className="aets-error">{errors.amount}</span>}
            </div>
          </div>

          {/* Description */}
          <div className="aets-group-full">
            <label className="aets-label">Description</label>
            <input
              type="text"
              name="description"
              value={editForm.description}
              onChange={handleFormChange}
              className={`aets-input ${errors.description ? 'error' : ''}`}
            />
            {errors.description && <span className="aets-error">{errors.description}</span>}
          </div>

          {/* Actions */}
          <div className="aets-actions">
            <button
              type="button"
              className="btn-aets-cancel"
              onClick={() => { setTxnId(''); setEditTarget(null); }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-aets-submit" disabled={loading}>
              <Edit3 size={16} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {!editTarget && txnId && (
        <div className="aets-empty-state">
          <p>Transaction not found. Please check the ID and try again.</p>
        </div>
      )}

      {!txnId && (
        <div className="aets-empty-state">
          <p>Enter a transaction ID above to get started.</p>
        </div>
      )}

    </div>
  );
}
