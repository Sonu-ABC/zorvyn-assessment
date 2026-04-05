import React, { useState, useMemo, useCallback } from 'react';
import { Search, SlidersHorizontal, ArrowUp, ArrowDown, X, Edit3, Trash2, SearchX } from 'lucide-react';
import './AdminTransactionSection.css';

const CATEGORIES_ALL = ['Food','Bills','Medical','Shopping','Transport','Entertainment',
  'Education','Rent','Other','Salary','Freelance','Investment','Bonus','Other Income'];



function getCategoryIcon(c) {
  const m = {
    Food: 'fa-solid fa-utensils',
    Bills: 'fa-solid fa-file-invoice-dollar',
    Medical: 'fa-solid fa-notes-medical',
    Shopping: 'fa-solid fa-bag-shopping',
    Transport: 'fa-solid fa-bus',
    Travel: 'fa-solid fa-plane',
    Entertainment: 'fa-solid fa-film',
    Education: 'fa-solid fa-graduation-cap',
    Rent: 'fa-solid fa-house',
    Salary: 'fa-solid fa-wallet',
    Freelance: 'fa-solid fa-laptop-code',
    Investment: 'fa-solid fa-chart-line',
    Bonus: 'fa-solid fa-gift',
    'Other Income': 'fa-solid fa-coins',
    'Other Expense': 'fa-solid fa-ellipsis',
  };

  return m[c] || 'fa-solid fa-circle';
}

