# How Data Storage Works in Your App

## Simple Explanation

Think of MongoDB like a filing cabinet on your laptop:
- Each drawer = a collection (users, bills, households)
- Each file = a document (one bill, one user)
- The cabinet = your database (stored at C:\data\db)

## Data Flow

```
Your Browser (http://localhost:5173)
         ↓
    React Frontend
         ↓
    API Calls (axios)
         ↓
    Express Backend (http://localhost:5000)
         ↓
    MongoDB Database (localhost:27017)
         ↓
    Hard Drive (C:\data\db)
```

## What Gets Stored?

### 1. Users Collection
Every user account you create:
```javascript
{
  _id: "507f1f77bcf86cd799439011",
  email: "demo@smarthome.com",
  password: "hashed_password",
  firstName: "Demo",
  lastName: "User",
  phone: "+91 9876543210",
  preferences: {
    currency: "INR",
    theme: "light"
  },
  createdAt: "2026-02-20T10:30:00Z"
}
```

### 2. Households Collection
Your home information:
```javascript
{
  _id: "507f1f77bcf86cd799439012",
  userId: "507f1f77bcf86cd799439011",
  name: "My Home",
  address: {
    street: "123 MG Road",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001"
  },
  numberOfResidents: 4,
  houseType: "apartment"
}
```

### 3. Bills Collection
Every bill you add:
```javascript
{
  _id: "507f1f77bcf86cd799439013",
  householdId: "507f1f77bcf86cd799439012",
  category: "electricity",
  amount: 2800,  // in rupees
  dueDate: "2026-02-25",
  status: "pending",
  provider: "BESCOM",
  accountNumber: "ELEC123456",
  isRecurring: true,
  recurringFrequency: "monthly"
}
```

### 4. Insights Collection
AI-generated recommendations:
```javascript
{
  _id: "507f1f77bcf86cd799439014",
  householdId: "507f1f77bcf86cd799439012",
  type: "tip",
  title: "Water Conservation Tip",
  description: "Installing aerators can save ₹200/month",
  potentialSavings: 200,
  priority: "medium"
}
```

## Where is Everything Stored?

### On Your Laptop:
```
C:\data\db\                          ← Main database folder
├── collection-0-xxx.wt              ← Users data
├── collection-2-xxx.wt              ← Bills data
├── collection-4-xxx.wt              ← Households data
├── collection-6-xxx.wt              ← Insights data
└── WiredTiger.wt                    ← Database engine
```

### In Your Project:
```
My_project_3/
├── client/                          ← Frontend (React)
│   └── src/
│       ├── pages/                   ← UI pages
│       ├── services/api.js          ← API calls
│       └── utils/currency.js        ← Formatting
│
└── server/                          ← Backend (Node.js)
    ├── .env                         ← Database connection
    └── src/
        ├── models/                  ← Data structure
        ├── routes/                  ← API endpoints
        └── seed.js                  ← Sample data
```

## How Data Persists

### When You Add a Bill:
1. You fill the form in browser
2. Frontend sends data to backend API
3. Backend validates and saves to MongoDB
4. MongoDB writes to hard drive (C:\data\db)
5. Data is now permanent!

### When You View Bills:
1. Frontend requests data from backend
2. Backend queries MongoDB
3. MongoDB reads from hard drive
4. Backend sends data to frontend
5. Frontend displays in rupees (₹)

## Data Lifecycle

```
CREATE (Add new bill)
   ↓
STORE (Save to MongoDB)
   ↓
PERSIST (Write to hard drive)
   ↓
READ (View in app)
   ↓
UPDATE (Edit bill)
   ↓
DELETE (Remove bill)
```

## Checking Your Data

### Method 1: MongoDB Compass (Visual)
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Click "smarthome" database
4. Browse collections visually

### Method 2: Command Line
```bash
mongosh
use smarthome
db.bills.find()           # See all bills
db.users.find()           # See all users
db.households.find()      # See all households
```

### Method 3: In Your App
Just use the app! All data you see is from the database.

## Data Size

Typical storage per record:
- User: ~500 bytes
- Household: ~300 bytes
- Bill: ~400 bytes
- Insight: ~350 bytes

For 1000 bills: ~400 KB (very small!)

## Backup Your Data

### Automatic Backup (Recommended)
Create a backup script:

```bash
# backup.bat
@echo off
set BACKUP_DIR=C:\Backups\SmartHome\%date:~-4,4%-%date:~-10,2%-%date:~-7,2%
mkdir "%BACKUP_DIR%"
mongodump --db smarthome --out "%BACKUP_DIR%"
echo Backup completed to %BACKUP_DIR%
```

Run this weekly to keep backups.

### Manual Backup
```bash
mongodump --db smarthome --out C:\Backups\SmartHome
```

### Restore from Backup
```bash
mongorestore --db smarthome C:\Backups\SmartHome\smarthome
```

## Data Security

Your data is secure because:
- ✅ Stored locally on your laptop
- ✅ Not accessible from internet
- ✅ Passwords are hashed (encrypted)
- ✅ Only accessible via localhost
- ✅ JWT tokens for authentication

## Common Questions

**Q: Will data be lost if I close the app?**
A: No! Data is saved to hard drive permanently.

**Q: Will data be lost if I restart my laptop?**
A: No! MongoDB service starts automatically.

**Q: How much space does it use?**
A: Very little - even 1000 bills = less than 1 MB.

**Q: Can I access data from another computer?**
A: Not by default. Use MongoDB Atlas (cloud) for that.

**Q: Is my data private?**
A: Yes! It's only on your laptop, not on any server.

**Q: Can I export my data?**
A: Yes! Use MongoDB Compass to export to JSON/CSV.

## Viewing Real-Time Data

### In MongoDB Compass:
1. Open Compass
2. Connect to localhost:27017
3. Select "smarthome" database
4. Click any collection
5. See all records in real-time
6. Click "Refresh" to see new data

### In Your App:
- Dashboard shows real data from database
- Add a bill → instantly saved to database
- Refresh page → data still there!

## Summary

✅ **MongoDB = Your local database**
✅ **C:\data\db = Where data is stored**
✅ **Data persists forever (until you delete it)**
✅ **All amounts in Indian Rupees (₹)**
✅ **Accessible only from your laptop**
✅ **Can backup/restore anytime**
✅ **View with MongoDB Compass or your app**

Your data is safe, permanent, and always available on your laptop!
