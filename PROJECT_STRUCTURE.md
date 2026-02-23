# SmartHome Bill Manager - Project Structure

## Directory Structure
```
smarthome-bill-manager/
├── client/                      # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── bills/
│   │   │   ├── analytics/
│   │   │   ├── insights/
│   │   │   ├── profile/
│   │   │   ├── layout/
│   │   │   └── shared/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── context/
│   │   └── styles/
│   └── package.json
├── server/                      # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Component Hierarchy

### Layout Components
- Sidebar (Navigation)
- Header (User profile, notifications)
- MainLayout (Wrapper)

### Page Components
1. Dashboard (Main overview)
2. BillsManager (CRUD operations)
3. Analytics (Charts & reports)
4. SmartInsights (AI recommendations)
5. HouseProfile (Setup & management)
6. Settings (User preferences)

### Feature Components
- BillCard
- ExpenseChart
- SavingsIndicator
- UpcomingBillsList
- CategoryBreakdown
- InsightCard
- AlertBanner
