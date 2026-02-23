# Installation Checklist - Get Your Database Running

Follow these steps in order:

## ☐ Step 1: Download MongoDB

1. Open browser and go to: **https://www.mongodb.com/try/download/community**
2. Select:
   - Version: **7.0 or higher**
   - Platform: **Windows**
   - Package: **MSI**
3. Click **Download** button
4. Wait for download to complete (file size: ~300 MB)

## ☐ Step 2: Install MongoDB

1. Find the downloaded file (usually in Downloads folder)
2. Double-click the `.msi` file to start installation
3. Click **Next** on welcome screen
4. Accept license agreement
5. Choose **Complete** installation type
6. **IMPORTANT**: Make sure these are checked:
   - ✅ Install MongoDB as a Service
   - ✅ Run service as Network Service user
   - ✅ Install MongoDB Compass
7. Click **Next** → **Install**
8. Wait 5-10 minutes for installation
9. Click **Finish**

## ☐ Step 3: Create Data Folder

1. Open **Command Prompt as Administrator**:
   - Press `Win + X`
   - Click "Command Prompt (Admin)" or "PowerShell (Admin)"
2. Type this command and press Enter:
   ```bash
   mkdir C:\data\db
   ```
3. You should see the folder created (no error message = success!)

## ☐ Step 4: Start MongoDB Service

In the same Command Prompt window, type:
```bash
net start MongoDB
```

You should see:
```
The MongoDB Server service is starting.
The MongoDB Server service was started successfully.
```

## ☐ Step 5: Verify MongoDB is Running

Type this command:
```bash
sc query MongoDB
```

Look for:
```
STATE              : 4  RUNNING
```

If you see "RUNNING", MongoDB is working! ✅

## ☐ Step 6: Seed Your Database

1. Open a new Command Prompt (regular, not admin)
2. Navigate to your project:
   ```bash
   cd C:\Users\Gyan Prakash Tiwari\OneDrive\Documents\My_project_3
   ```
3. Go to server folder:
   ```bash
   cd server
   ```
4. Run the seed script:
   ```bash
   npm run seed
   ```

You should see:
```
✅ MongoDB Connected
🗑️  Cleared existing data
👤 Created user: demo@smarthome.com
🏠 Created household: My Home
💰 Created 8 bills
💡 Created 4 insights

✅ Database seeded successfully!
```

## ☐ Step 7: Open MongoDB Compass

1. Press `Win` key and search for "MongoDB Compass"
2. Open the application
3. You'll see a connection string: `mongodb://localhost:27017`
4. Click **Connect**
5. You should see your **smarthome** database!
6. Click on it to explore:
   - **users** - Your user accounts
   - **households** - Property information
   - **bills** - All bills in ₹
   - **insights** - AI recommendations

## ☐ Step 8: Test Your Application

1. Make sure your app is running:
   ```bash
   npm run dev
   ```
2. Open browser: **http://localhost:5173**
3. You should see the dashboard with data in rupees (₹)!

## ✅ Success Checklist

Verify everything is working:

- [ ] MongoDB service is running (`net start MongoDB` shows success)
- [ ] Data folder exists at `C:\data\db`
- [ ] Seed script ran successfully
- [ ] MongoDB Compass shows "smarthome" database
- [ ] Can see 8 bills in the bills collection
- [ ] Application shows dashboard with ₹ amounts
- [ ] No errors in browser console (F12)

## 🎉 You're Done!

Your database is now:
- ✅ Installed on your laptop
- ✅ Running as a Windows service
- ✅ Storing all data locally at C:\data\db
- ✅ Populated with sample data
- ✅ Ready to use!

## Troubleshooting

### Problem: "MongoDB service not found"
**Solution**: MongoDB didn't install as service. Start manually:
```bash
mongod --dbpath C:\data\db
```
Keep this window open while using the app.

### Problem: "Access denied" when creating C:\data\db
**Solution**: Run Command Prompt as Administrator (Win + X → Command Prompt Admin)

### Problem: Seed script shows "Connection refused"
**Solution**: MongoDB isn't running. Start it:
```bash
net start MongoDB
```

### Problem: Port 27017 already in use
**Solution**: MongoDB is already running! This is fine, just continue to next step.

### Problem: Can't find MongoDB Compass
**Solution**: 
1. Search in Start Menu for "MongoDB Compass"
2. Or download separately from: https://www.mongodb.com/try/download/compass

## Daily Usage

From now on, you don't need to do anything special:
1. MongoDB starts automatically when Windows starts
2. Just run `npm run dev` to use your app
3. All data saves automatically
4. Use MongoDB Compass anytime to view data

## Quick Commands

```bash