export default function AdminTransactionSection({ allTransactions, allUsers, isDark, onRefresh, showToast }) {
  const cls = isDark ? 'dark' : 'light';

  const [count,      setCount]      = useState(10);
  const [userFilter, setUserFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('');
  const [catFilter,  setCatFilter]  = useState('');
  const [search,     setSearch]     = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy,     setSortBy]     = useState('date');
  const [sortAsc,    setSortAsc]    = useState(false);

  /* Amount range slider */
  const maxAmt = useMemo(() => Math.max(0, ...allTransactions.map(t => t.amount)), [allTransactions]);
  const [amtMin, setAmtMin] = useState(0);
  const [amtMax, setAmtMax] = useState(null); // null = uninitialised, set to maxAmt on first render
  const effectiveMax = amtMax !== null ? amtMax : (maxAmt || 5000);

  // Modals
  const [deleteTarget, setDeleteTarget] = useState(null);   // transaction object
  const [editTarget,   setEditTarget]   = useState(null);   // transaction object
  const [editForm,     setEditForm]     = useState({});


  /* ── Derived list ── */
  const displayed = useMemo(() => {
    let list = [...allTransactions];
    if (userFilter !== 'all') list = list.filter(t => t.username === userFilter);
    if (typeFilter) list = list.filter(t => t.type === typeFilter);
    if (catFilter)  list = list.filter(t => t.category === catFilter);
    const hi = amtMax !== null ? amtMax : (maxAmt || 5000);
    list = list.filter(t => t.amount >= amtMin && t.amount <= hi);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.description?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q) ||
        t.id?.toLowerCase().includes(q) ||
        (t.username || '').toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortBy === 'date') {
        const diff = new Date(a.date) - new Date(b.date);
        return sortAsc ? diff : -diff;
      }
      const diff = a.amount - b.amount;
      return sortAsc ? diff : -diff;
    });
    return list.slice(0, count);
  }, [allTransactions, userFilter, typeFilter, catFilter, amtMin, amtMax, maxAmt, search, sortBy, sortAsc, count]);

  const clearFilters = () => {
    setUserFilter('all'); setTypeFilter(''); setCatFilter(''); setSearch('');
    setAmtMin(0); setAmtMax(maxAmt || 5000);
  };

  const hasFilters = userFilter !== 'all' || typeFilter || catFilter || search
    || amtMin > 0 || (amtMax !== null && amtMax < (maxAmt || 5000));

  /* ── Delete ── */
  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    // Add to deleted ids list
    const raw = JSON.parse(localStorage.getItem('finsight_deleted_txn_ids') || '[]');
    if (!raw.includes(deleteTarget.id)) {
      localStorage.setItem('finsight_deleted_txn_ids', JSON.stringify([...raw, deleteTarget.id]));
    }
    setDeleteTarget(null);
    showToast('Transaction deleted Successfully', 'success');
    onRefresh();
  }, [deleteTarget, onRefresh, showToast]);

  /* ── Edit ── */
  const openEdit = (t) => {
    setEditTarget(t);
    setEditForm({
      date:        t.date,
      type:        t.type,
      category:    t.category,
      description: t.description,
      amount:      t.amount,
    });
  };

  const submitEdit = () => {
    if (!editTarget) return;
    const editedMap = JSON.parse(localStorage.getItem('finsight_edited_txns') || '{}');
    editedMap[editTarget.id] = { ...editForm, amount: parseFloat(editForm.amount) || 0 };
    localStorage.setItem('finsight_edited_txns', JSON.stringify(editedMap));
    setEditTarget(null);
    showToast('Transaction edited Successfully', 'success');
    onRefresh();
  };

  const getUserName = (username) => {
    const u = allUsers.find(u => u.username === username);
    return u ? `${u.firstName} ${u.lastName}` : username;
  };

  return (
    <div className={`admin-txn-section ${cls}`}>
      {/* ── Header ── */}
      <div className="admin-txn-header">
        <div>
          <h2 className="admin-txn-title">View Transactions</h2>
          <p className="admin-txn-sub">Latest {count} transactions across all users</p>
        </div>
        <div className="admin-txn-controls">
          {/* Count */}
          <div className="control-grp">
            <label className="ctrl-label">Show</label>
            <select className="admin-select" value={count} onChange={e => setCount(Number(e.target.value))}>
              {[10,20,50,100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          {/* User filter */}
          <select className="admin-select" value={userFilter} onChange={e => setUserFilter(e.target.value)}>
            <option value="all">All Users</option>
            {allUsers.map(u => (
              <option key={u.username} value={u.username}>{u.firstName} {u.lastName}</option>
            ))}
          </select>
          {/* Filter toggle */}
          <button className={`btn-admin-filter ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(f => !f)}>
            <SlidersHorizontal size={15} /> Filters
            {hasFilters && <span className="filter-dot" />}
          </button>
          {/* Sort */}
          <div className="control-grp">
            <select className="admin-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="date">Sort: Date</option>
              <option value="amount">Sort: Amount</option>
            </select>
            <button className="btn-sort-dir" onClick={() => setSortAsc(a => !a)}
              title={sortAsc ? 'Ascending' : 'Descending'}>
              {sortAsc ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter panel ── */}
      {showFilters && (
        <div className="admin-filter-panel">
          {/* Search — same pattern as user section: icon absolutely positioned inside input */}
          <div className="filter-search-wrap">
            <Search size={15} className="search-icon" />
            <input
              className="admin-search"
              type="text"
              placeholder="Search description, ID, user…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="search-clear" onClick={() => setSearch('')}><X size={13}/></button>}
          </div>
          <div className="filter-row">
            <div className="filter-item">
              <label className="filter-label">Type</label>
              <select className="admin-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="filter-item">
              <label className="filter-label">Category</label>
              <select className="admin-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                <option value="">All Categories</option>
                {CATEGORIES_ALL.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {/* Amount range — mirrors user TransactionSection */}
            <div className="filter-item filter-amount">
              <label className="filter-label">
                Amount: ${amtMin} – ${effectiveMax}
              </label>
              <div className="range-sliders">
                <input
                  type="range" min={0} max={maxAmt || 5000} value={amtMin}
                  onChange={e => setAmtMin(Math.min(Number(e.target.value), effectiveMax))}
                  className="range-slider"
                />
                <input
                  type="range" min={0} max={maxAmt || 5000} value={effectiveMax}
                  onChange={e => setAmtMax(Math.max(Number(e.target.value), amtMin))}
                  className="range-slider"
                />
              </div>
            </div>
            {hasFilters && (
              <button className="btn-clear-filters" onClick={clearFilters}>
                <X size={13} /> Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div className="admin-txn-count">{displayed.length} transactions</div>
      <div className="admin-txn-table-wrap">
        <table className="admin-txn-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>User</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map(t => {
              const isIncome = t.type === 'income';
              const dateStr = new Date(t.date).toLocaleDateString('en-US', { day:'2-digit', month:'short', year:'numeric' });
              return (
                <tr key={t.id} className="admin-txn-row">
                  <td>
                    

                       <span className={`txn-badge ${isIncome ? 'income' : 'expense'}`}>
  <i className={getCategoryIcon(t.category)}></i>
</span>


                  </td>
                  <td className="txn-date-cell">{dateStr}</td>
                  <td className="txn-user-cell">{getUserName(t.username)}</td>
                  <td><span className="txn-category-tag">{t.category}</span></td>
                  <td className="txn-desc-cell">{t.description}</td>
                  <td className={`txn-amt-cell ${isIncome ? 'income' : 'expense'}`}>
                    {isIncome ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                  <td>
                    <div className="txn-actions">
                      <button className="btn-txn-edit" onClick={() => openEdit(t)} title="Edit">
                        <Edit3 size={14} />
                      </button>
                      <button className="btn-txn-delete" onClick={() => setDeleteTarget(t)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {displayed.length === 0 && (
          <div className="admin-txn-empty">
            <div className="admin-txn-empty-icon"><SearchX size={36} strokeWidth={1.5} /></div>
            <p>No transactions match your filters.</p>
          </div>
        )}
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className={`admin-modal ${cls}`} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-icon delete-icon">
              <Trash2 size={36} strokeWidth={1.5} color="#f43f5e" />
            </div>
            <h3 className="admin-modal-title">Delete Transaction?</h3>
            <p className="admin-modal-body">
              Do you really want to delete this transaction?<br/>
              <strong>{deleteTarget.description}</strong> — ${deleteTarget.amount.toLocaleString()}
            </p>
            <div className="admin-modal-actions">
              <button className="btn-modal-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn-modal-confirm delete" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editTarget && (
        <div className="admin-modal-overlay" onClick={() => setEditTarget(null)}>
          <div className={`admin-modal edit-modal ${cls}`} onClick={e => e.stopPropagation()}>
            <h3 className="admin-modal-title">Edit Transaction</h3>
            <p className="admin-modal-id">ID: {editTarget.id}</p>
            <div className="admin-edit-form">
              <div className="aef-row">
                <div className="aef-group">
                  <label>Date</label>
                  <input type="date" value={editForm.date}
                    onChange={e => setEditForm(f => ({...f, date: e.target.value}))} />
                </div>
                <div className="aef-group">
                  <label>Type</label>
                  <select value={editForm.type}
                    onChange={e => setEditForm(f => ({...f, type: e.target.value, category: ''}))}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </div>
              <div className="aef-group">
                <label>Category</label>
                <select value={editForm.category}
                  onChange={e => setEditForm(f => ({...f, category: e.target.value}))}>
                  {CATEGORIES_ALL.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="aef-group">
                <label>Description</label>
                <input type="text" value={editForm.description}
                  onChange={e => setEditForm(f => ({...f, description: e.target.value}))} />
              </div>
              <div className="aef-group">
                <label>Amount ($)</label>
                <input type="number" min="0" value={editForm.amount}
                  onChange={e => setEditForm(f => ({...f, amount: e.target.value}))} />
              </div>
            </div>
            <div className="admin-modal-actions">
              <button className="btn-modal-cancel" onClick={() => setEditTarget(null)}>Cancel</button>
              <button className="btn-modal-confirm edit" onClick={submitEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
