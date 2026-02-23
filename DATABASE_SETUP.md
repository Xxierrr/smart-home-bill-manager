# Database Setup Guide

## Overview
This application uses MongoDB to store all data including users, households, bills, and insights. All monetary values are stored in Indian Rupees (₹).

## Database Models

### 1. User Model
Stores user authentication and profile information.

**Fields:**
- `email` - User's email (unique)
- `password` - Hashed password
- `firstName` - User's first name
- `lastName` - User's last name
- `phone` - Contact number
- `preferences` - User preferences (currency: INR, theme, notifications)

### 2. Household Model
Stores household/property information.

**Fields:**
- `userId` - Reference to User
- `name` - Household name
- `address` - Complete address (street, city, state, zipCode, country)
- `numberOfRooms` - Number of rooms
- `numberOfResidents` - Number of people living
- `houseType` - Type (apartment, house, condo, other)
- `squareFootage` - Area in square feet

### 3. Bill Model
Stores all bill information with amounts in INR.

**Fields:**
- `householdId` - Reference to Household
- `category` - Bill type (electricity, water, gas, internet, rent, groceries, maintenance)
- `amount` - Bill amount in ₹
- `dueDate` - Payment due date
- `paidDate` - Actual payment date
- `status` - Payment status (pending, paid, overdue)
- `isRecurring` - Whether bill repeats
- `recurringFrequency` - Frequency (monthly, quarterly, yearly)
- `provider` - Service provider name
- `accountNumber` - Account/consumer number
- `notes` - Additional notes
- `billImageUrl` - Uploaded bill image

### 4. Insight Model
Stores AI-generated insights and recommendations.

**Fields:**
- `householdId` - Reference to Household
- `type` - Insight type (warning, tip, prediction, comparison)
- `category` - Related bill category
- `title` - Insight title
- `description` - Detailed description
- `potentialSavings` - Estimated savings in ₹
- `priority` - Priority level (high, medium, low)
- `isRead` - Whether user has read it

## Setup Instructions

### 1. Install MongoDB
Make sure MongoDB is installed and running on your system.

**Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Or use chocolatey
choco install mongodb
```

**Start MongoDB:**
```bash
mongod
```

### 2. Configure Environment
The `.env` file in the server folder is already configured:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smarthome
JWT_SECRET=smarthome_secret_key_2026_change_in_production
NODE_ENV=development
```

### 3. Seed the Database
Run the seed script to populate the database with sample data:

```bash
cd server
npm run seed
```

This will create:
- 1 demo user (email: demo@smarthome.com, password: demo123)
- 1 household with Indian address
- 8 bills with amounts in ₹ (electricity, water, gas, internet, rent, groceries)
- 4 insights with savings in ₹

### 4. Verify Database
You can verify the data using MongoDB Compass or the mongo shell:

```bash
mongosh
use smarthome
db.users.find()
db.households.find()
db.bills.find()
db.insights.find()
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (protected)

### Households
- `POST /api/v1/households` - Create household
- `GET /api/v1/households/:id` - Get household details
- `PUT /api/v1/households/:id` - Update household

### Bills
- `POST /api/v1/bills` - Create new bill
- `GET /api/v1/bills` - Get all bills (with filters)
- `GET /api/v1/bills/upcoming` - Get upcoming bills
- `PUT /api/v1/bills/:id` - Update bill
- `PATCH /api/v1/bills/:id/pay` - Mark bill as paid
- `DELETE /api/v1/bills/:id` - Delete bill

### Insights
- `GET /api/v1/insights` - Get all insights
- `PATCH /api/v1/insights/:id/read` - Mark insight as read

## Currency Format
All amounts are stored as numbers in the database and displayed with Indian Rupee symbol (₹) in the frontend using:

```javascript
amount.toLocaleString('en-IN') // Formats with Indian number system
```

Example: 17849 displays as "₹17,849"

## Data Persistence
All data is automatically saved to MongoDB. The application maintains:
- User sessions via JWT tokens
- Bill history with payment tracking
- Recurring bill patterns
- Insight generation based on spending patterns
