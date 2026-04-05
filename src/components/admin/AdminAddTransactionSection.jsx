import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import './AdminAddTransactionSection.css';

const CATEGORIES_INCOME = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other Income'];
const CATEGORIES_EXPENSE = ['Food', 'Bills', 'Medical', 'Shopping', 'Transport', 'Entertainment', 'Education', 'Rent', 'Other'];

export default function AdminAddTransactionSection({ allUsers, isDark, onSaved, showToast }) {
  const cls = isDark ? 'dark' : 'light';

  const [formData, setFormData] = useState({
    username: allUsers[0]?.username || '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    category: 'Food',
    description: '',
    amount: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: '' }));
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const cats = newType === 'income' ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;
    setFormData(f => ({ ...f, type: newType, category: cats[0] }));
    setErrors(e => ({ ...e, type: '', category: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'User is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    const amt = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amt) || amt <= 0) newErrors.amount = 'Valid amount is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 300));

    try {
      // Generate a unique transaction ID
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000);
      const id = `admin-${timestamp}-${random}`;

      const newTransaction = {
        id,
        username: formData.username,
        date: formData.date,
        type: formData.type,
        category: formData.category,
        description: formData.description,
        amount: parseFloat(formData.amount),
      };

      // Store in localStorage
      const key = `finsight_transactions_${formData.username}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([...existing, newTransaction]));

      showToast('Transaction added Successfully', 'success');
      
      // Reset form
      setFormData({
        username: allUsers[0]?.username || '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        category: 'Food',
        description: '',
        amount: '',
      });

      onSaved();
    } catch (err) {
      showToast('Error adding transaction. Please try again.', 'error');
      console.error(err);
    }

    setLoading(false);
  };

  const currentCats = formData.type === 'income' ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;
  const userFullName = allUsers.find(u => u.username === formData.username) 
    ? `${allUsers.find(u => u.username === formData.username)?.firstName} ${allUsers.find(u => u.username === formData.username)?.lastName}`
    : '';

  return (
    <div className={`admin-add-txn-section ${cls}`}>
      <div className="admin-section-header-lg">
        <div className="admin-section-header-left">
          <h1 className="admin-section-title-lg">Add Transaction</h1>
          <p className="admin-section-desc">Create a new transaction for any user</p>
        </div>
      </div>

      <form className="admin-add-form" onSubmit={handleSubmit}>
        <div className="aaf-grid-2col">
          {/* User Selection */}
          <div className="aaf-group">
            <label className="aaf-label">User</label>
            <select 
              name="username" 
              value={formData.username} 
              onChange={handleChange}
              className={`aaf-input ${errors.username ? 'error' : ''}`}
            >
              {allUsers.map(u => (
                <option key={u.username} value={u.username}>
                  {u.firstName} {u.lastName} ({u.username})
                </option>
              ))}
            </select>
            {errors.username && <span className="aaf-error">{errors.username}</span>}
          </div>

          {/* Date */}
          <div className="aaf-group">
            <label className="aaf-label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`aaf-input ${errors.date ? 'error' : ''}`}
            />
            {errors.date && <span className="aaf-error">{errors.date}</span>}
          </div>
        </div>

        <div className="aaf-grid-2col">
          {/* Type */}
          <div className="aaf-group">
            <label className="aaf-label">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
              className={`aaf-input ${errors.type ? 'error' : ''}`}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.type && <span className="aaf-error">{errors.type}</span>}
          </div>

          {/* Category */}
          <div className="aaf-group">
            <label className="aaf-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`aaf-input ${errors.category ? 'error' : ''}`}
            >
              {currentCats.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <span className="aaf-error">{errors.category}</span>}
          </div>
        </div>

        {/* Description */}
        <div className="aaf-group">
          <label className="aaf-label">Description</label>
          <input
            type="text"
            name="description"
            placeholder="e.g. Monthly salary, Grocery shopping, etc."
            value={formData.description}
            onChange={handleChange}
            className={`aaf-input ${errors.description ? 'error' : ''}`}
          />
          {errors.description && <span className="aaf-error">{errors.description}</span>}
        </div>

        {/* Amount */}
        <div className="aaf-group">
          <label className="aaf-label">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            className={`aaf-input ${errors.amount ? 'error' : ''}`}
          />
          {errors.amount && <span className="aaf-error">{errors.amount}</span>}
        </div>

        {/* Summary */}
        <div className="aaf-summary">
          <div className="aaf-summary-item">
            <span className="aaf-summary-label">User:</span>
            <span className="aaf-summary-value">{userFullName}</span>
          </div>
          <div className="aaf-summary-item">
            <span className="aaf-summary-label">Type:</span>
            <span className={`aaf-summary-value ${formData.type}`}>{formData.type}</span>
          </div>
          <div className="aaf-summary-item">
            <span className="aaf-summary-label">Category:</span>
            <span className="aaf-summary-value">{formData.category}</span>
          </div>
        </div>

        {/* Submit */}
        <div className="aaf-actions">
          <button type="submit" className="btn-aaf-submit" disabled={loading}>
            <Plus size={16} />
            {loading ? 'Adding...' : 'Add Transaction'}
          </button>
        </div>
      </form>

    </div>
  );
}
