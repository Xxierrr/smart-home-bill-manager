# Quick Start Guide - SmartHome Bill Manager

## ✅ What's Been Done

### 1. Currency Conversion to Rupees (₹)
- All amounts throughout the application now use Indian Rupees
- Created utility functions for consistent currency formatting
- Updated all mock data with realistic Indian prices

### 2. Database Setup
- Complete MongoDB models for Users, Households, Bills, and Insights
- All monetary values stored in INR
- Database seeded with sample data

### 3. Sample Data Created
The database now contains:
- **Demo User**: demo@smarthome.com / demo123
- **Household**: 3BHK apartment in Bangalore with 4 residents
- **Bills**: 
  - Electricity: ₹2,800 (BESCOM)
  - Water: ₹650 (BWSSB)
  - Internet: ₹599 (Airtel)
  - Gas: ₹1,200 (Indane)
  - Rent: ₹8,000
  - Groceries: ₹4,500
- **Insights**: 4 AI-generated tips for savings

## 🚀 Running the Application

The application is already running:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Database**: MongoDB on localhost:27017

## 📊 Current Features

### Dashboard
- Total expenses in ₹
- Upcoming bills with Indian providers
- Monthly trend charts
- Category breakdown
- Cost per resident calculation
- Potential savings insights

### Database Models

**User Model**
- Authentication with JWT
- Profile information
- Preferences (currency set to INR)

**Household Model**
- Property details
- Indian address format
- Resident count
- House type

**Bill Model**
- Category-wise bills
- Recurring bill support
- Payment tracking
- Provider information
- Account numbers

**Insight Model**
- AI-generated tips
- Savings calculations in ₹
- Priority levels
- Read/unread status

## 🔧 Available Commands

### Seed Database
```bash
cd server
npm run seed
```

### Start Development
```bash
npm run dev
```

### Start Individual Services
```bash
npm run dev:client  # Frontend only
npm run dev:server  # Backend only
```

## 📝 API Endpoints

All endpoints are available at `http://localhost:5000/api/v1`

### Authentication
- POST `/auth/register` - Create new account
- POST `/auth/login` - Login
- GET `/auth/me` - Get current user

### Bills
- POST `/bills` - Create bill
- GET `/bills` - Get all bills (with filters)
- GET `/bills/upcoming` - Get upcoming bills
- PUT `/bills/:id` - Update bill
- PATCH `/bills/:id/pay` - Mark as paid
- DELETE `/bills/:id` - Delete bill

### Households
- POST `/households` - Create household
- GET `/households/:id` - Get details
- PUT `/households/:id` - Update

### Insights
- GET `/insights` - Get all insights
- PATCH `/insights/:id/read` - Mark as read

## 💡 Next Steps

To connect the frontend with the backend:

1. **Update Login Page** to use the API
2. **Fetch Real Data** in Dashboard from backend
3. **Implement Bill Management** with CRUD operations
4. **Add Analytics** with real data from database
5. **Create Insights Engine** for AI recommendations

## 🔐 Demo Credentials

```
Email: demo@smarthome.com
Password: demo123
```

## 📁 Key Files

- `client/src/utils/currency.js` - Currency formatting utilities
- `client/src/services/api.js` - API service layer
- `server/src/models/` - Database models
- `server/src/routes/` - API routes
- `server/src/seed.js` - Database seeding script

## 🎨 Currency Display

All amounts use the `formatCurrency()` utility:
```javascript
import { formatCurrency } from '../utils/currency'

formatCurrency(2800) // Returns: ₹2,800
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)
