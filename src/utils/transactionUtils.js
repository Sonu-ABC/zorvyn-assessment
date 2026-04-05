const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/** All unique months in the transaction data, sorted chronologically. */
export function getAvailableMonths(transactions) {
  const seen = new Set();
  const months = [];
  transactions.forEach(t => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!seen.has(key)) {
      seen.add(key);
      months.push({ year: d.getFullYear(), monthIndex: d.getMonth(), label: `${MONTH_FULL[d.getMonth()]}` });
    }
  });
  return months.sort((a, b) => a.year * 12 + a.monthIndex - (b.year * 12 + b.monthIndex));
}

/** Monthly aggregated data for charts. Returns [{month, year, monthIndex, income, expense, savings, balance}] */
export function getMonthlyData(transactions) {
  const map = {};
  transactions.forEach(t => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2,'0')}`;
    if (!map[key]) map[key] = { key, year: d.getFullYear(), monthIndex: d.getMonth(), month: MONTH_ABBR[d.getMonth()], income: 0, expense: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expense += t.amount;
  });
  const sorted = Object.values(map).sort((a, b) => a.key.localeCompare(b.key));
  let cumBalance = 0;
  sorted.forEach(m => {
    m.savings = Math.max(0, m.income - m.expense);
    cumBalance += m.income - m.expense;
    m.balance = Math.round(cumBalance);
  });
  return sorted;
}

/** Income/expense totals for a specific month. */
export function getMonthData(transactions, year, monthIndex) {
  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === monthIndex;
  });
  const income  = filtered.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0);
  const expense = filtered.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);
  return { income, expense, net: income - expense };
}

/** Cumulative total balance across all transactions. */
export function getTotalBalance(transactions) {
  return transactions.reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0);
}

/**
 * Income breakdown by category.
 * Pass year + monthIndex to filter by month, or null for all-time.
 */
export function getIncomeByCategory(transactions, year = null, monthIndex = null) {
  const list = (year !== null && monthIndex !== null)
    ? transactions.filter(t => { const d = new Date(t.date); return t.type === 'income' && d.getFullYear() === year && d.getMonth() === monthIndex; })
    : transactions.filter(t => t.type === 'income');
  const cats = {};
  list.forEach(t => { cats[t.category] = (cats[t.category] || 0) + t.amount; });
  return Object.entries(cats).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
}

/**
 * Expense breakdown by category.
 * Pass year + monthIndex to filter by month, or null for all-time.
 */
export function getExpenseByCategory(transactions, year = null, monthIndex = null) {
  const list = (year !== null && monthIndex !== null)
    ? transactions.filter(t => { const d = new Date(t.date); return t.type === 'expense' && d.getFullYear() === year && d.getMonth() === monthIndex; })
    : transactions.filter(t => t.type === 'expense');
  const cats = {};
  list.forEach(t => { cats[t.category] = (cats[t.category] || 0) + t.amount; });
  return Object.entries(cats).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
}

/** Filter transactions by last N days (relative to latest transaction date). */
export function filterByDays(transactions, days) {
  if (!transactions.length) return [];
  const latest = new Date(Math.max(...transactions.map(t => new Date(t.date).getTime())));
  const cutoff  = new Date(latest);
  cutoff.setDate(cutoff.getDate() - days);
  return transactions.filter(t => new Date(t.date) >= cutoff);
}

// ─── Insight utilities ─────────────────────────────────────────────────────

/** Top N expense categories for a given month. */
export function getTopExpenseCategories(transactions, year, monthIndex, n = 2) {
  const list = transactions.filter(t => {
    const d = new Date(t.date);
    return t.type === 'expense' && d.getFullYear() === year && d.getMonth() === monthIndex;
  });
  const cats = {};
  list.forEach(t => { cats[t.category] = (cats[t.category] || 0) + t.amount; });
  return Object.entries(cats).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, n);
}

/** Day with max and min total expense in a month. Returns {maxDay:{day,total}, minDay:{day,total}}. */
export function getSpendDays(transactions, year, monthIndex) {
  const list = transactions.filter(t => {
    const d = new Date(t.date);
    return t.type === 'expense' && d.getFullYear() === year && d.getMonth() === monthIndex;
  });
  const dayMap = {};
  list.forEach(t => {
    const day = new Date(t.date).getDate();
    dayMap[day] = (dayMap[day] || 0) + t.amount;
  });
  const entries = Object.entries(dayMap).map(([day, total]) => ({ day: parseInt(day), total }));
  if (!entries.length) return { maxDay: null, minDay: null };
  const maxDay = entries.reduce((a,b) => a.total > b.total ? a : b);
  const minDay = entries.reduce((a,b) => a.total < b.total ? a : b);
  return { maxDay, minDay };
}

/** All transactions on a specific calendar day. */
export function getDayTransactions(transactions, year, monthIndex, day) {
  return transactions.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === monthIndex && d.getDate() === day;
  });
}

/** Monthly income vs selected category expense – for bar chart. */
export function getCategoryVsIncome(transactions, category) {
  return getMonthlyData(transactions).map(m => {
    const catExp = transactions.filter(t => {
      const d = new Date(t.date);
      return t.type === 'expense' && t.category === category &&
             d.getFullYear() === m.year && d.getMonth() === m.monthIndex;
    }).reduce((s,t) => s + t.amount, 0);
    return { month: m.month, income: m.income, [category]: catExp };
  });
}

/** Weekly expense/income/savings grouped by week number within a month. */
export function getWeeklyData(transactions, year, monthIndex) {
  const list = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === monthIndex;
  });
  const weeks = {};
  list.forEach(t => {
    const d = new Date(t.date);
    const wn  = Math.floor((d.getDate() - 1) / 7) + 1;
    const key = `Week ${wn}`;
    if (!weeks[key]) weeks[key] = { week: key, income: 0, expense: 0 };
    if (t.type === 'income') weeks[key].income += t.amount;
    else weeks[key].expense += t.amount;
  });
  return Object.values(weeks)
    .sort((a,b) => a.week.localeCompare(b.week))
    .map(w => ({ ...w, savings: Math.max(0, w.income - w.expense) }));
}

/** Compare last-7-days vs previous-7-days expense (relative to latest expense date). */
export function getSpendingTrend(transactions) {
  const expenses = transactions.filter(t => t.type === 'expense');
  if (!expenses.length) return { trend: 'neutral', increase: false, pct: 0, thisWeek: 0, lastWeek: 0 };

  const latest   = new Date(Math.max(...expenses.map(t => new Date(t.date).getTime())));
  const weekAgo  = new Date(latest);  weekAgo.setDate(weekAgo.getDate() - 7);
  const twoWkAgo = new Date(latest); twoWkAgo.setDate(twoWkAgo.getDate() - 14);

  const thisWeek = expenses.filter(t => new Date(t.date) > weekAgo).reduce((s,t) => s + t.amount, 0);
  const lastWeek = expenses.filter(t => { const d = new Date(t.date); return d > twoWkAgo && d <= weekAgo; }).reduce((s,t) => s + t.amount, 0);

  if (lastWeek === 0) return { trend: 'neutral', increase: false, pct: 0, thisWeek, lastWeek };
  const change = ((thisWeek - lastWeek) / lastWeek) * 100;
  return {
    trend:    change > 5 ? 'increased' : change < -5 ? 'decreased' : 'stable',
    increase: change > 5,
    pct:      Math.abs(change).toFixed(1),
    thisWeek, lastWeek,
  };
}

/** Ordinal suffix: 1→"1st", 2→"2nd", 14→"14th", 21→"21st" */
export function getOrdinal(n) {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

export { MONTH_FULL, MONTH_ABBR };
