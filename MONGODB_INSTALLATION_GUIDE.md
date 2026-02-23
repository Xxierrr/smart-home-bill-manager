# MongoDB Installation Guide for Windows

## Why MongoDB?
MongoDB is a database that stores all your application data locally on your laptop:
- User accounts and profiles
- Household information
- All bills and payment history
- Insights and recommendations
- Everything persists even after closing the app

## Installation Methods

### Method 1: Download Installer (Recommended)

#### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or higher)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. **IMPORTANT**: Check "Install MongoDB as a Service"
4. **IMPORTANT**: Check "Install MongoDB Compass" (GUI tool)
5. Click "Next" and "Install"
6. Wait for installation to complete

#### Step 3: Verify Installation
Open Command Prompt or PowerShell and run:
```bash
mongod --version
```

You should see version information.

#### Step 4: Start MongoDB Service
MongoDB should start automatically. If not:
```bash
net start MongoDB
```

### Method 2: Using Chocolatey (If you have it)

```bash
choco install mongodb
```

### Method 3: Using Winget

```bash
winget install MongoDB.Server
```

## Configure MongoDB

### 1. Create Data Directory
MongoDB stores data in a specific folder. Create it:

```bash
mkdir C:\data\db
```

### 2. Start MongoDB (if not running as service)
```bash
mongod --dbpath C:\data\db
```

## Verify Everything Works

### Test 1: Check if MongoDB is Running
```bash
# In your project folder
cd server
npm run seed
```

If you see "✅ MongoDB Connected", it's working!

### Test 2: View Your Data with MongoDB Compass

1. Open "MongoDB Compass" (installed with MongoDB)
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. You'll see your "smarthome" database
5. Click on it to explore:
   - `users` collection - All user accounts
   - `households` collection - Property information
   - `bills` collection - All bills in ₹
   - `insights` collection - AI recommendations

## Where is Data Stored?

Your data is stored locally at:
```
C:\data\db\
```

This folder contains all your database files. As long as this folder exists, your data is safe.

## Common Issues & Solutions

### Issue 1: "MongoDB service not found"
**Solution**: MongoDB didn't install as a service. Start it manually:
```bash
mongod --dbpath C:\data\db
```
Keep this window open while using the app.

### Issue 2: "Access denied to C:\data\db"
**Solution**: Run Command Prompt as Administrator and create the folder:
```bash
mkdir C:\data\db
```

### Issue 3: Port 27017 already in use
**Solution**: Another MongoDB instance is running. Either:
- Use the existing one (it's fine!)
- Or stop it: `net stop MongoDB`

### Issue 4: Can't connect to MongoDB
**Solution**: 
1. Check if MongoDB service is running:
   ```bash
   net start MongoDB
   ```
2. Check if port 27017 is accessible:
   ```bash
   netstat -an | findstr 27017
   ```

## Using Your Database

### Seed Sample Data
```bash
cd server
npm run seed
```

This creates:
- Demo user: demo@smarthome.com / demo123
- Sample household with Indian address
- 8 bills with amounts in ₹
- 4 insights

### View Data in Code
Your application automatically connects to MongoDB when you run:
```bash
npm run dev
```

### Backup Your Data

To backup all your data:
```bash
mongodump --db smarthome --out C:\backup\mongodb
```

To restore:
```bash
mongorestore --db smarthome C:\backup\mongodb\smarthome
```

## Data Persistence

✅ **Your data is permanent!**
- Survives computer restarts
- Survives app restarts
- Stored on your hard drive
- Only deleted if you manually delete it

## MongoDB Compass - Visual Database Tool

MongoDB Compass lets you:
- View all your data visually
- Add/edit/delete records manually
- Run queries
- See database statistics
- Export data to JSON/CSV

**To open**: Search "MongoDB Compass" in Windows Start Menu

## Alternative: MongoDB Atlas (Cloud)

If you want your data accessible from anywhere:

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (512MB free)
4. Get connection string
5. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarthome
   ```

## Quick Commands Reference

```bash
# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Check MongoDB status
sc query MongoDB

# Seed database
cd server
npm run seed

# View database in Compass
# Open MongoDB Compass → Connect to localhost:27017

# Backup database
mongodump --db smarthome --out C:\backup

# Restore database
mongorestore --db smarthome C:\backup\smarthome
```

## Next Steps After Installation

1. ✅ Install MongoDB (follow steps above)
2. ✅ Verify it's running: `net start MongoDB`
3. ✅ Seed the database: `npm run seed`
4. ✅ Open MongoDB Compass to view data
5. ✅ Run your app: `npm run dev`
6. ✅ All data now saves permanently!

## Need Help?

If you encounter issues:
1. Check MongoDB service is running
2. Verify port 27017 is not blocked
3. Try running Command Prompt as Administrator
4. Check MongoDB logs at: `C:\Program Files\MongoDB\Server\7.0\log\`
