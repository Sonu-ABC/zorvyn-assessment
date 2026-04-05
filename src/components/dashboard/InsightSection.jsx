import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
  getAvailableMonths, getMonthData, getTopExpenseCategories,
  getSpendDays, getDayTransactions, getCategoryVsIncome,
  getWeeklyData, getSpendingTrend, getOrdinal
} from '../../utils/transactionUtils';
import { TrendingUp, TrendingDown, X, ChevronDown, ChevronUp, BarChart3, AlertCircle, CheckCircle, Info, Lightbulb, PiggyBank } from 'lucide-react';
import './InsightSection.css';

/* ── colour palettes ── */
const D = {
  income: '#6366f1', expense: '#f43f5e', savings: '#10b981',
  grid: 'rgba(255,255,255,0.05)', tick: '#536080',
  pie: ['#6366f1','#fca401','#06b6d4','#f5e90b','#10b981','#edb408','#f97316','#84cc16'],
   bar2: '#2373bee8',
  incomeBar: '#ffc400c9',
};
const L = {
  income: '#4f46e5', expense: '#dc2626', savings: '#059669',
  grid: 'rgba(0,0,0,0.06)', tick: '#94a3b8',
  pie: ['#6366f1','#fca401','#06b6d4','#f5e90b','#10b981','#edb408','#f97316','#84cc16'],
  bar2: '#2b7ecbc0',
  incomeBar: '#ffc400e6',
};



const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const ALL_EXP_CATS = ['Food','Bills','Medical','Shopping','Transport','Entertainment','Education','Rent','Other'];

