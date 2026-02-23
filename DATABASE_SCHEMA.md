# Database Schema Design

## Collections

### 1. Users
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String,
  lastName: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date,
  preferences: {
    theme: String (light/dark),
    currency: String,
    notifications: Boolean
  }
}
```

### 2. Households
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  numberOfRooms: Number,
  numberOfResidents: Number,
  houseType: String (apartment/house/condo),
  squareFootage: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Appliances
```javascript
{
  _id: ObjectId,
  householdId: ObjectId (ref: Households),
  name: String,
  category: String (cooling/heating/kitchen/laundry),
  wattage: Number,
  hoursPerDay: Number,
  quantity: Number,
  estimatedMonthlyCost: Number,
  createdAt: Date
}
```

### 4. Bills
```javascript
{
  _id: ObjectId,
  householdId: ObjectId (ref: Households),
  category: String (electricity/water/gas/internet/rent/groceries/maintenance),
  amount: Number,
  dueDate: Date,
  paidDate: Date,
  status: String (pending/paid/overdue),
  isRecurring: Boolean,
  recurringFrequency: String (monthly/quarterly/yearly),
  provider: String,
  accountNumber: String,
  notes: String,
  billImageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Insights
```javascript
{
  _id: ObjectId,
  householdId: ObjectId (ref: Households),
  type: String (warning/tip/prediction/comparison),
  category: String,
  title: String,
  description: String,
  potentialSavings: Number,
  priority: String (high/medium/low),
  isRead: Boolean,
  createdAt: Date
}
```

### 6. Alerts
```javascript
{
  _id: ObjectId,
  householdId: ObjectId (ref: Households),
  type: String (due_date/overspending/high_bill),
  message: String,
  billId: ObjectId (ref: Bills),
  isRead: Boolean,
  createdAt: Date
}
```

## Indexes
- Users: email (unique)
- Bills: householdId, dueDate, status
- Households: userId
- Insights: householdId, createdAt
- Alerts: householdId, isRead
