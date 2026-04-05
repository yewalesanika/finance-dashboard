Finance Dashboard UI
A clean and interactive finance dashboard built as a frontend assignment. The app allows users to track financial activity, explore transactions, and understand spending patterns — all powered by mock data on the frontend.

Tech Stack
ToolPurposeReact + ViteFrontend framework and build toolTailwind CSSStyling and responsive layoutRedux ToolkitGlobal state managementRechartsData visualizationsGSAPAnimations and transitionsReact RouterClient-side routingLucide ReactIcons

Getting Started
Prerequisites

Node.js v18 or above
npm

Installation
bash
# Clone the repository
git clone https://github.com/yewalesanika/finance-dashboard.git

# Navigate into the project
cd finance-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
The app will be running at http://localhost:5173

Features
Dashboard Overview

Summary cards showing Total Balance, Total Income, and Total Expenses
Monthly trend Bar Chart (income vs expenses per month)
Category breakdown Donut Chart (spending by category)

Transactions

Full transactions table with Date, Description, Category, Type, and Amount
Search by description
Filter by type (Income / Expense)
Filter by category
Color coded badges and amounts (green for income, red for expense)

Role Based UI (RBAC)

No page is accessible until a role is selected from the navbar
Admin — can view, add, edit, and delete transactions
Viewer — can only view data, no edit controls visible
Role is managed via Redux and persists across page navigation

Insights

Highest spending category with total amount
This month vs last month expense comparison with % change
Savings rate as a percentage of total income
Average daily expense
Total transaction count with income and expense breakdown


Project Structure
src/
├── components/
│   ├── dashboard/
│   │   ├── SummaryCards.jsx
│   │   └── Charts.jsx
│   ├── transaction/
│   │   ├── TransactionTable.jsx
│   │   ├── TransactionFilters.jsx
│   │   ├── EditModal.jsx
│   │   └── AddModal.jsx
│   └── role/
│       ├── RoleGate.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Transaction.jsx
│   └── Insights.jsx
├── store/
│   ├── store.js
│   └── slice/
│       ├── dataSlice.js
│       ├── filterSlice.js
│       ├── operationSlice.js
│       └── roleSlice.js
├── handlers/
│   ├── dashboardHandler.js
│   ├── transactionHandler.js
│   └── navbarHandler.js
├── data/
│   └── transaction_data.js
└── App.jsx

State Management
Redux Toolkit is used with 4 slices:
SliceManagesdataSliceAll transaction data, add, edit, deletefilterSliceSearch query, type filter, category filteroperationSliceEdit modal open/close stateroleSliceCurrently selected role (admin / viewer)

Role Switching
A role selector dropdown is available in the navbar. Select a role to access the app:

Admin — full access including adding, editing, and deleting transactions
Viewer — read only access, no modification controls are shown

If no role is selected, all pages display an access restricted message.

Animations
GSAP is used throughout the app for:

Navbar links stagger entrance on load
Logo slide in from left on load
Mobile menu slide in animation
Summary cards stagger entrance on Dashboard
Transaction rows stagger on load and filter change
Insights cards stagger entrance on page load


Mock Data
The app uses static mock data located in src/data/transaction_data.js with 34 transactions across 3 months (January to March 2025), covering categories like Salary, Freelance, Food, Rent, Transport, Shopping, Health, Utilities, and Investment.