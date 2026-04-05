import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';
import {
  getMonthlyData, getMonthData, getTotalBalance,
  getAvailableMonths, getIncomeByCategory, getExpenseByCategory
} from '../../utils/transactionUtils';
import { Calendar, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import './HomeSection.css';

/* ── colour palettes ── */
const D = {
  bar:     '#e59409', line:    '#06b6d4',
  income:  '#6366f1', expense: '#e93107',
  savings: '#10b981', grid:    'rgba(27, 214, 168, 0.05)',
  tick:    '#536080', tooltipBg: '#0d1635',
  pie: ['#6366f1','#fca401','#06b6d4','#f5e90b','#10b981','#edb408','#f97316','#84cc16'],
  pieExp: ['#c79705','#4c4ec3','#4c0490','#f97316','#f43f5e','#f59e0b','#06b6d4','#6366f1','#10b981','#ec4899'],
  ring1: '#f67f0f', ring2: '#2f3a9b',
};
const L = {
  bar:     '#e59409', line:    '#06b6d4',
  income:  '#6366f1', expense: '#e93107',
  savings: '#10b981', grid:    'rgba(246, 250, 249, 0.05)',
  tick:    '#536080', tooltipBg: '#0d1635',
  pie: ['#6366f1','#fca401','#06b6d4','#f5e90b','#10b981','#edb408','#f97316','#84cc16'],
  pieExp: ['#c79705','#4c4ec3','#4c0490','#f97316','#f43f5e','#f59e0b','#06b6d4','#6366f1','#10b981','#ec4899'],
  ring1: '#f67f0f', ring2: '#2f3a9b',
};
const k = {
  bar:     '#4f46e5', line:    '#0891b2',
  income:  '#4f46e5', expense: '#dc2626',
  savings: '#059669', grid:    'rgba(0,0,0,0.06)',
  tick:    '#94a3b8', tooltipBg: '#ffffff',
  pie: ['#4f46e5','#7c3aed','#0891b2','#d97706','#059669','#dc2626','#c2410c','#65a30d'],
  pieExp: ['#dc2626','#c2410c','#d97706','#7c3aed','#0891b2','#4f46e5','#059669','#db2777'],
  ring1: '#dc2626', ring2: '#3b82f6',
};
/* ── custom tooltip ── */
const CustomTooltip = ({ active, payload, label, isDark, prefix='$' }) => {
  if (!active || !payload?.length) return null;
  const bg = isDark ? '#0d1635' : '#ffffff';
  const border = isDark ? 'rgba(99,102,241,0.3)' : '#e2e8f0';
  const txt = isDark ? '#e2e8f0' : '#0f172a';
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
      <p style={{ color: txt, fontWeight: 700, marginBottom: 4, fontSize: '0.82rem' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: '0.8rem', margin: '2px 0' }}>
          {p.name}: {prefix}{Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

/* ── Donut label ── */
const RingLabel = ({ cx, cy, pct }) => (
  <>
    <text x={cx} y={cy - 8} textAnchor="middle" fill="#f43f5e" fontSize={26} fontWeight={800}>{pct}%</text>
    <text x={cx} y={cy + 16} textAnchor="middle" fill="#8292b4" fontSize={11}>of income</text>
  </>
);

/* ── Pie custom label ── */
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function HomeSection({ transactions, isDark, user }) {
  const C = isDark ? D : L;
  const [activeIncomeSlice, setActiveIncomeSlice] = useState(-1);
  const [activeExpenseSlice, setActiveExpenseSlice] = useState(-1);

  /* ── available months ── */
  const availMonths = useMemo(() => getAvailableMonths(transactions), [transactions]);
  const defaultMonth = availMonths.length > 0 ? availMonths[availMonths.length - 1] : null;
  const [selMonth, setSelMonth] = useState(defaultMonth);

  const monthlyData   = useMemo(() => getMonthlyData(transactions), [transactions]);
  const monthData     = useMemo(() => selMonth ? getMonthData(transactions, selMonth.year, selMonth.monthIndex) : { income: 0, expense: 0, net: 0 }, [transactions, selMonth]);
  const totalBalance  = useMemo(() => getTotalBalance(transactions), [transactions]);
  const incomeByCategory  = useMemo(() => getIncomeByCategory(transactions,  selMonth?.year ?? null, selMonth?.monthIndex ?? null), [transactions, selMonth]);
  const expenseByCategory = useMemo(() => getExpenseByCategory(transactions, selMonth?.year ?? null, selMonth?.monthIndex ?? null), [transactions, selMonth]);

  const expensePct = monthData.income > 0 ? Math.round((monthData.expense / monthData.income) * 100) : 0;
  const ringData   = [
    { name: 'Expenses', value: expensePct },
    { name: 'Remaining', value: Math.max(0, 100 - expensePct) },
  ];

  const hasData = transactions.length > 0;

  return (
    <div className={`home-section ${isDark ? 'dark' : 'light'}`}>

      {/* ── ROW 1: Balance card + Monthly stats + Ring chart ── */}
      <div className="home-row home-row-top">

        {/* Credit card */}
        <div className="dash-card credit-card-wrap">
          <div className="credit-card">
            <div className="cc-watermark" />
            <div className="cc-row cc-top">
              <div className="cc-brand">FinSight</div>
              <CreditCard size={22} color="rgba(255,255,255,0.7)" />
            </div>
            <div className="cc-chip" />
            <div className="cc-number">••••  ••••  ••••  4291</div>
            <div className="cc-row cc-bottom">
              <div>
                <div className="cc-label">NET BALANCE</div>
                <div className="cc-balance">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div className="cc-holder">
                <div className="cc-label">CARD HOLDER</div>
                <div className="cc-holdername">{user?.firstName} {user?.lastName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Income / Expense */}
        <div className="dash-card monthly-stats-card">
          <div className="monthly-header">
            <span className="card-title"><Calendar size={15} /> Monthly Summary</span>
            <select
              className="month-select"
              value={selMonth ? `${selMonth.year}-${selMonth.monthIndex}` : ''}
              onChange={e => {
                const [y, m] = e.target.value.split('-').map(Number);
                setSelMonth(availMonths.find(x => x.year === y && x.monthIndex === m) || null);
              }}
            >
              {availMonths.map(m => (
                <option key={`${m.year}-${m.monthIndex}`} value={`${m.year}-${m.monthIndex}`}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="monthly-stats-body">
            <div className="monthly-stat income-stat">
              <TrendingUp size={18} />
              <div>
                <div className="stat-label">Total Income</div>
                <div className="stat-value income-val">${monthData.income.toLocaleString()}</div>
              </div>
            </div>
            <div className="monthly-stat expense-stat">
              <TrendingDown size={18} />
              <div>
                <div className="stat-label">Total Expense</div>
                <div className="stat-value expense-val">${monthData.expense.toLocaleString()}</div>
              </div>
            </div>
            <div className="monthly-net">
              <span className="stat-label">Net</span>
              <span className={`net-val ${monthData.net >= 0 ? 'positive' : 'negative'}`}>
                {monthData.net >= 0 ? '+' : ''}${monthData.net.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Ring / Donut chart */}
        <div className="dash-card ring-card">
          <div className="card-title">Expense Ratio</div>
          <div className="card-subtitle">{selMonth?.label}</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={ringData} cx="50%" cy="50%"
                innerRadius={58} outerRadius={78}
                startAngle={90} endAngle={-270}
                dataKey="value" stroke="none"
              >
                <Cell fill={C.ring1} />
                <Cell fill={C.ring2} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="ring-center-label">
            <span className="ring-pct" style={{ color: C.ring1 }}>{expensePct}%</span>
            <span className="ring-sublabel">of income spent</span>
          </div>
          <div className="ring-legend">
            <span style={{ color: C.ring1 }}>● Expenses</span>
            <span style={{ color: C.ring2 }}>● Income</span>
          </div>
        </div>
      </div>

      {/* ── ROW 2: Bar+Line chart + Income Pie ── */}
      <div className="home-row home-row-mid">

        {/* Bar + Line chart */}
        <div className="dash-card bar-line-card">
          <div className="card-title">Income vs Balance Trend</div>
          <div className="card-subtitle">Monthly overview · Jan – Dec 2025</div>
          {hasData ? (
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="month" tick={{ fill: C.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.tick, fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip isDark={isDark} />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="income" name="Income" fill={C.bar} radius={[4,4,0,0]} opacity={0.9} />
                <Line dataKey="balance" name="Cum. Balance" type="monotone" stroke={C.line}
                  strokeWidth={2.5} dot={{ fill: C.line, r: 3 }} activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>


        {/* Income pie */}
        <div className="dash-card income-pie-card">
          <div className="card-title">Income Analysis</div>
          <div className="card-subtitle">By category</div>
          {hasData && incomeByCategory.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={incomeByCategory} cx="50%" cy="50%"
                    outerRadius={75} dataKey="value" labelLine={false}
                    label={renderPieLabel} stroke="none"
                    activeIndex={activeIncomeSlice}
                    activeOuterRadius={85}
                    onMouseEnter={(_, i) => setActiveIncomeSlice(i)}
                    onMouseLeave={() => setActiveIncomeSlice(-1)}>
                    {incomeByCategory.map((_, i) => <Cell key={i} fill={C.pie[i % C.pie.length]} />)}
                  </Pie>
                  <Tooltip 
                    formatter={(v) => [`$${v.toLocaleString()}`, '']}
                    contentStyle={{ 
                      boxShadow: `0 0 20px ${C.pie[0]}80`,
                      filter: `drop-shadow(0 0 8px ${C.pie[0]}40)`
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {incomeByCategory.map((d, i) => (
                  <div key={d.name} className="pie-legend-item">
                    <span className="legend-dot" style={{ background: C.pie[i % C.pie.length] }} />
                    <span className="legend-label">{d.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : <EmptyChart />}
        </div>
      </div>

      {/* ── ROW 3: Expense Pie + Area chart ── */}
      <div className="home-row home-row-bottom">

        {/* Expense pie */}
        <div className="dash-card expense-pie-card">
          <div className="card-title">Expense Distribution</div>
          <div className="card-subtitle">By category</div>
          {hasData && expenseByCategory.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={expenseByCategory} cx="50%" cy="50%"
                    outerRadius={75} dataKey="value" labelLine={false}
                    label={renderPieLabel} stroke="none"
                    activeIndex={activeExpenseSlice}
                    activeOuterRadius={85}
                    onMouseEnter={(_, i) => setActiveExpenseSlice(i)}
                    onMouseLeave={() => setActiveExpenseSlice(-1)}>
                    {expenseByCategory.map((_, i) => <Cell key={i} fill={C.pieExp[i % C.pieExp.length]} />)}
                  </Pie>
                  <Tooltip 
                    formatter={(v) => [`$${v.toLocaleString()}`, '']}
                    contentStyle={{ 
                      boxShadow: `0 0 20px ${C.pieExp[0]}80`,
                      filter: `drop-shadow(0 0 8px ${C.pieExp[0]}40)`
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {expenseByCategory.slice(0, 6).map((d, i) => (
                  <div key={d.name} className="pie-legend-item">
                    <span className="legend-dot" style={{ background: C.pieExp[i % C.pieExp.length] }} />
                    <span className="legend-label">{d.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : <EmptyChart />}
        </div>

        {/* Savings vs Expense area chart */}
        <div className="dash-card area-chart-card">
          <div className="card-title">Savings vs Expenses</div>
          <div className="card-subtitle">Monthly trend</div>
          {hasData ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.savings}  stopOpacity={0.5} />
                    <stop offset="95%" stopColor={C.savings}  stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.expense}  stopOpacity={0.5} />
                    <stop offset="95%" stopColor={C.expense}  stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
                <XAxis dataKey="month" tick={{ fill: C.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.tick, fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip isDark={isDark} />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="savings" name="Savings" stroke={C.savings}
                  fill="url(#gradSavings)" strokeWidth={2} />
                <Area type="monotone" dataKey="expense" name="Expenses" stroke={C.expense}
                  fill="url(#gradExpense)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </div>
      </div>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="empty-chart">
      <span>No data available</span>
    </div>
  );
}
