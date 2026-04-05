import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUp, ArrowDown, X, Download } from 'lucide-react';
import { filterByDays } from '../../utils/transactionUtils';
import './TransactionSection.css';

const CATEGORIES_ALL = ['Food','Bills','Medical','Shopping','Transport','Entertainment','Education','Rent','Other','Salary','Freelance','Investment','Bonus','Other Income'];

export default function TransactionSection({ transactions, isDark }) {
  const cls = isDark ? 'dark' : 'light';

  /* ── Filter state ── */
  const [days,      setDays]      = useState(20);
  const [typeFilter,setTypeFilter]= useState('');
  const [catFilter, setCatFilter] = useState('');
  const [search,    setSearch]    = useState('');
  const [showFilters, setShowFilters] = useState(false);

  /* Amount range */
  const maxAmt = useMemo(() => Math.max(0, ...transactions.map(t => t.amount)), [transactions]);
  const [amtMin, setAmtMin] = useState(0);
  const [amtMax, setAmtMax] = useState(maxAmt || 5000);

  /* ── Sort state ── */
  const [sortBy,  setSortBy]  = useState('date');
  const [sortAsc, setSortAsc] = useState(false);

  /* ── Derived filtered + sorted list ── */
  const displayed = useMemo(() => {
    let list = filterByDays(transactions, days);

    if (typeFilter) list = list.filter(t => t.type === typeFilter);
    if (catFilter)  list = list.filter(t => t.category === catFilter);
    list = list.filter(t => t.amount >= amtMin && t.amount <= amtMax);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      );
    }

    list = [...list].sort((a, b) => {
      if (sortBy === 'date') {
        const diff = new Date(a.date) - new Date(b.date);
        return sortAsc ? diff : -diff;
      } else {
        const diff = a.amount - b.amount;
        return sortAsc ? diff : -diff;
      }
    });

    return list;
  }, [transactions, days, typeFilter, catFilter, amtMin, amtMax, search, sortBy, sortAsc]);

  const isNewUser = transactions.length === 0;

  const clearFilters = () => {
    setTypeFilter(''); setCatFilter(''); setSearch('');
    setAmtMin(0); setAmtMax(maxAmt || 5000);
  };
  const hasActiveFilters = typeFilter || catFilter || search || amtMin > 0 || amtMax < (maxAmt || 5000);

  /* ── CSV Export ── */
  const exportCSV = () => {
    const headers = ['Date','Type','Category','Description','Amount'];
    const escapeCSV = (val) => {
      val = String(val);
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };
    const rows = displayed.map(t => [
      escapeCSV(t.date),
      escapeCSV(t.type),
      escapeCSV(t.category),
      escapeCSV(t.description),
      escapeCSV(t.amount)
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `finsight_transactions_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`txn-section ${cls}`}>
      <div className="txn-section-header">
        <div>
          <h2 className="txn-section-title">Transactions</h2>
          <p className="txn-section-sub">Your recent financial activity</p>
        </div>
        <div className="txn-header-controls">
          {/* Last N days */}
          <div className="control-group">
            <label className="control-label">Last</label>
            <select className="txn-select" value={days} onChange={e => setDays(Number(e.target.value))}>
              {[7,14,20,30,60,90,180].map(d => <option key={d} value={d}>{d} days</option>)}
            </select>
          </div>

          {/* Filter toggle */}
          <button
            className={`btn-filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(f => !f)}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && <span className="filter-dot" />}
          </button>

          {/* Sort */}
          <div className="control-group">
            <select className="txn-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="date">Sort: Date</option>
              <option value="amount">Sort: Amount</option>
            </select>
            <button
              className="btn-sort-dir"
              onClick={() => setSortAsc(a => !a)}
              title={sortAsc ? 'Ascending' : 'Descending'}
            >
              {sortAsc ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter panel ── */}
      {showFilters && (
        <div className="txn-filter-panel">
          {/* Search */}
          <div className="filter-search-wrap">
            <Search size={15} className="search-icon" />
            <input
              className="txn-search"
              type="text"
              placeholder="Search description, category, type…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="search-clear" onClick={() => setSearch('')}><X size={13}/></button>}
          </div>

          <div className="filter-row">
            {/* Type */}
            <div className="filter-item">
              <label className="filter-label">Type</label>
              <select className="txn-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div className="filter-item">
              <label className="filter-label">Category</label>
              <select className="txn-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                <option value="">All Categories</option>
                {CATEGORIES_ALL.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Amount range */}
            <div className="filter-item filter-amount">
              <label className="filter-label">Amount Range: ${amtMin} – ${amtMax}</label>
              <div className="range-sliders">
                <input type="range" min={0} max={maxAmt || 5000} value={amtMin}
                  onChange={e => setAmtMin(Math.min(Number(e.target.value), amtMax))}
                  className="range-slider" />
                <input type="range" min={0} max={maxAmt || 5000} value={amtMax}
                  onChange={e => setAmtMax(Math.max(Number(e.target.value), amtMin))}
                  className="range-slider" />
              </div>
            </div>

            {hasActiveFilters && (
              <button className="btn-clear-filters" onClick={clearFilters}>
                <X size={13} /> Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Transaction list ── */}
      {isNewUser ? (
        <div className="txn-empty">
          <div className="txn-empty-icon">💳</div>
          <h3>No transactions yet</h3>
          <p>Your transactions will appear here once you start tracking your finances.</p>
        </div>
      ) : displayed.length === 0 ? (
        <div className="txn-empty">
          <div className="txn-empty-icon">🔍</div>
          <h3>No matching transactions</h3>
          <p>Try adjusting your filters or date range.</p>
        </div>
      ) : (
        <div className="txn-list">
          <div className="txn-count">{displayed.length} transaction{displayed.length !== 1 ? 's' : ''}</div>
          {displayed.map(t => (
            <TransactionCard key={t.id} t={t} isDark={isDark} />
          ))}
        </div>
      )}

      {/* CSV Export — always visible when user has transactions */}
      {!isNewUser && (
        <button className="btn-export-csv" onClick={exportCSV}>
          <Download size={14} /> Export as CSV
        </button>
      )}
    </div>
  );
}

function TransactionCard({ t, isDark }) {
  const cls = isDark ? 'dark' : 'light';
  const isIncome = t.type === 'income';
  const date = new Date(t.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className={`txn-card ${isIncome ? 'income' : 'expense'} ${cls}`}>
      <div className={`txn-type-indicator ${isIncome ? 'income' : 'expense'}`} />
      <div className="txn-icon-wrap">
        
        <div className={`txn-icon ${isIncome ? 'income' : 'expense'}`}>
  <i className={getCategoryIcon(t.category)}></i>
</div>
      </div>
      <div className="txn-info">
        <div className="txn-description">{t.description}</div>
        <div className="txn-meta">
          <span className="txn-category">{t.category}</span>
          <span className="txn-dot">·</span>
          <span className="txn-date">{date}</span>
        </div>
      </div>
      <div className={`txn-amount ${isIncome ? 'income' : 'expense'}`}>
        {isIncome ? '+' : '-'}${t.amount.toLocaleString()}
      </div>
    </div>
  );
}

/*function getCategoryIcon(category) {
  const map = {
    Food: '', Bills: '', Medical: '', Shopping: '',
    Transport: '', Entertainment: '', Education: '', Rent: '',
    Salary: '', Freelance: '', Investment: '', Bonus: '',
    'Other Income': '💰', Other: '',
  };
  return map[category] || '';
}*/
function getCategoryIcon(category) {
  const map = {
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

  return map[category] || 'fa-solid fa-circle';
}