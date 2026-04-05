import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import { ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { getAvailableMonths } from '../../utils/transactionUtils';
import './AdminDashboardSection.css';

const MONTH_FULL = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];

function getUserBalance(transactions, username) {
  return transactions
    .filter(t => t.username === username)
    .reduce((s, t) => t.type === 'income' ? s + t.amount : s - t.amount, 0);
}

function getDisplayName(user) {
  return `${user.firstName} ${user.lastName}`;
}

/* ── Custom tooltip for stacked bar chart ── */
const AdminBarTooltip = ({ active, payload, label, isDark }) => {
  if (!active || !payload?.length) return null;
  const bg = isDark ? '#0d1635' : '#ffffff';
  const border = isDark ? 'rgba(99,102,241,0.3)' : '#e2e8f0';
  const txt = isDark ? '#e2e8f0' : '#0f172a';
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: txt, fontWeight: 700, marginBottom: 4, fontSize: '0.82rem' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: '0.8rem', margin: '2px 0' }}>
          {p.name}: ${Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboardSection({ allUsers, allTransactions, isDark }) {
  const cls = isDark ? 'dark' : 'light';

  /* ── Circular Carousel ── */
  const VISIBLE = 4;                  // cards shown at once
  const GAP_PX = 16;                  // gap between cards (must match CSS)
  const totalUsers = allUsers.length;

  // We clone the last VISIBLE cards at the front and first VISIBLE at the back
  // so we can seamlessly wrap around in both directions.
  const clonedUsers = useMemo(() => {
    if (totalUsers === 0) return [];
    const cloneCount = Math.min(VISIBLE, totalUsers);
    const pre  = allUsers.slice(-cloneCount);   // clones prepended
    const post = allUsers.slice(0, cloneCount); // clones appended
    return [...pre, ...allUsers, ...post];
  }, [allUsers]);

  const cloneCount = Math.min(VISIBLE, totalUsers);

  // realIdx is the index into the original allUsers array (0-based)
  const [realIdx, setRealIdx]  = useState(0);
  const [animated, setAnimated] = useState(true);
  const trackRef = useRef(null);
  const lockRef  = useRef(false); // prevent rapid clicks during transition

  // The DOM index inside clonedUsers that corresponds to realIdx
  const domIdx = realIdx + cloneCount;

  // Measure viewport width so we can build a pixel-accurate translateX.
  // cardSlotPx = one card's width + one gap  (card itself = slot - gap).
  const viewportRef = useRef(null);
  const [cardSlotPx, setCardSlotPx] = useState(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => {
      const vw = el.clientWidth;
      // slot = (viewportWidth - (VISIBLE-1)*GAP) / VISIBLE + GAP
      setCardSlotPx((vw - (VISIBLE - 1) * GAP_PX) / VISIBLE + GAP_PX);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const translateX = cardSlotPx ? `${-domIdx * cardSlotPx}px` : '0px';

  const handleNext = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimated(true);
    setRealIdx(i => i + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimated(true);
    setRealIdx(i => i - 1);
  }, []);

  // After each animated slide, check if we've gone past the real bounds
  // and if so, silently jump (no animation) to the mirrored real position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = () => {
      lockRef.current = false;
      if (realIdx >= totalUsers) {
        // went past the end → jump to beginning
        setAnimated(false);
        setRealIdx(0);
      } else if (realIdx < 0) {
        // went before the start → jump to end
        setAnimated(false);
        setRealIdx(totalUsers - 1);
      }
    };

    track.addEventListener('transitionend', onTransitionEnd);
    return () => track.removeEventListener('transitionend', onTransitionEnd);
  }, [realIdx, totalUsers]);

  // After a silent jump (animated=false), re-enable animation on next render
  useEffect(() => {
    if (!animated) {
      // Use rAF to restore animation flag after the silent reposition
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lockRef.current = false;
          setAnimated(true);
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  /* ── Stats cards ── */
  const totalTransactions = allTransactions.length;
  const totalAmount = allTransactions.reduce((s, t) => s + t.amount, 0);

  /* ── Available months across all transactions ── */
  const availMonths = useMemo(() => {
    const seen = new Set();
    const months = [];
    allTransactions.forEach(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!seen.has(key)) {
        seen.add(key);
        months.push({ year: d.getFullYear(), monthIndex: d.getMonth(),
          label: `${MONTH_FULL[d.getMonth()]}` });
      }
    });
    return months.sort((a, b) => a.year * 12 + a.monthIndex - (b.year * 12 + b.monthIndex));
  }, [allTransactions]);

  const defaultMonth = availMonths.length > 0 ? availMonths.find(m => m.monthIndex === 0) || availMonths[0] : null;

  /* Card 2: Who Spends The Most */
  const [card2Month, setCard2Month] = useState(defaultMonth);
  const ALL_CATS = ['Food','Bills','Medical','Shopping','Transport','Entertainment','Education','Rent','Other',
    'Salary','Freelance','Investment','Bonus','Other Income'];
  const [card2Cat, setCard2Cat] = useState('Food');

  const topSpender = useMemo(() => {
    if (!card2Month) return null;
    const { year, monthIndex } = card2Month;
    const userTotals = {};
    allTransactions.forEach(t => {
      if (t.type !== 'expense' || t.category !== card2Cat) return;
      const d = new Date(t.date);
      if (d.getFullYear() !== year || d.getMonth() !== monthIndex) return;
      userTotals[t.username] = (userTotals[t.username] || 0) + t.amount;
    });
    const sorted = Object.entries(userTotals).sort((a, b) => b[1] - a[1]);
    if (!sorted.length) return null;
    const [username, amount] = sorted[0];
    const user = allUsers.find(u => u.username === username);
    return { name: user ? getDisplayName(user) : username, amount };
  }, [allTransactions, allUsers, card2Month, card2Cat]);

  /* Card 3: Where Does the Money Go */
  const [card3Month, setCard3Month] = useState(defaultMonth);
  const [card3User, setCard3User] = useState(allUsers[0]?.username || '');

  const topCategory = useMemo(() => {
    if (!card3Month || !card3User) return null;
    const { year, monthIndex } = card3Month;
    const catTotals = {};
    allTransactions.forEach(t => {
      if (t.type !== 'expense' || t.username !== card3User) return;
      const d = new Date(t.date);
      if (d.getFullYear() !== year || d.getMonth() !== monthIndex) return;
      catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
    });
    const sorted = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
    if (!sorted.length) return null;
    return { category: sorted[0][0], amount: sorted[0][1] };
  }, [allTransactions, card3Month, card3User]);

  /* ── Stacked Bar Chart ── */
  const [chartMonth, setChartMonth] = useState(defaultMonth);

  const chartData = useMemo(() => {
    return allUsers.map(user => {
      let income = 0, expense = 0;
      allTransactions.forEach(t => {
        if (t.username !== user.username) return;
        if (chartMonth) {
          const d = new Date(t.date);
          if (d.getFullYear() !== chartMonth.year || d.getMonth() !== chartMonth.monthIndex) return;
        }
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
      });
      return {
        name: `${user.firstName}`,
        fullName: getDisplayName(user),
        income: Math.round(income),
        expense: Math.round(expense),
      };
    });
  }, [allUsers, allTransactions, chartMonth]);

  const syncMonth = (val, setter) => {
    if (!val) return;
    const [y, m] = val.split('-').map(Number);
    setter(availMonths.find(x => x.year === y && x.monthIndex === m) || null);
  };

  const monthVal = (m) => m ? `${m.year}-${m.monthIndex}` : '';

  return (
    <div className={`admin-dash-section ${cls}`}>
      <div className="admin-dash-page-title">
        <h1>FinSight Admin Page</h1>
      </div>

      {/* ── Active Users Carousel ── */}
      <div className="admin-carousel-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Active Users</h2>
          <span className="admin-section-count">{allUsers.length} users</span>
        </div>
        <div className="admin-carousel-wrapper">
          <button
            className="admin-carousel-btn prev"
            onClick={handlePrev}
            title="Previous users"
            aria-label="Previous users"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Viewport: clips overflow so only VISIBLE cards show */}
          <div className="admin-carousel-viewport" ref={viewportRef}>
            <div
              ref={trackRef}
              className="admin-carousel-track"
              style={{
                transform: `translateX(${translateX})`,
                transition: animated ? 'transform 0.42s cubic-bezier(0.35, 0.46, 0.64, 1)' : 'none',
                '--card-visible': VISIBLE,
                '--gap-px': `${GAP_PX}px`,
              }}
            >
              {clonedUsers.map((user, idx) => {
                const balance = getUserBalance(allTransactions, user.username);
                return (
                  <UserCard
                    key={`${user.username}-${idx}`}
                    user={user}
                    balance={balance}
                    isDark={isDark}
                  />
                );
              })}
            </div>
          </div>

          <button
            className="admin-carousel-btn next"
            onClick={handleNext}
            title="Next users"
            aria-label="Next users"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ── Three Insight Cards ── */}
      <div className="admin-insight-cards">
        {/* Card 1: Total Transactions */}
        <div className={`admin-insight-card card-total ${cls}`}>
          <div className="aic-icon-wrap">
            <DollarSign size={24} />
          </div>
          <div className="aic-body">
            <div className="aic-title">Total Transactions</div>
            <div className="aic-value">{totalTransactions.toLocaleString()}</div>
            <div className="aic-sub">${totalAmount.toLocaleString()} total volume</div>
          </div>
        </div>

        {/* Card 2: Who Spends The Most */}
        <div className={`admin-insight-card card-spender ${cls}`}>
          <div className="aic-icon-wrap">
            <Users size={24} />
          </div>
          <div className="aic-body">
            <div className="aic-title">Who Spends The Most?</div>
            <div className="aic-controls">
              <select className="aic-select" value={monthVal(card2Month)}
                onChange={e => syncMonth(e.target.value, setCard2Month)}>
                {availMonths.map(m => (
                  <option key={monthVal(m)} value={monthVal(m)}>{m.label}</option>
                ))}
              </select>
              <select className="aic-select" value={card2Cat}
                onChange={e => setCard2Cat(e.target.value)}>
                {ALL_CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {topSpender ? (
              <>
                <div className="aic-value highlight">{topSpender.name}</div>
                <div className="aic-sub">${topSpender.amount.toLocaleString()} on {card2Cat}</div>
              </>
            ) : (
              <div className="aic-empty">No data for this selection</div>
            )}
          </div>
        </div>

        {/* Card 3: Where Does the Money Go */}
        <div className={`admin-insight-card card-category ${cls}`}>
          <div className="aic-icon-wrap">
            <TrendingUp size={24} />
          </div>
          <div className="aic-body">
            <div className="aic-title">Where Does the Money Go?</div>
            <div className="aic-controls">
              <select className="aic-select" value={monthVal(card3Month)}
                onChange={e => syncMonth(e.target.value, setCard3Month)}>
                {availMonths.map(m => (
                  <option key={monthVal(m)} value={monthVal(m)}>{m.label}</option>
                ))}
              </select>
              <select className="aic-select" value={card3User}
                onChange={e => setCard3User(e.target.value)}>
                {allUsers.map(u => (
                  <option key={u.username} value={u.username}>{getDisplayName(u)}</option>
                ))}
              </select>
            </div>
            {topCategory ? (
              <>
                <div className="aic-value highlight">{topCategory.category}</div>
                <div className="aic-sub">${topCategory.amount.toLocaleString()} spent</div>
              </>
            ) : (
              <div className="aic-empty">No data for this selection</div>
            )}
          </div>
        </div>
      </div>

      {/* ── Income vs Expense Bar Chart ── */}
      <div className={`admin-bar-chart-card ${cls}`}>
        <div className="admin-bar-chart-header">
          <div>
            <div className="admin-bar-chart-title">Income vs Expense — Per User</div>
            <div className="admin-bar-chart-sub">Total bar height = Income · Coloured segment = Expense</div>
          </div>
          <div className="aic-controls">
            <Calendar size={14} style={{ opacity: 0.6 }} />
            <select className="aic-select" value={monthVal(chartMonth)}
              onChange={e => syncMonth(e.target.value, setChartMonth)}>
              {availMonths.map(m => (
                <option key={monthVal(m)} value={monthVal(m)}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'} />
            <XAxis dataKey="name" tick={{ fill: isDark ? '#536080' : '#94a3b8', fontSize: 12 }}
              axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: isDark ? '#536080' : '#94a3b8', fontSize: 11 }}
              axisLine={false} tickLine={false}
              tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<AdminBarTooltip isDark={isDark} />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="income"  name="Income"  fill="#3d3fbf" radius={[0,0,0,0]} stackId="a" />
            <Bar dataKey="expense" name="Expense" fill="#ffcc00" radius={[4,4,0,0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ── User Carousel Card ── */
function UserCard({ user, balance, isDark }) {
  const [imageError, setImageError] = React.useState(false);
  
  // Check if avatar exists and is valid
  const hasValidAvatar = user.avatar && 
                         typeof user.avatar === 'string' && 
                         user.avatar.trim().length > 0 && 
                         (user.avatar.startsWith('data:') || user.avatar.startsWith('/'));
  
  const shouldShowImage = hasValidAvatar && !imageError;
  
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  const isPositive = balance >= 0;

  const handleImageError = () => {
    console.warn(`Avatar image failed to load for user: ${user.username}`, user.avatar);
    setImageError(true);
  };

  return (
    <div className={`user-card ${isDark ? 'dark' : 'light'}`}>
      <div className="user-card-photo-wrap">
        {shouldShowImage ? (
          <img 
            src={user.avatar} 
            alt={`${user.firstName} ${user.lastName}`} 
            className="user-card-photo"
            onError={handleImageError}
          />
        ) : null}
        <div 
          className="user-card-initials"
          style={{ display: shouldShowImage ? 'none' : 'flex' }}
        >
          {initials}
        </div>
        <div className="user-card-arrow">↗</div>
      </div>
      <div className="user-card-gradient" />
      <div className="user-card-info">
        <div className="user-card-name">{user.firstName} {user.lastName}</div>
        <div className="user-card-profession">{user.profession || user.role}</div>
        <div className="user-card-email">{user.email}</div>
        <div className={`user-card-balance ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : '-'}${Math.abs(balance).toLocaleString(undefined, { minimumFractionDigits: 0 })}
          <span className="user-card-balance-label">net balance</span>
        </div>
      </div>
    </div>
  );
}