/* ── Custom tooltip ── */
const ChartTip = ({ active, payload, label, isDark }) => {
  if (!active || !payload?.length) return null;
  const bg  = isDark ? '#0d1635' : '#ffffff';
  const bdr = isDark ? 'rgba(99,102,241,0.3)' : '#e2e8f0';
  const txt = isDark ? '#e2e8f0' : '#0f172a';
  return (
    <div style={{ background: bg, border: `1px solid ${bdr}`, borderRadius: 10, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
      <p style={{ color: txt, fontWeight: 700, marginBottom: 4, fontSize: '0.82rem' }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color: p.color || p.fill, fontSize: '0.8rem', margin: '2px 0' }}>
          {p.name}: ${Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

/* ── Small donut for top category card ── */
function CategoryDonut({ pct, color, size = 120 }) {
  const data = [{ value: pct }, { value: Math.max(0, 100 - pct) }];
  return (
    <PieChart width={size} height={size}>
      <Pie
        data={data} cx="50%" cy="50%"
        innerRadius={size * 0.28} outerRadius={size * 0.42}
        startAngle={90} endAngle={-270} dataKey="value" stroke="none"
      >
        <Cell fill={color} />
        <Cell fill="rgba(99,102,241,0.15)" />
      </Pie>
    </PieChart>
  );
}

export default function InsightSection({ transactions, isDark }) {
  const C   = isDark ? D : L;
  const cls = isDark ? 'dark' : 'light';

  const availMonths = useMemo(() => getAvailableMonths(transactions), [transactions]);
  const lastMonth   = availMonths.length > 0 ? availMonths[availMonths.length - 1] : null;

  const [selMonth,    setSelMonth]    = useState(lastMonth);
  const [selCategory, setSelCategory] = useState('Food');
  const [expandedDay, setExpandedDay] = useState(null); // 'max' | 'min' | null
  const [weekMonth,   setWeekMonth]   = useState(lastMonth);

  const year      = selMonth?.year;
  const mi        = selMonth?.monthIndex;
  const monthName = mi !== undefined ? MONTH_NAMES[mi] : '';

  /* ── Computed data ── */
  const monthData = useMemo(
    () => selMonth ? getMonthData(transactions, year, mi) : { income: 0, expense: 0, net: 0 },
    [transactions, selMonth]
  );
  const topCats = useMemo(
    () => selMonth ? getTopExpenseCategories(transactions, year, mi, 2) : [],
    [transactions, selMonth]
  );
  const { maxDay, minDay } = useMemo(
    () => selMonth ? getSpendDays(transactions, year, mi) : { maxDay: null, minDay: null },
    [transactions, selMonth]
  );
  const barData  = useMemo(() => getCategoryVsIncome(transactions, selCategory), [transactions, selCategory]);
  const weekData = useMemo(
    () => weekMonth ? getWeeklyData(transactions, weekMonth.year, weekMonth.monthIndex) : [],
    [transactions, weekMonth]
  );
  const trend = useMemo(() => getSpendingTrend(transactions), [transactions]);

  const expandedTxns = useMemo(() => {
    if (!expandedDay || !selMonth) return [];
    const day = expandedDay === 'max' ? maxDay?.day : minDay?.day;
    return day ? getDayTransactions(transactions, year, mi, day) : [];
  }, [expandedDay, maxDay, minDay, transactions, year, mi, selMonth]);

  const savings    = monthData.net;
  const hasData    = transactions.length > 0;
  const allExpCats = useMemo(
    () => [...new Set(transactions.filter(t => t.type === 'expense').map(t => t.category))],
    [transactions]
  );

  /* ── Inline MonthSelect ── */
  const MonthSelect = ({ value, onChange, opts }) => (
    <select
      className="ins-select"
      value={value ? `${value.year}-${value.monthIndex}` : ''}
      onChange={e => {
        const [y, m] = e.target.value.split('-').map(Number);
        onChange(opts.find(x => x.year === y && x.monthIndex === m) || null);
      }}
    >
      {opts.map(m => (
        <option key={`${m.year}-${m.monthIndex}`} value={`${m.year}-${m.monthIndex}`}>{m.label}</option>
      ))}
    </select>
  );

  if (!hasData) {
    return (
      <div className={`insight-section ${cls}`}>
        <div className="insight-empty">
          <div className="insight-empty-icon">
            <Lightbulb size={40} strokeWidth={1.5} />
          </div>
          <h3>No data to analyse</h3>
          <p>Insights will appear here once you have transactions.</p>
        </div>
      </div>
    );
  }

  /* ── Category donut colours: 1st = expense red, 2nd = purple ── */
  const catColors = [C.expense, C.bar2];

  return (
    <div className={`insight-section ${cls}`}>

      {/* ════ SECTION HEADER ════ */}
      <div className="insight-header">
        <div>
          <h2 className="insight-title">Insights</h2>
          <p className="insight-sub">Deep-dive into your financial patterns</p>
        </div>
        <MonthSelect value={selMonth} onChange={v => { setSelMonth(v); setExpandedDay(null); }} opts={availMonths} />
      </div>

      {/* ════ ROW A: Top-2 category cards + Info boxes ════ */}
      <div className="ins-row ins-row-top">

        {/* Top 2 category cards */}
        {topCats.map((cat, idx) => {
          const pct   = monthData.income > 0 ? Math.round((cat.value / monthData.income) * 100) : 0;
          const color = catColors[idx];
          return (
            <div key={cat.name} className={`ins-card top-cat-card cat-rank-${idx + 1}`}>
              <div className="cat-rank-badge">#{idx + 1} Highest Spend</div>
              <div className="cat-donut-wrap">
                <CategoryDonut pct={pct} color={color} size={108} />
                <span className="cat-donut-pct" style={{ color }}>{pct}%</span>
              </div>
              <div className="cat-info">
                <div className="cat-month-label">{monthName}</div>
                <div className="cat-name" style={{ color }}>{cat.name}</div>
                <div className="cat-amount">${cat.value.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
        {/* Placeholder if fewer than 2 categories */}
        {topCats.length < 2 && (
          <div className="ins-card top-cat-card">
            <span className="ins-na">Not enough data</span>
          </div>
        )}

        {/* Info boxes — one per top category */}
        <div className="ins-info-boxes">
          {topCats.map((cat, idx) => (
            <div key={cat.name} className={`ins-info-box box-${idx + 1}`}>
              <span className="info-box-icon">
                {idx === 0 ? <BarChart3 size={18} /> : <TrendingDown size={18} />}
              </span>
              <p>
                You spent{' '}
                <strong style={{ color: catColors[idx] }}>${cat.value.toLocaleString()}</strong>{' '}
                of your <strong>{monthName}</strong> income
                {monthData.income > 0 && (
                  <> (i.e. <strong>${monthData.income.toLocaleString()}</strong>)</>
                )}{' '}
                on <strong style={{ color: catColors[idx] }}>{cat.name}</strong>
                {monthData.income > 0 && (
                  <> — that's <strong style={{ color: catColors[idx] }}>{Math.round((cat.value / monthData.income) * 100)}%</strong></>
                )}.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ════ ROW B: Category vs Income bar chart ════ */}
      <div className="ins-card ins-chart-card">
        <div className="ins-chart-header">
          <div>
            <div className="ins-card-title">Income vs Category Expense</div>
            <div className="ins-card-sub">Monthly comparison · select a category</div>
          </div>
          <select className="ins-select" value={selCategory} onChange={e => setSelCategory(e.target.value)}>
            {(allExpCats.length ? allExpCats : ALL_EXP_CATS).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
            <XAxis dataKey="month" tick={{ fill: C.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: C.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<ChartTip isDark={isDark} />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="income"      name="Income"      fill={C.incomeBar} radius={[4,4,0,0]} opacity={0.85} />
            <Bar dataKey={selCategory} name={selCategory} fill={C.bar2}      radius={[4,4,0,0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ════ ROW C: Max / Min spend day cards ════ */}
      <div className="ins-row ins-row-days">
        {[
          { type: 'max', dayObj: maxDay, icon: 'up', label: 'Highest Spend Day', color: C.expense, verb: 'most' },
          { type: 'min', dayObj: minDay, icon: 'down', label: 'Lowest Spend Day',  color: C.savings, verb: 'least' },
        ].map(({ type, dayObj, icon, label, color, verb }) => (
          <div key={type} className={`ins-card spend-day-card ${type}`}>
            <div className="spend-day-emoji">
              {icon === 'up' ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
            <div className="spend-day-body">
              <div className="ins-card-title">{label}</div>
              {dayObj ? (
                <p className="spend-day-text">
                  You spent the {verb} on{' '}
                  <span
                    className="spend-day-link"
                    style={{ color }}
                    onClick={() => setExpandedDay(prev => prev === type ? null : type)}
                    title="Click to see transactions"
                  >
                    {getOrdinal(dayObj.day)}
                  </span>{' '}
                  of {monthName} —{' '}
                  <strong style={{ color }}>${dayObj.total.toLocaleString()}</strong>
                </p>
              ) : (
                <p className="ins-na">No expense data</p>
              )}
              {dayObj && (
                <button
                  className="btn-expand-day"
                  onClick={() => setExpandedDay(prev => prev === type ? null : type)}
                  style={{ color }}
                >
                  {expandedDay === type ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                  {expandedDay === type ? 'Hide' : 'View'} transactions on {getOrdinal(dayObj?.day)}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expandable day transaction table */}
      {expandedDay && expandedTxns.length > 0 && (
        <div className="ins-card day-txn-table-wrap">
          <div className="day-txn-header">
            <span className="ins-card-title">
              Transactions on {getOrdinal(expandedDay === 'max' ? maxDay?.day : minDay?.day)} {monthName}
            </span>
            <button className="btn-close-expand" onClick={() => setExpandedDay(null)}><X size={14}/></button>
          </div>
          <table className="day-txn-table">
            <thead>
              <tr>
                <th>Type</th><th>Category</th><th>Description</th><th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expandedTxns.map(t => (
                <tr key={t.id} className={t.type === 'income' ? 'row-income' : 'row-expense'}>
                  <td><span className={`txn-badge ${t.type}`}>{t.type}</span></td>
                  <td>{t.category}</td>
                  <td>{t.description}</td>
                  <td className={`amt ${t.type}`}>{t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════ ROW D: Savings card + Weekend bar chart ════ */}
      <div className="ins-row ins-row-bottom">

        {/* Savings card */}
        <div className={`ins-card savings-card ${savings >= 0 ? 'positive' : 'negative'}`}>
          <div className="savings-icon">
            {savings >= 0 ? <PiggyBank size={28} /> : <AlertCircle size={28} />}
          </div>
          <div className="savings-body">
            <div className="ins-card-title">
              {savings >= 0 ? 'You Saved' : 'You Overspent'}
            </div>
            <div className="savings-amount" style={{ color: savings >= 0 ? C.savings : C.expense }}>
              ${Math.abs(savings).toLocaleString()}
            </div>
            <div className="savings-label">
              in <strong>{monthName}</strong>
            </div>
          </div>
        </div>

        {/* Weekly bar chart */}
        <div className="ins-card ins-chart-card weekend-chart">
          <div className="ins-chart-header">
            <div>
              <div className="ins-card-title">Weekly Spending Trends</div>
              <div className="ins-card-sub">Income · Expense · Savings per week</div>
            </div>
            <MonthSelect value={weekMonth} onChange={setWeekMonth} opts={availMonths} />
          </div>
          {weekData.length > 0 ? (
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={weekData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="week" tick={{ fill: C.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip content={<ChartTip isDark={isDark} />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="expense" name="Expense" fill={C.expense} radius={[4,4,0,0]} />
                <Bar dataKey="income"  name="Income"  fill={C.incomeBar}  radius={[4,4,0,0]} />
                <Bar dataKey="savings" name="Savings" fill={C.savings} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="ins-na" style={{ padding: '40px', textAlign: 'center' }}>
              No weekly data for this month
            </div>
          )}
        </div>
      </div>

      {/* ════ Spending advice banner ════ */}
      <div className={`ins-card advice-banner ${trend.trend}`}>
        <span className="advice-icon">
          {trend.trend === 'increased' && <AlertCircle size={20} />}
          {trend.trend === 'decreased' && <CheckCircle size={20} />}
          {trend.trend === 'stable' && <CheckCircle size={20} />}
          {trend.trend === 'neutral' && <Info size={20} />}
        </span>
        <p className="advice-text">
          {trend.trend === 'increased' && (
            <>Your spending has <strong style={{ color: C.expense }}>increased by {trend.pct}%</strong>{' '}
            compared to last week (${trend.lastWeek.toLocaleString()} → ${trend.thisWeek.toLocaleString()}). <em>Keep an eye on it!</em></>
          )}
          {trend.trend === 'decreased' && (
            <>Your spending has <strong style={{ color: C.savings }}>decreased by {trend.pct}%</strong>{' '}
            compared to last week (${trend.lastWeek.toLocaleString()} → ${trend.thisWeek.toLocaleString()}). <em>Keep it up!</em></>
          )}
          {trend.trend === 'stable' && (
            <>Your spending is <strong>stable</strong> compared to last week — consistent financial habits! 👍</>
          )}
          {trend.trend === 'neutral' && <>Not enough data to compare weekly spending trends.</>}
        </p>
      </div>

    </div>
  );
}
