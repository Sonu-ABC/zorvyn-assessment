<![CDATA[<div align="center">

# 💰 FinSight — Personal Finance Dashboard

**Visualise your spending patterns. Take control of your financial future.**

*A modern, role-based finance dashboard built with React 19 + Vite, featuring rich data visualisations, CRUD operations, dark/light theming, CSV export, and persistent localStorage state — all without a backend.*

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3.8-FF6384?logo=chart.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-FF0050?logo=framer&logoColor=white)

</div>

---

## 📑 Table of Contents

1. [Project Overview & Motive](#-project-overview--motive)
2. [Tech Stack](#-tech-stack)
3. [Setup & Quick Start](#-setup--quick-start)
4. [Role of User and Admin](#-role-of-user-and-admin)
5. [Project Features (Evaluation Criteria)](#-project-features--evaluation-criteria)
    - [1. Design and Creativity](#1-design-and-creativity)
    - [2. Responsiveness](#2-responsiveness)
    - [3. Functionality](#3-functionality)
    - [4. User Experience](#4-user-experience)
    - [5. Technical Quality](#5-technical-quality)
    - [6. State Management Approach](#6-state-management-approach)
    - [7. Documentation](#7-documentation)
    - [8. Attention to Detail](#8-attention-to-detail)
6. [Pre-seeded Demo Accounts](#-pre-seeded-demo-accounts)

---

## 🎯 Project Overview & Motive

Managing personal finances can be overwhelming. Spreadsheets are tedious, and dedicated apps often hide features behind paywalls. **FinSight** was built to solve this — a beautifully crafted, open, and interactive finance dashboard that helps everyday users:

- **Visualise spending patterns** with interactive pie charts, bar charts, area graphs, and composed trend lines.
- **Identify top expense categories** and discover which habits (Shopping, Food, Entertainment …) consume the most income each month.
- **Track income vs. expenses over time** with cumulative balance and savings-vs-expense area charts.
- **Get actionable spending advice** — the intelligent "Spending Advice Banner" compares this-week vs. last-week expenses and nudges users towards healthier financial behaviour.

For **administrators**, FinSight provides a global, multi-user transaction management console with full CRUD capabilities, advanced analytics across all users, and user lifecycle management.

> _"It's not about having lots of money. It's knowing how to manage it."_ — FinSight

---

## 🛠 Tech Stack

- **UI Framework**: React 19.2
- **Build Tool**: Vite 8.0
- **Routing**: React Router DOM 7.13
- **Data Visualisation**: Recharts 3.8
- **Animations**: Framer Motion 12.x
- **Icons**: Lucide React + Font Awesome 6
- **Styling**: Vanilla CSS (Modular per-component CSS files with CSS variables)
- **Data Persistence**: Client-Side `localStorage` & `sessionStorage`

---

## 🚀 Setup & Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sonu-ABC/zorvyn-assessment.git
   cd zorvyn-assessment/vite-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The app opens at **http://localhost:5173**.

---

## 👤 Role of User and Admin

FinSight implements a robust **role-based access control (RBAC)** system:

### 👤 User Role
A standard user can access the **User Dashboard** to monitor their own personal finances.
- **Read-only access** to their pre-seeded or registered transactions.
- Interactive visualizations across Home, Transactions, and Insights sections.
- Export their own transactions as CSV.
- Track their personal Income vs Expense, categories, and get weekly advice.

### 🛡️ Admin Role
An administrator has elevated, platform-wide access, viewing the **Admin Dashboard**.
- **Global visibility** into all users' transactions and aggregated metrics.
- **Full CRUD operations**: Add transactions for any user, edit any transaction (inline modal), and delete transactions or users globally.
- **User management**: Monitor all registered users and manage their data.

---

## ⭐ Project Features & Evaluation Criteria

### 1. Design and Creativity
*Visual quality, layout decisions, and how intuitively information is presented.*

- **Landing Page Animations**: The landing page creates a strong first impression using **Framer Motion**. A mobile phone mockup (hand) rises smoothly from below via a satisfying cubic-bezier curve. Simultaneously, 13 finance-themed bubbles (using Font Awesome icons like piggy bank, wallet) burst outward radially with staggered delays and hover micro-interactions to create a dynamic, living interface.
- **Dark / Light Mode**: A fully integrated theming system. A Sun/Moon toggle in the sidebar flips the root `.dark` or `.light` class, persisting the preference in `localStorage`. Colors, charts, and shadows adapt seamlessly.
- **Dashboard Aesthetics**: 
  - **Credit Card Widget**: A realistic glassmorphic credit card showing the user's net balance visually.
  - **Color Palette Harmonies**: Carefully curated hues (indigo, gold, emerald, coral) ensure the Recharts visualizations look modern and readable.

### 2. Responsiveness
*Adaptability across screen sizes and devices.*

The application employs a mobile-first philosophy using CSS Flexbox and Grid.
- **Adaptive Sidebars**: The sidebars natively collapse into icon-only rails (`sidebarCollapsed` state) on smaller screens. 
- **Fluid Charts**: All Recharts visualizations are enclosed in `ResponsiveContainer`, adapting to 100% of their parent component width.
- **Landing Page Media Queries**: On mobile screens (under 770px), the complex scattered bubbles are gracefully hidden (`display: none`), and the animated hand snaps to a static, readable size to prevent layout breaking or jank. 
- **Overflow Handling**: Content grids switch from multi-column templates to stacked single-column templates to avoid horizontal scrolling on phones.

### 3. Functionality
*Implementation of dashboard features, RBAC behavior, and interactions.*

- **Insights & Drill-down**: The dashboard pinpoints the "Highest Spend Day" and "Lowest Spend Day", allowing the user to click and drill down into the exact transactions on that specific day in an inline table.
- **Export as CSV**: In the Transactions view, users can download their currently filtered transactions directly to a `.csv` file via a client-side Blob generation implementation.
- **Admin Dashboard Real-time CRUD**: Admins can edit or delete a transaction within an inline modal, or add a new transaction. The list reflects changes instantaneously without refreshing, powered by local state synchronization.
- **Smart Spending Advice**: Calculates a week-over-week spending difference and informs the user whether their spending is trending up, down, or remaining stable.

### 4. User Experience
*Ease of use, navigation clarity, and interaction design.*

- **Single-page Scroll Navigation**: The User Dashboard employs a scrollspy approach. Sections (Home, Transactions, Insights) can be scrolled through naturally, while the active state in the sidebar updates dynamically via intersection observers.
- **Interactive Visualizations**: Hover events on Pie Charts gracefully expand the sector radius while displaying a glowing, customized tool-tip (`<ChartTip>`).
- **Ease of Access**: Clear login dropdown lets users easily identify if they want to log in as a User or an Admin.

### 5. Technical Quality
*Code structure, modularity, scalability, and best practices.*

- **Modular Code Structure**: The project completely adheres to separation of concerns. 
  - Components are divided by domain: `/admin`, `/auth`, `/common`, `/dashboard`.
  - Heavy computation logic is entirely abstracted into pure, side-effect-free utility functions inside `src/utils/transactionUtils.js`. 
  - Each React component carries its own scoped `.css` file for maintainability.
- **Advanced Filtering**: Transactions are filtered via a deeply optimized `useMemo` pipeline supporting multi-dimensional criteria simultaneously: Date ranges ("Last N Days"), Type (Income/Expense), Category, an Amount Range slider (Min/Max dual slider), and fuzzy Full-Text Search.

### 6. State Management Approach
*How effectively application state and UI logic are handled.*

FinSight utilizes a unique, backend-less architecture reliant on `localStorage` for complete data persistency.
- **React Context (`AuthContext`)**: Handles the live session state tied to `sessionStorage`. Ensures the session resets if the tab is closed, but survives a hot refresh.
- **Data Persistency**: All User/Admin additions, edits, edits, and deletions are saved to `localStorage` via key-value delta maps (e.g., `finsight_edited_txns`, `finsight_deleted_txn_ids`). The app merges these override objects against the 880-line mock JSON dataset at runtime to build the final list of transactions.
- **Updates & Data Versioning**: A defined `DATA_VERSION` hook runs in `main.jsx`. If a deployment changes the mock definitions (e.g., v2), the app automatically purges outdated localStorage datasets while safeguarding the user's Theme Preference (`finsight_theme`).

### 7. Documentation
*Clear README including setup instructions, overview of approach, and explanation of features.*

This README.md fulfills the overarching documentation requirement, providing context on motivation, technology choices, usage, and a deep-dive mapped directly to evaluative criteria.

### 8. Attention to Detail
*Handling of edge cases, UI polish, and overall completeness.*

- **Handling Empty or No Data**: The application meticulously handles blank states. A brand new user signed up has zero transactions. Instead of broken charts, the user sees helpful placeholder illustrations (`<EmptyChart />`) and messages (e.g., *"No transactions yet — Your transactions will appear here once you start tracking your finances."*). The advice banner safely reports *"Not enough data"*. Filter screens without matches show *"No transactions match your filters."*
- **Toast Notifications**: Every CRUD event (e.g. "Transaction successfully deleted") relies on a reusable `<Toast />` component that appears, runs an animated progress bar based on the exit timeout, and seamlessly detaches—preventing alert boxes from breaking user immersion.
- **Custom Scrollspy Validation**: Form fields dynamically show context-aware red helper text if left empty or the email format is structurally flawed. 

---

## 🧪 Pre-seeded Demo Accounts

Multiple test accounts with a full year of seeded data (Jan-Dec 2025) are available to experience different dashboard flavors:

| Username | Password | Role | Persona |
|---|---|---|---|
| `sofia` | `sofia@123` | User | Cake Artist |
| `john_doe` | `User@123` | User | Software Engineer |
| `jane_doe` | `User@456` | User | Senior Product Designer (high spender) |
| `arunima` | `arunima@123` | User | Marketing Head (balanced saver) |
| `elsa` | `elsa@123` | Admin | Chief Executive Officer |
| `alice` | `alice@123` | Admin | Finance Manager |

Try logging into `jane_doe` to observe heavy shopping behavior, or `elsa` to access the Admin Console and alter transactions across all users.

---

<div align="center">

**Built with ❤️ using React, Recharts, Framer Motion & Vanilla CSS**

*FinSight — Because every rupee tells a story.*

</div>
]]>
