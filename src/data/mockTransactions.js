/**
 * Mock transactions dataset for FinSight.
 * Keyed by username to match mockUsers.js entries.
 *
 * Each transaction: { id, date, type, category, description, amount }
 *   - type:   'income' | 'expense'
 *   - amount: always positive
 */

export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other Income'],
  expense: ['Food', 'Bills', 'Medical', 'Shopping', 'Transport', 'Entertainment', 'Education', 'Rent', 'Other'],
};

// ─────────────────────────────────────────────────────────────────
// john_doe  — mid-level employee, side freelancer, careful spender
// ─────────────────────────────────────────────────────────────────
const johnDoeTransactions = [
  // January
  { id: 'jd-1', date: '2025-01-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 62000 },
  { id: 'jd-2', date: '2025-01-02', type: 'expense', category: 'Rent', description: 'January rent', amount: 1100 },
  { id: 'jd-3', date: '2025-01-05', type: 'expense', category: 'Bills', description: 'Electricity & internet', amount: 140 },
  { id: 'jd-4', date: '2025-01-08', type: 'expense', category: 'Food', description: 'Grocery run', amount: 90 },
  { id: 'jd-5', date: '2025-01-12', type: 'expense', category: 'Transport', description: 'Monthly metro pass', amount: 60 },
  { id: 'jd-6', date: '2025-01-18', type: 'income', category: 'Freelance', description: 'Design project', amount: 2000 },
  { id: 'jd-7', date: '2025-01-20', type: 'expense', category: 'Entertainment', description: 'Netflix & Spotify', amount: 25 },
  { id: 'jd-8', date: '2025-01-25', type: 'expense', category: 'Food', description: 'Restaurant dinner', amount: 65 },
  { id: 'jd-9', date: '2025-01-28', type: 'expense', category: 'Education', description: 'Online course', amount: 29 },
  // February
  { id: 'jd-10', date: '2025-02-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 620000 },
  { id: 'jd-11', date: '2025-02-02', type: 'expense', category: 'Rent', description: 'February rent', amount: 110000 },
  { id: 'jd-12', date: '2025-02-05', type: 'expense', category: 'Bills', description: 'Gas & water', amount: 100005 },
  { id: 'jd-13', date: '2025-02-10', type: 'income', category: 'Investment', description: 'Dividend payout', amount: 40020 },
  { id: 'jd-14', date: '2025-02-14', type: 'expense', category: 'Shopping', description: "Valentine's gift", amount: 75 },
  { id: 'jd-15', date: '2025-02-18', type: 'expense', category: 'Medical', description: 'Doctor visit', amount: 50 },
  { id: 'jd-16', date: '2025-02-22', type: 'expense', category: 'Food', description: 'Grocery run', amount: 200008 },
  { id: 'jd-17', date: '2025-02-25', type: 'expense', category: 'Entertainment', description: 'Movie tickets', amount: 36 },
  { id: 'jd-18', date: '2025-02-28', type: 'income', category: 'Freelance', description: 'Copywriting gig', amount: 10050 },
  // March
  { id: 'jd-19', date: '2025-03-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 6200 },
  { id: 'jd-20', date: '2025-03-02', type: 'expense', category: 'Rent', description: 'March rent', amount: 1100 },
  { id: 'jd-21', date: '2025-03-07', type: 'expense', category: 'Food', description: 'Grocery run', amount: 97 },
  { id: 'jd-22', date: '2025-03-10', type: 'expense', category: 'Medical', description: 'Dental check-up', amount: 180 },
  { id: 'jd-23', date: '2025-03-15', type: 'income', category: 'Bonus', description: 'Q1 performance bonus', amount: 12000 },
  { id: 'jd-24', date: '2025-03-20', type: 'expense', category: 'Shopping', description: 'New shoes', amount: 85 },
  { id: 'jd-25', date: '2025-03-24', type: 'expense', category: 'Transport', description: 'Taxi rides', amount: 48 },
  { id: 'jd-26', date: '2025-03-28', type: 'expense', category: 'Food', description: 'Birthday dinner', amount: 120 },
  { id: 'jd-27', date: '2025-03-30', type: 'income', category: 'Investment', description: 'Stock profit', amount: 5400 },
  // April
  { id: 'jd-28', date: '2025-04-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 202000 },
  { id: 'jd-29', date: '2025-04-02', type: 'expense', category: 'Rent', description: 'April rent', amount: 1100 },
  { id: 'jd-30', date: '2025-04-06', type: 'expense', category: 'Bills', description: 'Electricity', amount: 128 },
  { id: 'jd-31', date: '2025-04-10', type: 'expense', category: 'Food', description: 'Weekly groceries', amount: 93 },
  { id: 'jd-32', date: '2025-04-15', type: 'income', category: 'Freelance', description: 'Web dev contract', amount: 1200 },
  { id: 'jd-33', date: '2025-04-20', type: 'expense', category: 'Transport', description: 'Car service', amount: 110 },
  { id: 'jd-34', date: '2025-04-25', type: 'expense', category: 'Entertainment', description: 'Concert ticket', amount: 80 },
  // May
  { id: 'jd-35', date: '2025-05-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 12200 },
  { id: 'jd-36', date: '2025-05-02', type: 'expense', category: 'Rent', description: 'May rent', amount: 110000 },
  { id: 'jd-37', date: '2025-05-08', type: 'expense', category: 'Food', description: 'Groceries', amount: 85 },
  { id: 'jd-38', date: '2025-05-12', type: 'expense', category: 'Medical', description: 'Eye exam & glasses', amount: 230 },
  { id: 'jd-39', date: '2025-05-15', type: 'income', category: 'Investment', description: 'Dividend payout', amount: 3520 },
  { id: 'jd-40', date: '2025-05-20', type: 'expense', category: 'Shopping', description: 'Tech gadget', amount: 200099 },
  { id: 'jd-41', date: '2025-05-27', type: 'expense', category: 'Bills', description: 'Phone plan', amount: 45 },
  // June
  { id: 'jd-42', date: '2025-06-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 30000 },
  { id: 'jd-43', date: '2025-06-02', type: 'expense', category: 'Rent', description: 'June rent', amount: 1100 },
  { id: 'jd-44', date: '2025-06-05', type: 'expense', category: 'Bills', description: 'Electricity (AC season)', amount: 170 },
  { id: 'jd-45', date: '2025-06-10', type: 'income', category: 'Freelance', description: 'UI design project', amount: 1500 },
  { id: 'jd-46', date: '2025-06-15', type: 'expense', category: 'Food', description: 'Vacation dining', amount: 155 },
  { id: 'jd-47', date: '2025-06-20', type: 'expense', category: 'Transport', description: 'Flight tickets', amount: 390 },
  { id: 'jd-48', date: '2025-06-25', type: 'expense', category: 'Entertainment', description: 'Vacation activities', amount: 195 },
  // Weekend entries (May)
  { id: 'jd-w1', date: '2025-05-03', type: 'expense', category: 'Food', description: 'Weekend brunch', amount: 54 },
  { id: 'jd-w2', date: '2025-05-04', type: 'expense', category: 'Entertainment', description: 'Sunday movie', amount: 28 },
  { id: 'jd-w3', date: '2025-05-10', type: 'expense', category: 'Shopping', description: 'Weekend errands', amount: 115 },
  { id: 'jd-w4', date: '2025-05-11', type: 'expense', category: 'Food', description: 'Sunday dinner out', amount: 72 },
  { id: 'jd-w5', date: '2025-05-17', type: 'expense', category: 'Transport', description: 'Weekend road trip fuel', amount: 65 },
  { id: 'jd-w6', date: '2025-05-18', type: 'expense', category: 'Entertainment', description: 'Park & activities', amount: 48 },
  { id: 'jd-w7', date: '2025-05-24', type: 'income', category: 'Other Income', description: 'Freelance side gig', amount: 10000 },
  { id: 'jd-w8', date: '2025-05-25', type: 'expense', category: 'Food', description: 'BBQ groceries', amount: 88 },
  // Weekend entries (June)
  { id: 'jd-w9', date: '2025-06-07', type: 'expense', category: 'Food', description: 'Weekend groceries', amount: 95 },
  { id: 'jd-w10', date: '2025-06-08', type: 'expense', category: 'Entertainment', description: 'Sunday outing', amount: 62 },
  { id: 'jd-w11', date: '2025-06-14', type: 'expense', category: 'Shopping', description: 'Weekend shopping', amount: 110 },
  { id: 'jd-w12', date: '2025-06-21', type: 'expense', category: 'Food', description: 'Family weekend lunch', amount: 85 },
  { id: 'jd-w13', date: '2025-06-22', type: 'income', category: 'Other Income', description: 'Weekend freelance task', amount: 30000 },
  { id: 'jd-w14', date: '2025-06-28', type: 'expense', category: 'Entertainment', description: 'Saturday concert', amount: 140 },

  // JULY - DECEMBER (append)
  { id: 'jd-49', date: '2025-07-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 512200 },
  { id: 'jd-50', date: '2025-07-03', type: 'expense', category: 'Rent', description: 'Apartment rent', amount: 1500 },
  { id: 'jd-51', date: '2025-07-06', type: 'expense', category: 'Food', description: 'Groceries', amount: 600 },
  { id: 'jd-52', date: '2025-07-10', type: 'income', category: 'Freelance', description: 'Small freelance project', amount: 11200 },
  { id: 'jd-53', date: '2025-07-14', type: 'expense', category: 'Bill', description: 'Electricity bill', amount: 300 },

  { id: 'jd-54', date: '2025-08-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 20200 },
  { id: 'jd-55', date: '2025-08-04', type: 'expense', category: 'Food', description: 'Groceries', amount: 650 },
  { id: 'jd-56', date: '2025-08-08', type: 'expense', category: 'Entertainment', description: 'Movie night', amount: 400 },
  { id: 'jd-57', date: '2025-08-12', type: 'income', category: 'Freelance', description: 'Bug fix project', amount: 1000 },
  { id: 'jd-58', date: '2025-08-16', type: 'expense', category: 'Bill', description: 'Internet bill', amount: 350 },

  { id: 'jd-59', date: '2025-09-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 592020 },
  { id: 'jd-60', date: '2025-09-03', type: 'expense', category: 'Rent', description: 'Apartment rent', amount: 100500 },
  { id: 'jd-61', date: '2025-09-06', type: 'expense', category: 'Food', description: 'Groceries', amount: 700000 },
  { id: 'jd-62', date: '2025-09-10', type: 'income', category: 'Freelance', description: 'Client website update', amount: 1300 },
  { id: 'jd-63', date: '2025-09-15', type: 'expense', category: 'Shopping', description: 'Clothing', amount: 30000 },

  { id: 'jd-64', date: '2025-10-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 40000 },
  { id: 'jd-65', date: '2025-10-05', type: 'expense', category: 'Food', description: 'Groceries', amount: 650 },
  { id: 'jd-66', date: '2025-10-09', type: 'expense', category: 'Bill', description: 'Electricity bill', amount: 32000 },
  { id: 'jd-67', date: '2025-10-12', type: 'income', category: 'Freelance', description: 'Quick freelance gig', amount: 1000 },
  { id: 'jd-68', date: '2025-10-16', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 500 },

  { id: 'jd-69', date: '2025-11-03', type: 'expense', category: 'Rent', description: 'Apartment rent', amount: 550000 },
  { id: 'jd-70', date: '2025-11-07', type: 'expense', category: 'Food', description: 'Groceries', amount: 700 },
  { id: 'jd-71', date: '2025-11-11', type: 'income', category: 'Freelance', description: 'UI tweak project', amount: 445000 },
  { id: 'jd-72', date: '2025-11-15', type: 'expense', category: 'Entertainment', description: 'Streaming subscription', amount: 300 },

  { id: 'jd-73', date: '2025-12-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 152200 },
  { id: 'jd-74', date: '2025-12-04', type: 'expense', category: 'Food', description: 'Groceries', amount: 7500 },
  { id: 'jd-75', date: '2025-12-08', type: 'expense', category: 'Shopping', description: 'Holiday shopping', amount: 220000 },
  { id: 'jd-76', date: '2025-12-12', type: 'income', category: 'Freelance', description: 'Year-end freelance work', amount: 15500 },
  { id: 'jd-77', date: '2025-12-18', type: 'expense', category: 'Bill', description: 'Utilities', amount: 40000 },
];



//Sofia---------------------------------------------------------------------//


const sofiaTransactions = [
  { id: 'sof-1', date: '2025-01-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-2', date: '2025-01-03', type: 'expense', category: 'Education', description: 'Course fee', amount: 3000 },
  { id: 'sof-3', date: '2025-01-05', type: 'expense', category: 'Food', description: 'Snacks', amount: 600 },
  { id: 'sof-4', date: '2025-01-08', type: 'expense', category: 'Entertainment', description: 'Movie outing', amount: 400 },

  { id: 'sof-5', date: '2025-02-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-6', date: '2025-02-04', type: 'expense', category: 'Education', description: 'Books purchase', amount: 1500 },

  { id: 'sof-7', date: '2025-03-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-8', date: '2025-03-05', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },

  { id: 'sof-9', date: '2025-04-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-10', date: '2025-04-06', type: 'expense', category: 'Education', description: 'Online course', amount: 2000 },

  { id: 'sof-11', date: '2025-05-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-12', date: '2025-05-07', type: 'expense', category: 'Food', description: 'Snacks', amount: 800 },

  { id: 'sof-13', date: '2025-06-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-14', date: '2025-06-09', type: 'expense', category: 'Entertainment', description: 'Movie', amount: 500 },

  { id: 'sof-15', date: '2025-07-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-16', date: '2025-07-08', type: 'expense', category: 'Education', description: 'Exam fee', amount: 2500 },

  { id: 'sof-17', date: '2025-08-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-18', date: '2025-08-05', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },

  { id: 'sof-19', date: '2025-09-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-20', date: '2025-09-10', type: 'expense', category: 'Education', description: 'Books', amount: 2000 },

  { id: 'sof-21', date: '2025-10-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-22', date: '2025-10-07', type: 'expense', category: 'Food', description: 'Snacks', amount: 600 },

  { id: 'sof-23', date: '2025-11-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-24', date: '2025-11-06', type: 'expense', category: 'Entertainment', description: 'Movie', amount: 500 },

  { id: 'sof-25', date: '2025-12-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'sof-26', date: '2025-12-05', type: 'expense', category: 'Education', description: 'Course subscription', amount: 2500 },

  { id: 'sof-27', date: '2025-12-07', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },
  { id: 'sof-28', date: '2025-12-08', type: 'expense', category: 'Other Expense', description: 'Stationery', amount: 500 },
  { id: 'sof-29', date: '2025-12-09', type: 'expense', category: 'Entertainment', description: 'Movie', amount: 600 },
  { id: 'sof-30', date: '2025-12-10', type: 'expense', category: 'Food', description: 'Snacks', amount: 800 },
  { id: 'sof-31', date: '2025-12-11', type: 'expense', category: 'Education', description: 'Books', amount: 1500 },
  { id: 'sof-32', date: '2025-12-12', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 400 },
  { id: 'sof-33', date: '2025-12-13', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },
  { id: 'sof-34', date: '2025-12-14', type: 'expense', category: 'Entertainment', description: 'Outing', amount: 800 },
  { id: 'sof-35', date: '2025-12-15', type: 'expense', category: 'Education', description: 'Exam prep', amount: 2000 },
  { id: 'sof-36', date: '2025-12-16', type: 'expense', category: 'Food', description: 'Snacks', amount: 600 },
  { id: 'sof-37', date: '2025-12-17', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 500 },
  { id: 'sof-38', date: '2025-12-18', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },
  { id: 'sof-39', date: '2025-12-19', type: 'expense', category: 'Entertainment', description: 'Movie', amount: 600 },
  { id: 'sof-40', date: '2025-12-20', type: 'expense', category: 'Food', description: 'Snacks', amount: 800 },
  { id: 'sof-41', date: '2025-12-21', type: 'expense', category: 'Education', description: 'Books', amount: 1500 },
  { id: 'sof-42', date: '2025-12-22', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 400 },
  { id: 'sof-43', date: '2025-12-23', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },
  { id: 'sof-44', date: '2025-12-24', type: 'expense', category: 'Entertainment', description: 'Outing', amount: 800 },
  { id: 'sof-45', date: '2025-12-25', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 500 },
];

// ─────────────────────────────────────────────────────────────────
// jane_doe  — high earner, lifestyle spender, heavy shopping & dining
// ─────────────────────────────────────────────────────────────────
const janeDoeTransactions = [
  // January
  { id: 'jane-1', date: '2025-01-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 7800 },
  { id: 'jane-2', date: '2025-01-02', type: 'expense', category: 'Rent', description: 'January rent (downtown)', amount: 2000 },
  { id: 'jane-3', date: '2025-01-04', type: 'expense', category: 'Shopping', description: 'Designer handbag', amount: 450 },
  { id: 'jane-4', date: '2025-01-07', type: 'expense', category: 'Food', description: 'Fine dining', amount: 210 },
  { id: 'jane-5', date: '2025-01-10', type: 'expense', category: 'Bills', description: 'Utilities bundle', amount: 200 },
  { id: 'jane-6', date: '2025-01-14', type: 'expense', category: 'Entertainment', description: 'Spa day', amount: 180 },
  { id: 'jane-7', date: '2025-01-18', type: 'income', category: 'Investment', description: 'ETF dividend', amount: 620 },
  { id: 'jane-8', date: '2025-01-20', type: 'expense', category: 'Transport', description: 'Car loan payment', amount: 480 },
  { id: 'jane-9', date: '2025-01-25', type: 'expense', category: 'Food', description: 'Weekly meal kits', amount: 130 },
  { id: 'jane-10', date: '2025-01-28', type: 'expense', category: 'Medical', description: 'Personal trainer', amount: 200 },
  // February
  { id: 'jane-11', date: '2025-02-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 7800 },
  { id: 'jane-12', date: '2025-02-02', type: 'expense', category: 'Rent', description: 'February rent', amount: 2000 },
  { id: 'jane-13', date: '2025-02-05', type: 'expense', category: 'Shopping', description: 'Skincare & beauty', amount: 320 },
  { id: 'jane-14', date: '2025-02-10', type: 'expense', category: 'Food', description: "Valentine's dinner", amount: 280 },
  { id: 'jane-15', date: '2025-02-14', type: 'income', category: 'Bonus', description: 'Annual bonus tranche', amount: 2500 },
  { id: 'jane-16', date: '2025-02-17', type: 'expense', category: 'Entertainment', description: 'Weekend getaway', amount: 650 },
  { id: 'jane-17', date: '2025-02-22', type: 'expense', category: 'Bills', description: 'Streaming + cloud subs', amount: 85 },
  { id: 'jane-18', date: '2025-02-25', type: 'expense', category: 'Medical', description: 'Therapy session', amount: 150 },
  // March
  { id: 'jane-19', date: '2025-03-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 7800 },
  { id: 'jane-20', date: '2025-03-02', type: 'expense', category: 'Rent', description: 'March rent', amount: 2000 },
  { id: 'jane-21', date: '2025-03-06', type: 'expense', category: 'Shopping', description: 'Spring wardrobe', amount: 580 },
  { id: 'jane-22', date: '2025-03-10', type: 'expense', category: 'Food', description: 'Grocery & meal delivery', amount: 190 },
  { id: 'jane-23', date: '2025-03-14', type: 'income', category: 'Investment', description: 'Stock dividend', amount: 810 },
  { id: 'jane-24', date: '2025-03-18', type: 'expense', category: 'Entertainment', description: 'Theater tickets', amount: 220 },
  { id: 'jane-25', date: '2025-03-22', type: 'expense', category: 'Transport', description: 'Car loan + fuel', amount: 520 },
  { id: 'jane-26', date: '2025-03-28', type: 'expense', category: 'Education', description: 'Executive course', amount: 399 },
  // April
  { id: 'jane-27', date: '2025-04-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 7800 },
  { id: 'jane-28', date: '2025-04-02', type: 'expense', category: 'Rent', description: 'April rent', amount: 2000 },
  { id: 'jane-29', date: '2025-04-07', type: 'expense', category: 'Shopping', description: 'Home furnishing', amount: 740 },
  { id: 'jane-30', date: '2025-04-12', type: 'expense', category: 'Food', description: 'Catering for party', amount: 350 },
  { id: 'jane-31', date: '2025-04-16', type: 'expense', category: 'Medical', description: 'Dental cleaning', amount: 160 },
  { id: 'jane-32', date: '2025-04-20', type: 'expense', category: 'Bills', description: 'Utilities', amount: 210 },
  { id: 'jane-33', date: '2025-04-24', type: 'expense', category: 'Entertainment', description: 'Concert VIP tickets', amount: 310 },
  { id: 'jane-34', date: '2025-04-28', type: 'income', category: 'Freelance', description: 'Consulting fees', amount: 1800 },
  // May
  { id: 'jane-35', date: '2025-05-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 7800 },
  { id: 'jane-36', date: '2025-05-02', type: 'expense', category: 'Rent', description: 'May rent', amount: 2000 },
  { id: 'jane-37', date: '2025-05-05', type: 'expense', category: 'Shopping', description: 'Jewelry', amount: 620 },
  { id: 'jane-38', date: '2025-05-10', type: 'expense', category: 'Food', description: 'Fine dining & delivery', amount: 275 },
  { id: 'jane-39', date: '2025-05-15', type: 'income', category: 'Investment', description: 'Portfolio gains', amount: 1100 },
  { id: 'jane-40', date: '2025-05-19', type: 'expense', category: 'Transport', description: 'Business class flight', amount: 980 },
  { id: 'jane-41', date: '2025-05-23', type: 'expense', category: 'Entertainment', description: 'Resort stay', amount: 850 },
  { id: 'jane-42', date: '2025-05-28', type: 'expense', category: 'Medical', description: 'Wellness check-up', amount: 200 },
  // June
  { id: 'jane-43', date: '2025-06-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 7800 },
  { id: 'jane-44', date: '2025-06-02', type: 'expense', category: 'Rent', description: 'June rent', amount: 2000 },
  { id: 'jane-45', date: '2025-06-06', type: 'expense', category: 'Shopping', description: 'Summer collection', amount: 490 },
  { id: 'jane-46', date: '2025-06-11', type: 'income', category: 'Bonus', description: 'Mid-year bonus', amount: 3000 },
  { id: 'jane-47', date: '2025-06-15', type: 'expense', category: 'Food', description: 'Gourmet meal delivery', amount: 190 },
  { id: 'jane-48', date: '2025-06-20', type: 'expense', category: 'Entertainment', description: 'Rooftop party', amount: 400 },
  { id: 'jane-49', date: '2025-06-25', type: 'expense', category: 'Bills', description: 'Premium subscriptions', amount: 120 },

  // JULY - DECEMBER (append)
  { id: 'jane-50', date: '2025-07-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 7800 },
  { id: 'jane-51', date: '2025-07-03', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 2200 },
  { id: 'jane-52', date: '2025-07-05', type: 'expense', category: 'Shopping', description: 'Fashion shopping', amount: 1500 },
  { id: 'jane-53', date: '2025-07-08', type: 'expense', category: 'Food', description: 'Fine dining', amount: 900 },
  { id: 'jane-54', date: '2025-07-12', type: 'expense', category: 'Entertainment', description: 'Concert', amount: 1200 },

  { id: 'jane-55', date: '2025-08-01', type: 'income', category: 'Salary', amount: 7800 },
  { id: 'jane-56', date: '2025-08-04', type: 'expense', category: 'Shopping', description: 'Online shopping', amount: 1800 },
  { id: 'jane-57', date: '2025-08-07', type: 'expense', category: 'Food', description: 'Dinner outing', amount: 850 },
  { id: 'jane-58', date: '2025-08-10', type: 'expense', category: 'Entertainment', description: 'Club night', amount: 1300 },
  { id: 'jane-59', date: '2025-08-14', type: 'expense', category: 'Travel', description: 'Weekend trip', amount: 2500 },

  { id: 'jane-60', date: '2025-09-01', type: 'income', category: 'Salary', amount: 7800 },
  { id: 'jane-61', date: '2025-09-03', type: 'expense', category: 'Rent', amount: 2200 },
  { id: 'jane-62', date: '2025-09-06', type: 'expense', category: 'Shopping', amount: 1400 },
  { id: 'jane-63', date: '2025-09-09', type: 'expense', category: 'Food', amount: 900 },
  { id: 'jane-64', date: '2025-09-12', type: 'expense', category: 'Entertainment', amount: 1100 },

  { id: 'jane-65', date: '2025-10-01', type: 'income', category: 'Salary', amount: 7800 },
  { id: 'jane-66', date: '2025-10-05', type: 'expense', category: 'Shopping', amount: 1600 },
  { id: 'jane-67', date: '2025-10-08', type: 'expense', category: 'Food', amount: 950 },
  { id: 'jane-68', date: '2025-10-11', type: 'expense', category: 'Entertainment', amount: 1400 },
  { id: 'jane-69', date: '2025-10-15', type: 'expense', category: 'Other Expense', amount: 700 },

  { id: 'jane-70', date: '2025-11-01', type: 'income', category: 'Salary', amount: 7800 },
  { id: 'jane-71', date: '2025-11-03', type: 'expense', category: 'Rent', amount: 2200 },
  { id: 'jane-72', date: '2025-11-06', type: 'expense', category: 'Shopping', amount: 1700 },
  { id: 'jane-73', date: '2025-11-09', type: 'expense', category: 'Food', amount: 900 },
  { id: 'jane-74', date: '2025-11-12', type: 'expense', category: 'Entertainment', amount: 1300 },

  { id: 'jane-75', date: '2025-12-01', type: 'income', category: 'Salary', amount: 7800 },
  { id: 'jane-76', date: '2025-12-04', type: 'expense', category: 'Shopping', amount: 2000 },
  { id: 'jane-77', date: '2025-12-07', type: 'expense', category: 'Food', amount: 1000 },
  { id: 'jane-78', date: '2025-12-10', type: 'expense', category: 'Travel', amount: 3000 },
  { id: 'jane-79', date: '2025-12-15', type: 'expense', category: 'Entertainment', amount: 1500 },
];



// ================= ARUNIMA (balanced saver) =================
const arunimaTransactions = [
  { id: 'aru-1', date: '2025-01-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-2', date: '2025-01-03', type: 'expense', category: 'Rent', description: 'Apartment rent payment', amount: 12000 },
  { id: 'aru-3', date: '2025-01-05', type: 'expense', category: 'Food', description: 'Monthly groceries', amount: 2200 },
  { id: 'aru-4', date: '2025-01-07', type: 'income', category: 'Investment', description: 'Mutual fund return', amount: 2000 },
  { id: 'aru-5', date: '2025-01-10', type: 'expense', category: 'Bill', description: 'Electricity bill payment', amount: 1400 },

  { id: 'aru-6', date: '2025-02-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-7', date: '2025-02-04', type: 'expense', category: 'Food', description: 'Groceries and essentials', amount: 2500 },
  { id: 'aru-8', date: '2025-02-08', type: 'expense', category: 'Medical', description: 'Medicines purchase', amount: 1200 },
  { id: 'aru-9', date: '2025-02-12', type: 'income', category: 'Investment', description: 'Investment return', amount: 1800 },

  { id: 'aru-10', date: '2025-03-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-11', date: '2025-03-03', type: 'expense', category: 'Rent', description: 'Apartment rent payment', amount: 12000 },
  { id: 'aru-12', date: '2025-03-06', type: 'expense', category: 'Food', description: 'Weekly groceries', amount: 2300 },
  { id: 'aru-13', date: '2025-03-10', type: 'expense', category: 'Shopping', description: 'Clothing purchase', amount: 2000 },

  { id: 'aru-14', date: '2025-04-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-15', date: '2025-04-05', type: 'expense', category: 'Food', description: 'Groceries and snacks', amount: 2600 },
  { id: 'aru-16', date: '2025-04-09', type: 'expense', category: 'Bill', description: 'Utility bill payment', amount: 1500 },
  { id: 'aru-17', date: '2025-04-12', type: 'income', category: 'Investment', description: 'Mutual fund return', amount: 2200 },

  { id: 'aru-18', date: '2025-05-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-19', date: '2025-05-03', type: 'expense', category: 'Rent', description: 'Apartment rent payment', amount: 12000 },
  { id: 'aru-20', date: '2025-05-06', type: 'expense', category: 'Food', description: 'Groceries', amount: 2100 },

  { id: 'aru-21', date: '2025-06-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-22', date: '2025-06-05', type: 'expense', category: 'Food', description: 'Groceries and essentials', amount: 2400 },
  { id: 'aru-23', date: '2025-06-10', type: 'expense', category: 'Travel', description: 'Short weekend trip', amount: 5000 },

  { id: 'aru-24', date: '2025-07-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-25', date: '2025-07-03', type: 'expense', category: 'Rent', description: 'Apartment rent payment', amount: 12000 },
  { id: 'aru-26', date: '2025-07-07', type: 'income', category: 'Bonus', description: 'Mid-year performance bonus', amount: 8000 },

  { id: 'aru-27', date: '2025-08-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-28', date: '2025-08-05', type: 'expense', category: 'Food', description: 'Groceries', amount: 2300 },
  { id: 'aru-29', date: '2025-08-09', type: 'expense', category: 'Shopping', description: 'Online shopping', amount: 1800 },

  { id: 'aru-30', date: '2025-09-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-31', date: '2025-09-04', type: 'expense', category: 'Food', description: 'Groceries and essentials', amount: 2500 },
  { id: 'aru-32', date: '2025-09-10', type: 'income', category: 'Investment', description: 'Investment return', amount: 2100 },

  { id: 'aru-33', date: '2025-10-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-34', date: '2025-10-03', type: 'expense', category: 'Rent', description: 'Apartment rent payment', amount: 12000 },

  { id: 'aru-35', date: '2025-11-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-36', date: '2025-11-05', type: 'expense', category: 'Food', description: 'Groceries', amount: 2600 },

  { id: 'aru-37', date: '2025-12-01', type: 'income', category: 'Salary', description: 'Monthly salary credited', amount: 45000 },
  { id: 'aru-38', date: '2025-12-03', type: 'expense', category: 'Rent', description: 'Apartment rent payment', amount: 12000 },
  { id: 'aru-39', date: '2025-12-07', type: 'income', category: 'Bonus', description: 'Year-end bonus received', amount: 10000 },

  { id: 'aru-40', date: '2025-12-10', type: 'expense', category: 'Other Expense', description: 'Miscellaneous expenses', amount: 1500 },
  { id: 'aru-41', date: '2025-12-12', type: 'expense', category: 'Bill', description: 'Utility bill payment', amount: 1300 },
  { id: 'aru-42', date: '2025-12-15', type: 'expense', category: 'Food', description: 'Groceries and snacks', amount: 2000 },
  { id: 'aru-43', date: '2025-12-18', type: 'income', category: 'Investment', description: 'Investment return', amount: 2000 },
  { id: 'aru-44', date: '2025-12-20', type: 'expense', category: 'Shopping', description: 'Clothing and accessories', amount: 2500 },
  { id: 'aru-45', date: '2025-12-22', type: 'expense', category: 'Medical', description: 'Doctor consultation and medicines', amount: 1200 },
];


const jemimaTransactions = [
  { id: 'jem-1', date: '2025-01-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-2', date: '2025-01-03', type: 'expense', category: 'Rent', description: 'Luxury apartment rent (downtown)', amount: 25000 },

  { id: 'jem-3', date: '2025-01-08', type: 'expense', category: 'Shopping', description: 'Zara winter collection', amount: 8500 },
  { id: 'jem-49', date: '2025-01-08', type: 'income', category: 'Freelance', description: 'Freelance project payment', amount: 56200 },

  { id: 'jem-4', date: '2025-01-18', type: 'expense', category: 'Food', description: 'Fine dining at Italian restaurant', amount: 3200 },
  { id: 'jem-50', date: '2025-01-18', type: 'income', category: 'Investment', description: 'Stock dividend received', amount: 65000 },

  { id: 'jem-5', date: '2025-01-29', type: 'expense', category: 'Entertainment', description: 'Live concert tickets', amount: 50000 },
  { id: 'jem-51', date: '2025-01-29', type: 'income', category: 'Bonus', description: 'Year-end performance bonus', amount: 70000 },



  { id: 'jem-6', date: '2025-02-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-7', date: '2025-02-04', type: 'expense', category: 'Shopping', description: 'H&M new arrivals', amount: 12000 },
  { id: 'jem-8', date: '2025-02-07', type: 'expense', category: 'Food', description: 'Weekend brunch outing', amount: 2800 },
  { id: 'jem-9', date: '2025-02-12', type: 'expense', category: 'Entertainment', description: 'Movie night + snacks', amount: 4500 },

  { id: 'jem-10', date: '2025-03-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-11', date: '2025-03-03', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 25000 },
  { id: 'jem-12', date: '2025-03-05', type: 'expense', category: 'Shopping', description: 'Designer shoes purchase', amount: 10000 },
  { id: 'jem-13', date: '2025-03-09', type: 'expense', category: 'Food', description: 'Dinner with friends', amount: 3500 },

  { id: 'jem-14', date: '2025-04-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-15', date: '2025-04-06', type: 'expense', category: 'Shopping', description: 'Spring fashion shopping', amount: 9000 },
  { id: 'jem-16', date: '2025-04-08', type: 'expense', category: 'Food', description: 'Cafe hopping', amount: 3000 },
  { id: 'jem-17', date: '2025-04-12', type: 'expense', category: 'Entertainment', description: 'Theatre show tickets', amount: 5200 },

  { id: 'jem-18', date: '2025-05-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-19', date: '2025-05-03', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 25000 },
  { id: 'jem-20', date: '2025-05-07', type: 'expense', category: 'Shopping', description: 'Online shopping spree', amount: 11000 },

  { id: 'jem-21', date: '2025-06-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-22', date: '2025-06-05', type: 'expense', category: 'Food', description: 'Fine dining experience', amount: 3200 },
  { id: 'jem-23', date: '2025-06-10', type: 'expense', category: 'Travel', description: 'Weekend getaway trip', amount: 15000 },

  { id: 'jem-24', date: '2025-07-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-25', date: '2025-07-03', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 25000 },
  { id: 'jem-26', date: '2025-07-08', type: 'income', category: 'Bonus', description: 'Quarterly performance bonus', amount: 20000 },

  { id: 'jem-27', date: '2025-08-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-28', date: '2025-08-05', type: 'expense', category: 'Shopping', description: 'Luxury handbag purchase', amount: 13000 },
  { id: 'jem-29', date: '2025-08-09', type: 'expense', category: 'Food', description: 'Dinner date', amount: 3400 },

  { id: 'jem-30', date: '2025-09-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-31', date: '2025-09-04', type: 'expense', category: 'Shopping', description: 'Festive shopping', amount: 9500 },
  { id: 'jem-32', date: '2025-09-10', type: 'expense', category: 'Entertainment', description: 'Club night outing', amount: 4800 },

  { id: 'jem-33', date: '2025-10-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-34', date: '2025-10-03', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 25000 },

  { id: 'jem-35', date: '2025-11-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-36', date: '2025-11-06', type: 'expense', category: 'Shopping', description: 'Black Friday deals shopping', amount: 15000 },

  { id: 'jem-37', date: '2025-12-01', type: 'income', category: 'Salary', description: 'Monthly corporate salary', amount: 90000 },
  { id: 'jem-38', date: '2025-12-03', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 25000 },
  { id: 'jem-39', date: '2025-12-07', type: 'income', category: 'Bonus', description: 'Year-end bonus', amount: 25000 },
  { id: 'jem-40', date: '2025-12-10', type: 'expense', category: 'Shopping', description: 'Christmas shopping spree', amount: 18000 },
  { id: 'jen-41', date: '2025-12-12', type: 'income', category: 'Freelance', description: 'UI design project', amount: 40000 },
  { id: 'jem-42', date: '2025-12-12', type: 'expense', category: 'Food', description: 'Holiday dinner party', amount: 4000 },
  { id: 'jem-43', date: '2025-12-15', type: 'expense', category: 'Entertainment', description: 'New Year event booking', amount: 6000 },
  { id: 'jem-44', date: '2025-12-18', type: 'expense', category: 'Travel', description: 'Winter vacation trip', amount: 20000 },

  { id: 'jem-45', date: '2025-12-22', type: 'expense', category: 'Other Expense', description: 'Miscellaneous expenses', amount: 2500 },
  { id: 'jem-46', date: '2025-12-22', type: 'expense', category: 'Medical', description: 'Health checkup', amount: 2000 },
  { id: 'jem-47', date: '2025-12-24', type: 'income', category: 'Bonus', description: 'Christmas Bonus', amount: 50000 },
  { id: 'jem-48', date: '2025-12-18', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 92000 },
];
const roseTransactions = [
  { id: 'ros-1', date: '2025-01-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-2', date: '2025-01-03', type: 'expense', category: 'Education', description: 'Course fee', amount: 3000 },
  { id: 'ros-3', date: '2025-01-05', type: 'expense', category: 'Food', description: 'Snacks', amount: 600 },
  { id: 'ros-4', date: '2025-01-08', type: 'expense', category: 'Entertainment', description: 'Movie outing', amount: 400 },

  { id: 'ros-5', date: '2025-02-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-6', date: '2025-02-04', type: 'expense', category: 'Education', description: 'Books purchase', amount: 1500 },

  { id: 'ros-7', date: '2025-03-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-8', date: '2025-03-05', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },

  { id: 'ros-9', date: '2025-04-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-10', date: '2025-04-06', type: 'expense', category: 'Education', description: 'Online course', amount: 2000 },

  { id: 'ros-11', date: '2025-05-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-12', date: '2025-05-07', type: 'expense', category: 'Food', description: 'Snacks', amount: 800 },

  { id: 'ros-13', date: '2025-06-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-14', date: '2025-06-09', type: 'expense', category: 'Entertainment', description: 'Movie', amount: 500 },

  { id: 'ros-15', date: '2025-07-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-16', date: '2025-07-08', type: 'expense', category: 'Education', description: 'Exam fee', amount: 2500 },

  { id: 'ros-17', date: '2025-08-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-18', date: '2025-08-05', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },

  { id: 'ros-19', date: '2025-09-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-20', date: '2025-09-10', type: 'expense', category: 'Education', description: 'Books', amount: 2000 },

  { id: 'ros-21', date: '2025-10-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-22', date: '2025-10-07', type: 'expense', category: 'Food', description: 'Snacks', amount: 600 },

  { id: 'ros-23', date: '2025-11-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-24', date: '2025-11-06', type: 'expense', category: 'Entertainment', description: 'Movie', amount: 500 },

  { id: 'ros-25', date: '2025-12-01', type: 'income', category: 'Other Income', description: 'Pocket money', amount: 8000 },
  { id: 'ros-26', date: '2025-12-05', type: 'expense', category: 'Education', description: 'Course subscription', amount: 2500 },

  { id: 'ros-27', date: '2025-12-07', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },
  { id: 'ros-28', date: '2025-12-08', type: 'expense', category: 'Other Expense', description: 'Stationery', amount: 500 },
  { id: 'ros-29', date: '2025-12-09', type: 'expense', category: 'Entertainment', description: 'Movie', amount: 600 },
  { id: 'ros-30', date: '2025-12-10', type: 'expense', category: 'Food', description: 'Snacks', amount: 800 },
  { id: 'ros-31', date: '2025-12-11', type: 'expense', category: 'Education', description: 'Books', amount: 1500 },
  { id: 'ros-32', date: '2025-12-12', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 400 },
  { id: 'ros-33', date: '2025-12-13', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },
  { id: 'ros-34', date: '2025-12-14', type: 'expense', category: 'Entertainment', description: 'Outing', amount: 800 },
  { id: 'ros-35', date: '2025-12-15', type: 'expense', category: 'Education', description: 'Exam prep', amount: 2000 },
  { id: 'ros-36', date: '2025-12-16', type: 'expense', category: 'Food', description: 'Snacks', amount: 600 },
  { id: 'ros-37', date: '2025-12-17', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 500 },
  { id: 'ros-38', date: '2025-12-18', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },
  { id: 'ros-39', date: '2025-12-19', type: 'expense', category: 'Entertainment', description: 'Movie', amount: 600 },
  { id: 'ros-40', date: '2025-12-20', type: 'expense', category: 'Food', description: 'Snacks', amount: 800 },
  { id: 'ros-41', date: '2025-12-21', type: 'expense', category: 'Education', description: 'Books', amount: 1500 },
  { id: 'ros-42', date: '2025-12-22', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 400 },
  { id: 'ros-43', date: '2025-12-23', type: 'expense', category: 'Food', description: 'Snacks', amount: 700 },
  { id: 'ros-44', date: '2025-12-24', type: 'expense', category: 'Entertainment', description: 'Outing', amount: 800 },
  { id: 'ros-45', date: '2025-12-25', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 500 },
];
const ankurTransactions = [
  { id: 'ank-1', date: '2025-01-02', type: 'income', category: 'Freelance', description: 'Website project', amount: 25000 },
  { id: 'ank-2', date: '2025-01-04', type: 'expense', category: 'Travel', description: 'Flight tickets', amount: 15000 },
  { id: 'ank-3', date: '2025-01-06', type: 'expense', category: 'Food', description: 'Cafe hopping', amount: 2000 },
  { id: 'ank-4', date: '2025-01-10', type: 'income', category: 'Other Income', description: 'Side gig', amount: 5000 },

  { id: 'ank-5', date: '2025-02-03', type: 'income', category: 'Freelance', description: 'App UI project', amount: 30000 },
  { id: 'ank-6', date: '2025-02-06', type: 'expense', category: 'Travel', description: 'Train journey', amount: 5000 },

  { id: 'ank-7', date: '2025-03-02', type: 'income', category: 'Freelance', description: 'Client work', amount: 20000 },
  { id: 'ank-8', date: '2025-03-07', type: 'expense', category: 'Travel', description: 'Weekend trip', amount: 8000 },

  { id: 'ank-9', date: '2025-04-02', type: 'income', category: 'Freelance', description: 'Design contract', amount: 35000 },
  { id: 'ank-10', date: '2025-04-08', type: 'expense', category: 'Travel', description: 'Airbnb stay', amount: 12000 },

  { id: 'ank-11', date: '2025-05-02', type: 'income', category: 'Freelance', description: 'Freelance project', amount: 28000 },
  { id: 'ank-12', date: '2025-05-06', type: 'expense', category: 'Shopping', description: 'Travel gear', amount: 4000 },

  { id: 'ank-13', date: '2025-06-02', type: 'income', category: 'Freelance', description: 'Client payment', amount: 22000 },
  { id: 'ank-14', date: '2025-06-09', type: 'expense', category: 'Travel', description: 'Hill station trip', amount: 10000 },

  { id: 'ank-15', date: '2025-07-03', type: 'income', category: 'Freelance', description: 'Website redesign', amount: 26000 },
  { id: 'ank-16', date: '2025-07-07', type: 'expense', category: 'Travel', description: 'Flight booking', amount: 14000 },

  { id: 'ank-17', date: '2025-08-01', type: 'income', category: 'Freelance', description: 'Client payment', amount: 30000 },
  { id: 'ank-18', date: '2025-08-06', type: 'expense', category: 'Food', description: 'Cafe meals', amount: 2500 },

  { id: 'ank-19', date: '2025-09-02', type: 'income', category: 'Freelance', description: 'UI project', amount: 28000 },
  { id: 'ank-20', date: '2025-09-08', type: 'expense', category: 'Travel', description: 'Beach trip', amount: 16000 },

  { id: 'ank-21', date: '2025-10-02', type: 'income', category: 'Freelance', description: 'Freelance gig', amount: 24000 },
  { id: 'ank-22', date: '2025-10-07', type: 'expense', category: 'Travel', description: 'Solo trip', amount: 9000 },

  { id: 'ank-23', date: '2025-11-02', type: 'income', category: 'Freelance', description: 'Contract work', amount: 26000 },
  { id: 'ank-24', date: '2025-11-08', type: 'expense', category: 'Shopping', description: 'Camera accessories', amount: 6000 },

  { id: 'ank-25', date: '2025-12-01', type: 'income', category: 'Freelance', description: 'Client payment', amount: 32000 },
  { id: 'ank-26', date: '2025-12-05', type: 'expense', category: 'Travel', description: 'International trip', amount: 25000 },

  { id: 'ank-27', date: '2025-12-07', type: 'expense', category: 'Food', description: 'Restaurant meals', amount: 3500 },
  { id: 'ank-28', date: '2025-12-09', type: 'income', category: 'Other Income', description: 'Content monetization', amount: 7000 },
  { id: 'ank-29', date: '2025-12-10', type: 'expense', category: 'Entertainment', description: 'Event tickets', amount: 4000 },
  { id: 'ank-30', date: '2025-12-12', type: 'expense', category: 'Travel', description: 'Local travel', amount: 3000 },
  { id: 'ank-31', date: '2025-12-13', type: 'expense', category: 'Food', description: 'Cafe meals', amount: 2000 },
  { id: 'ank-32', date: '2025-12-14', type: 'income', category: 'Freelance', description: 'Quick project', amount: 15000 },
  { id: 'ank-33', date: '2025-12-15', type: 'expense', category: 'Travel', description: 'Hotel booking', amount: 8000 },
  { id: 'ank-34', date: '2025-12-16', type: 'expense', category: 'Shopping', description: 'Travel essentials', amount: 3000 },
  { id: 'ank-35', date: '2025-12-17', type: 'expense', category: 'Food', description: 'Dining', amount: 2500 },
  { id: 'ank-36', date: '2025-12-18', type: 'expense', category: 'Travel', description: 'Cab fares', amount: 2000 },
  { id: 'ank-37', date: '2025-12-19', type: 'income', category: 'Other Income', description: 'Affiliate income', amount: 6000 },
  { id: 'ank-38', date: '2025-12-20', type: 'expense', category: 'Food', description: 'Meals', amount: 2200 },
  { id: 'ank-39', date: '2025-12-21', type: 'expense', category: 'Entertainment', description: 'Concert', amount: 5000 },
  { id: 'ank-40', date: '2025-12-22', type: 'expense', category: 'Travel', description: 'Return trip', amount: 12000 },
  { id: 'ank-41', date: '2025-12-23', type: 'income', category: 'Freelance', description: 'Final project payment', amount: 20000 },
  { id: 'ank-42', date: '2025-12-24', type: 'expense', category: 'Food', description: 'Dinner', amount: 3000 },
  { id: 'ank-43', date: '2025-12-25', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 2000 },
  { id: 'ank-44', date: '2025-12-26', type: 'expense', category: 'Travel', description: 'Local commute', amount: 1500 },
  { id: 'ank-45', date: '2025-12-27', type: 'income', category: 'Freelance', description: 'Small gig', amount: 10000 },
];

const donaldTransactions = [
  { id: 'don-1', date: '2025-01-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-2', date: '2025-01-02', type: 'expense', category: 'Rent', description: 'Shared apartment rent', amount: 10000 },
  { id: 'don-3', date: '2025-01-05', type: 'expense', category: 'Food', description: 'Groceries', amount: 1500 },
  { id: 'don-4', date: '2025-01-08', type: 'income', category: 'Investment', description: 'FD interest', amount: 3000 },
  { id: 'don-5', date: '2025-01-12', type: 'expense', category: 'Bill', description: 'Electricity bill', amount: 1200 },

  { id: 'don-6', date: '2025-02-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-7', date: '2025-02-04', type: 'expense', category: 'Food', description: 'Groceries', amount: 1700 },
  { id: 'don-8', date: '2025-02-10', type: 'income', category: 'Investment', description: 'Mutual fund return', amount: 2500 },

  { id: 'don-9', date: '2025-03-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-10', date: '2025-03-03', type: 'expense', category: 'Rent', description: 'Shared apartment rent', amount: 10000 },
  { id: 'don-11', date: '2025-03-06', type: 'expense', category: 'Food', description: 'Groceries', amount: 1600 },

  { id: 'don-12', date: '2025-04-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-13', date: '2025-04-05', type: 'expense', category: 'Food', description: 'Groceries', amount: 1800 },
  { id: 'don-14', date: '2025-04-09', type: 'expense', category: 'Bill', description: 'Water bill', amount: 900 },

  { id: 'don-15', date: '2025-05-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-16', date: '2025-05-03', type: 'expense', category: 'Rent', description: 'Shared apartment rent', amount: 10000 },

  { id: 'don-17', date: '2025-06-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-18', date: '2025-06-05', type: 'expense', category: 'Food', description: 'Groceries', amount: 1500 },

  { id: 'don-19', date: '2025-07-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-20', date: '2025-07-03', type: 'expense', category: 'Rent', description: 'Shared apartment rent', amount: 10000 },
  { id: 'don-21', date: '2025-07-08', type: 'income', category: 'Bonus', description: 'Performance bonus', amount: 10000 },

  { id: 'don-22', date: '2025-08-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-23', date: '2025-08-05', type: 'expense', category: 'Food', description: 'Groceries', amount: 1600 },

  { id: 'don-24', date: '2025-09-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-25', date: '2025-09-10', type: 'income', category: 'Investment', description: 'Stock dividend', amount: 4000 },

  { id: 'don-26', date: '2025-10-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-27', date: '2025-10-03', type: 'expense', category: 'Rent', description: 'Shared apartment rent', amount: 10000 },

  { id: 'don-28', date: '2025-11-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-29', date: '2025-11-05', type: 'expense', category: 'Food', description: 'Groceries', amount: 1700 },

  { id: 'don-30', date: '2025-12-01', type: 'income', category: 'Salary', description: 'Monthly salary', amount: 60000 },
  { id: 'don-31', date: '2025-12-03', type: 'expense', category: 'Rent', description: 'Shared apartment rent', amount: 10000 },
  { id: 'don-32', date: '2025-12-07', type: 'income', category: 'Bonus', description: 'Year-end bonus', amount: 15000 },

  { id: 'don-33', date: '2025-12-10', type: 'expense', category: 'Food', description: 'Groceries', amount: 1800 },
  { id: 'don-34', date: '2025-12-12', type: 'expense', category: 'Bill', description: 'Electricity bill', amount: 1300 },
  { id: 'don-35', date: '2025-12-15', type: 'income', category: 'Investment', description: 'FD interest payout', amount: 5000 },
  { id: 'don-36', date: '2025-12-17', type: 'expense', category: 'Medical', description: 'Routine checkup', amount: 1500 },
  { id: 'don-37', date: '2025-12-18', type: 'expense', category: 'Other Expense', description: 'Household items', amount: 1200 },
  { id: 'don-38', date: '2025-12-19', type: 'expense', category: 'Food', description: 'Groceries', amount: 1500 },
  { id: 'don-39', date: '2025-12-20', type: 'income', category: 'Other Income', description: 'Small refund', amount: 800 },
  { id: 'don-40', date: '2025-12-21', type: 'expense', category: 'Food', description: 'Groceries', amount: 1600 },
  { id: 'don-41', date: '2025-12-22', type: 'expense', category: 'Bill', description: 'Internet bill', amount: 900 },
  { id: 'don-42', date: '2025-12-23', type: 'income', category: 'Investment', description: 'Dividend payout', amount: 3000 },
  { id: 'don-43', date: '2025-12-24', type: 'expense', category: 'Food', description: 'Groceries', amount: 1400 },
  { id: 'don-44', date: '2025-12-25', type: 'expense', category: 'Other Expense', description: 'Miscellaneous', amount: 1000 },
  { id: 'don-45', date: '2025-12-26', type: 'expense', category: 'Food', description: 'Groceries', amount: 1500 },
];
// ─────────────────────────────────────────────────────────────────
// admin1  — Alice, finance manager, mixed income, moderate spender
// ─────────────────────────────────────────────────────────────────
const aliceTransactions = [
  { id: 'a1-1', date: '2025-01-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-2', date: '2025-01-02', type: 'expense', category: 'Rent', description: 'January rent', amount: 1400 },
  { id: 'a1-3', date: '2025-01-05', type: 'expense', category: 'Bills', description: 'Internet & phone', amount: 160 },
  { id: 'a1-4', date: '2025-01-09', type: 'expense', category: 'Food', description: 'Grocery shopping', amount: 110 },
  { id: 'a1-5', date: '2025-01-15', type: 'income', category: 'Investment', description: 'Bond coupon payment', amount: 480 },
  { id: 'a1-6', date: '2025-01-18', type: 'expense', category: 'Transport', description: 'Car loan instalment', amount: 350 },
  { id: 'a1-7', date: '2025-01-22', type: 'expense', category: 'Medical', description: 'Annual health check', amount: 220 },
  { id: 'a1-8', date: '2025-01-27', type: 'expense', category: 'Entertainment', description: 'Streaming services', amount: 40 },
  { id: 'a1-9', date: '2025-02-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-10', date: '2025-02-02', type: 'expense', category: 'Rent', description: 'February rent', amount: 1400 },
  { id: 'a1-11', date: '2025-02-06', type: 'expense', category: 'Food', description: 'Meal prep groceries', amount: 115 },
  { id: 'a1-12', date: '2025-02-10', type: 'expense', category: 'Education', description: 'Finance certification', amount: 300 },
  { id: 'a1-13', date: '2025-02-14', type: 'expense', category: 'Shopping', description: 'Gifts & flowers', amount: 90 },
  { id: 'a1-14', date: '2025-02-20', type: 'income', category: 'Other Income', description: 'Rental income', amount: 700 },
  { id: 'a1-15', date: '2025-02-24', type: 'expense', category: 'Bills', description: 'Electricity', amount: 135 },
  { id: 'a1-16', date: '2025-02-27', type: 'expense', category: 'Medical', description: 'Pharmacy refill', amount: 65 },
  { id: 'a1-17', date: '2025-03-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-18', date: '2025-03-02', type: 'expense', category: 'Rent', description: 'March rent', amount: 1400 },
  { id: 'a1-19', date: '2025-03-07', type: 'expense', category: 'Food', description: 'Grocery run', amount: 108 },
  { id: 'a1-20', date: '2025-03-12', type: 'expense', category: 'Transport', description: 'Fuel & parking', amount: 95 },
  { id: 'a1-21', date: '2025-03-15', type: 'income', category: 'Bonus', description: 'Q1 admin bonus', amount: 1500 },
  { id: 'a1-22', date: '2025-03-19', type: 'expense', category: 'Shopping', description: 'Office supplies', amount: 75 },
  { id: 'a1-23', date: '2025-03-25', type: 'expense', category: 'Entertainment', description: 'Team dinner', amount: 140 },
  { id: 'a1-24', date: '2025-03-28', type: 'income', category: 'Investment', description: 'Dividend', amount: 480 },
  { id: 'a1-25', date: '2025-04-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-26', date: '2025-04-02', type: 'expense', category: 'Rent', description: 'April rent', amount: 1400 },
  { id: 'a1-27', date: '2025-04-08', type: 'expense', category: 'Food', description: 'Groceries', amount: 112 },
  { id: 'a1-28', date: '2025-04-14', type: 'expense', category: 'Medical', description: 'Optician visit', amount: 180 },
  { id: 'a1-29', date: '2025-04-18', type: 'expense', category: 'Bills', description: 'Gas & utilities', amount: 150 },
  { id: 'a1-30', date: '2025-04-22', type: 'income', category: 'Other Income', description: 'Rental income', amount: 700 },
  { id: 'a1-31', date: '2025-04-27', type: 'expense', category: 'Shopping', description: 'Books & subscriptions', amount: 80 },
  { id: 'a1-32', date: '2025-05-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-33', date: '2025-05-02', type: 'expense', category: 'Rent', description: 'May rent', amount: 1400 },
  { id: 'a1-34', date: '2025-05-06', type: 'expense', category: 'Food', description: 'Grocery & delivery', amount: 120 },
  { id: 'a1-35', date: '2025-05-10', type: 'expense', category: 'Transport', description: 'Car service', amount: 220 },
  { id: 'a1-36', date: '2025-05-15', type: 'income', category: 'Investment', description: 'Bond coupon', amount: 480 },
  { id: 'a1-37', date: '2025-05-20', type: 'expense', category: 'Medical', description: 'Dental treatment', amount: 280 },
  { id: 'a1-38', date: '2025-05-25', type: 'expense', category: 'Entertainment', description: 'Weekend travel', amount: 320 },
  { id: 'a1-39', date: '2025-06-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-40', date: '2025-06-02', type: 'expense', category: 'Rent', description: 'June rent', amount: 1400 },
  { id: 'a1-41', date: '2025-06-07', type: 'expense', category: 'Food', description: 'Grocery run', amount: 105 },
  { id: 'a1-42', date: '2025-06-12', type: 'income', category: 'Other Income', description: 'Rental income', amount: 700 },
  { id: 'a1-43', date: '2025-06-16', type: 'expense', category: 'Bills', description: 'Summer electricity', amount: 180 },
  { id: 'a1-44', date: '2025-06-22', type: 'expense', category: 'Shopping', description: 'Home appliance', amount: 450 },
  { id: 'a1-45', date: '2025-06-27', type: 'expense', category: 'Education', description: 'Leadership seminar', amount: 250 },

  //July transactions
  { id: 'a1-46', date: '2025-07-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-47', date: '2025-07-03', type: 'expense', category: 'Rent', description: 'House rent', amount: 1800 },
  { id: 'a1-48', date: '2025-07-06', type: 'expense', category: 'Food', description: 'Groceries', amount: 800 },
  { id: 'a1-49', date: '2025-07-10', type: 'income', category: 'Bonus', description: 'Quarter bonus', amount: 2000 },
  { id: 'a1-50', date: '2025-07-14', type: 'expense', category: 'Bill', description: 'Utilities', amount: 400 },
  // August transactions
  { id: 'a1-51', date: '2025-08-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-52', date: '2025-08-04', type: 'expense', category: 'Rent', description: 'House rent', amount: 1800 },
  { id: 'a1-53', date: '2025-08-07', type: 'expense', category: 'Food', description: 'Groceries', amount: 850 },
  { id: 'a1-54', date: '2025-08-12', type: 'income', category: 'Other Income', description: 'Freelance work', amount: 1200 },
  { id: 'a1-55', date: '2025-08-18', type: 'expense', category: 'Entertainment', description: 'Concert tickets', amount: 300 },

  // September transactions
  { id: 'a1-56', date: '2025-09-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-57', date: '2025-09-05', type: 'expense', category: 'Rent', description: 'House rent', amount: 1800 },
  { id: 'a1-58', date: '2025-09-08', type: 'expense', category: 'Food', description: 'Groceries', amount: 900 },
  { id: 'a1-59', date: '2025-09-15', type: 'income', category: 'Investment', description: 'Stock dividends', amount: 500 },
  { id: 'a1-60', date: '2025-09-20', type: 'expense', category: 'Medical', description: 'Doctor visit', amount: 200 },

  // October transactions
  { id: 'a1-61', date: '2025-10-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-62', date: '2025-10-03', type: 'expense', category: 'Rent', description: 'House rent', amount: 1800 },
  { id: 'a1-63', date: '2025-10-07', type: 'expense', category: 'Food', description: 'Groceries', amount: 950 },
  { id: 'a1-64', date: '2025-10-14', type: 'income', category: 'Bonus', description: 'Performance bonus', amount: 2500 },
  { id: 'a1-65', date: '2025-10-20', type: 'expense', category: 'Shopping', description: 'Clothing & accessories', amount: 400 },

  // November transactions
  { id: 'a1-66', date: '2025-11-03', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-67', date: '2025-11-05', type: 'expense', category: 'Rent', description: 'House rent', amount: 1800 },
  { id: 'a1-68', date: '2025-11-10', type: 'expense', category: 'Food', description: 'Groceries', amount: 1000 },
  { id: 'a1-69', date: '2025-11-15', type: 'income', category: 'Other Income', description: 'Freelance project', amount: 1500 },
  { id: 'a1-70', date: '2025-11-22', type: 'expense', category: 'Entertainment', description: 'Weekend getaway', amount: 600 },

  // December transactions
  { id: 'a1-71', date: '2025-12-01', type: 'income', category: 'Salary', description: 'Admin salary', amount: 6500 },
  { id: 'a1-72', date: '2025-12-04', type: 'expense', category: 'Rent', description: 'House rent', amount: 1800 },
  { id: 'a1-73', date: '2025-12-08', type: 'expense', category: 'Food', description: 'Groceries', amount: 1100 },
  { id: 'a1-74', date: '2025-12-15', type: 'income', category: 'Bonus', description: 'Year-end bonus', amount: 3000 },
  { id: 'a1-75', date: '2025-12-20', type: 'expense', category: 'Medical', description: 'Health insurance premium', amount: 500 },
  { id: 'a1-76', date: '2025-12-22', type: 'expense', category: 'Entertainment', description: 'Holiday party', amount: 700 },
  { id: 'a1-77', date: '2025-12-24', type: 'expense', category: 'Other Expense', description: 'Gifts & donations', amount: 400 },
  { id: 'a1-78', date: '2025-12-26', type: 'expense', category: 'Food', description: 'Holiday meals', amount: 1200 },

];

// ─────────────────────────────────────────────────────────────────
// admin2  — Elsa, tech executive, high income, heavy investments
// ─────────────────────────────────────────────────────────────────
const elsaTransactions = [
  { id: 'a2-1', date: '2025-01-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-2', date: '2025-01-02', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 3500 },
  { id: 'a2-3', date: '2025-01-05', type: 'expense', category: 'Bills', description: 'Premium utilities', amount: 300 },
  { id: 'a2-4', date: '2025-01-08', type: 'expense', category: 'Food', description: 'Personal chef service', amount: 800 },
  { id: 'a2-5', date: '2025-01-12', type: 'income', category: 'Investment', description: 'Portfolio returns', amount: 2400 },
  { id: 'a2-6', date: '2025-01-15', type: 'expense', category: 'Transport', description: 'Lease payment', amount: 1200 },
  { id: 'a2-7', date: '2025-01-20', type: 'expense', category: 'Entertainment', description: 'Private club membership', amount: 500 },
  { id: 'a2-8', date: '2025-01-25', type: 'expense', category: 'Medical', description: 'Executive health plan', amount: 400 },
  { id: 'a2-9', date: '2025-01-28', type: 'income', category: 'Bonus', description: 'Year-end carry bonus', amount: 5000 },
  { id: 'a2-10', date: '2025-02-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-11', date: '2025-02-02', type: 'expense', category: 'Rent', description: 'February rent', amount: 3500 },
  { id: 'a2-12', date: '2025-02-07', type: 'expense', category: 'Shopping', description: 'Custom tailoring', amount: 1200 },
  { id: 'a2-13', date: '2025-02-12', type: 'expense', category: 'Food', description: 'Business dinners', amount: 650 },
  { id: 'a2-14', date: '2025-02-15', type: 'income', category: 'Investment', description: 'Real estate proceeds', amount: 3800 },
  { id: 'a2-15', date: '2025-02-20', type: 'expense', category: 'Education', description: 'MBA module payment', amount: 1500 },
  { id: 'a2-16', date: '2025-02-25', type: 'expense', category: 'Entertainment', description: 'Ski resort trip', amount: 1800 },
  { id: 'a2-17', date: '2025-03-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-18', date: '2025-03-02', type: 'expense', category: 'Rent', description: 'March rent', amount: 3500 },
  { id: 'a2-19', date: '2025-03-06', type: 'expense', category: 'Food', description: 'Grocery & catering', amount: 720 },
  { id: 'a2-20', date: '2025-03-10', type: 'income', category: 'Investment', description: 'Startup dividends', amount: 4200 },
  { id: 'a2-21', date: '2025-03-15', type: 'expense', category: 'Medical', description: 'Private clinic', amount: 600 },
  { id: 'a2-22', date: '2025-03-20', type: 'expense', category: 'Transport', description: 'Lease + fuel', amount: 1250 },
  { id: 'a2-23', date: '2025-03-26', type: 'expense', category: 'Shopping', description: 'Tech equipment', amount: 2200 },
  { id: 'a2-24', date: '2025-04-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-25', date: '2025-04-02', type: 'expense', category: 'Rent', description: 'April rent', amount: 3500 },
  { id: 'a2-26', date: '2025-04-07', type: 'expense', category: 'Bills', description: 'Premium subscriptions', amount: 350 },
  { id: 'a2-27', date: '2025-04-12', type: 'income', category: 'Bonus', description: 'Q2 executive bonus', amount: 4000 },
  { id: 'a2-28', date: '2025-04-16', type: 'expense', category: 'Entertainment', description: 'Charity gala tickets', amount: 1000 },
  { id: 'a2-29', date: '2025-04-22', type: 'expense', category: 'Food', description: 'Team dinner hosting', amount: 900 },
  { id: 'a2-30', date: '2025-04-27', type: 'expense', category: 'Shopping', description: 'Luxury watch', amount: 3500 },
  { id: 'a2-31', date: '2025-05-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-32', date: '2025-05-02', type: 'expense', category: 'Rent', description: 'May rent', amount: 3500 },
  { id: 'a2-33', date: '2025-05-08', type: 'income', category: 'Investment', description: 'Crypto portfolio gains', amount: 5500 },
  { id: 'a2-34', date: '2025-05-12', type: 'expense', category: 'Transport', description: 'Business class flights', amount: 2800 },
  { id: 'a2-35', date: '2025-05-18', type: 'expense', category: 'Food', description: 'Conference catering', amount: 750 },
  { id: 'a2-36', date: '2025-05-24', type: 'expense', category: 'Medical', description: 'Specialist appointment', amount: 500 },
  { id: 'a2-37', date: '2025-06-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-38', date: '2025-06-02', type: 'expense', category: 'Rent', description: 'June rent', amount: 3500 },
  { id: 'a2-39', date: '2025-06-06', type: 'income', category: 'Investment', description: 'Real estate rental', amount: 2800 },
  { id: 'a2-40', date: '2025-06-10', type: 'expense', category: 'Entertainment', description: 'Yacht charter', amount: 4000 },
  { id: 'a2-41', date: '2025-06-15', type: 'expense', category: 'Shopping', description: 'Art piece purchase', amount: 2500 },
  { id: 'a2-42', date: '2025-06-20', type: 'expense', category: 'Food', description: 'Private dining events', amount: 1100 },
  { id: 'a2-43', date: '2025-06-26', type: 'expense', category: 'Education', description: 'Executive MBA seminar', amount: 1800 },

  // July transactions
  { id: 'a2-44', date: '2025-07-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-45', date: '2025-07-04', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 3500 },
  { id: 'a2-46', date: '2025-07-08', type: 'expense', category: 'Food', description: 'Personal chef service', amount: 800 },
  { id: 'a2-47', date: '2025-07-12', type: 'income', category: 'Bonus', description: 'Year-end carry bonus', amount: 5000 },
  { id: 'a2-48', date: '2025-07-18', type: 'expense', category: 'Entertainment', description: 'Private club membership', amount: 500 },

  // August transactions
  { id: 'a2-49', date: '2025-08-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-50', date: '2025-08-05', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 3500 },
  { id: 'a2-51', date: '2025-08-10', type: 'expense', category: 'Food', description: 'Personal chef service', amount: 800 },
  { id: 'a2-52', date: '2025-08-15', type: 'income', category: 'Investment', description: 'Real estate proceeds', amount: 3800 },
  { id: 'a2-53', date: '2025-08-20', type: 'expense', category: 'Education', description: 'MBA module payment', amount: 1500 },

  // September transactions
  { id: 'a2-54', date: '2025-09-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-55', date: '2025-09-03', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 3500 },
  { id: 'a2-56', date: '2025-09-08', type: 'expense', category: 'Food', description: 'Personal chef service', amount: 800 },
  { id: 'a2-57', date: '2025-09-12', type: 'income', category: 'Bonus', description: 'Q3 executive bonus', amount: 4000 },
  { id: 'a2-58', date: '2025-09-18', type: 'expense', category: 'Transport', description: 'Lease + fuel', amount: 1250 },

  // October transactions
  { id: 'a2-59', date: '2025-10-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-60', date: '2025-10-04', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 3500 },
  { id: 'a2-61', date: '2025-10-09', type: 'expense', category: 'Food', description: 'Personal chef service', amount: 800 },
  { id: 'a2-62', date: '2025-10-14', type: 'income', category: 'Bonus', description: 'Performance bonus', amount: 2500 },
  { id: 'a2-63', date: '2025-10-21', type: 'expense', category: 'Shopping', description: 'Luxury watch', amount: 3500 },

  // November transactions
  { id: 'a2-64', date: '2025-11-03', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-65', date: '2025-11-06', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 3500 },
  { id: 'a2-66', date: '2025-11-11', type: 'expense', category: 'Food', description: 'Personal chef service', amount: 800 },
  { id: 'a2-67', date: '2025-11-15', type: 'income', category: 'Other Income', description: 'Freelance project', amount: 1500 },
  { id: 'a2-68', date: '2025-11-22', type: 'expense', category: 'Entertainment', description: 'Weekend getaway', amount: 600 },

  // December transactions
  { id: 'a2-69', date: '2025-12-01', type: 'income', category: 'Salary', description: 'Executive salary', amount: 12000 },
  { id: 'a2-70', date: '2025-12-05', type: 'expense', category: 'Rent', description: 'Luxury apartment rent', amount: 3500 },
  { id: 'a2-71', date: '2025-12-10', type: 'expense', category: 'Food', description: 'Personal chef service', amount: 800 },
  { id: 'a2-72', date: '2025-12-15', type: 'income', category: 'Bonus', description: 'Year-end bonus', amount: 3000 },
  { id: 'a2-73', date: '2025-12-20', type: 'expense', category: 'Medical', description: 'Health insurance premium', amount: 500 },
  { id: 'a2-74', date: '2025-12-22', type: 'expense', category: 'Entertainment', description: 'Holiday party', amount: 700 },
  { id: 'a2-75', date: '2025-12-24', type: 'expense', category: 'Other Expense', description: 'Gifts & donations', amount: 400 },
  { id: 'a2-76', date: '2025-12-26', type: 'expense', category: 'Food', description: 'Holiday meals', amount: 1200 },

];

// ─────────────────────────────────────────────────────────────────
// Master map: username → transactions[]
// ─────────────────────────────────────────────────────────────────
const mockTransactions = {
  john_doe: johnDoeTransactions,
  jane_doe: janeDoeTransactions,
  alice: aliceTransactions,
  elsa: elsaTransactions,
  arunima: arunimaTransactions,
  jemima: jemimaTransactions,
  donald: donaldTransactions,
  ankur: ankurTransactions,
  rose: roseTransactions,
  sofia: sofiaTransactions,

};

/**
 * Get transactions for a specific user.
 * Merges mock data with localStorage additions/edits/deletions.
 */
export function getTransactionsForUser(username) {
  const base = mockTransactions[username] ?? [];

  try {
    const deletedIds = JSON.parse(localStorage.getItem('finsight_deleted_txn_ids') || '[]');
    const editedMap = JSON.parse(localStorage.getItem('finsight_edited_txns') || '{}');
    const added = JSON.parse(localStorage.getItem(`finsight_transactions_${username}`) || '[]');

    // Apply edits to base
    const merged = base
      .filter(t => !deletedIds.includes(t.id))
      .map(t => editedMap[t.id] ? { ...t, ...editedMap[t.id] } : t);

    // Append localStorage-added transactions for this user
    const filteredAdded = added.filter(t => !deletedIds.includes(t.id))
      .map(t => editedMap[t.id] ? { ...t, ...editedMap[t.id] } : t);

    return [...merged, ...filteredAdded];
  } catch {
    return base;
  }
}

/**
 * Get ALL transactions across all users (for admin view).
 * Each transaction has a `username` field attached.
 */
export function getAllTransactions() {
  try {
    const deletedIds = JSON.parse(localStorage.getItem('finsight_deleted_txn_ids') || '[]');
    const editedMap = JSON.parse(localStorage.getItem('finsight_edited_txns') || '{}');

    // Get all known usernames (mock + localStorage-registered)
    let lsUsers = [];
    try { lsUsers = JSON.parse(localStorage.getItem('finsight_users') || '[]'); } catch { }
    const deletedUsers = (() => { try { return JSON.parse(localStorage.getItem('finsight_deleted_users') || '[]'); } catch { return []; } })();

    const allUsernames = [
      ...Object.keys(mockTransactions),
      ...lsUsers.map(u => u.username),
    ].filter(u => !deletedUsers.includes(u));

    const unique = [...new Set(allUsernames)];

    const all = [];
    unique.forEach(username => {
      const base = mockTransactions[username] ?? [];
      // Added via admin
      let added = [];
      try { added = JSON.parse(localStorage.getItem(`finsight_transactions_${username}`) || '[]'); } catch { }

      const merged = [
        ...base.filter(t => !deletedIds.includes(t.id))
          .map(t => editedMap[t.id] ? { ...t, ...editedMap[t.id] } : t),
        ...added.filter(t => !deletedIds.includes(t.id))
          .map(t => editedMap[t.id] ? { ...t, ...editedMap[t.id] } : t),
      ];
      merged.forEach(t => all.push({ ...t, username }));
    });

    return all.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {
    return [];
  }
}

export default mockTransactions;
