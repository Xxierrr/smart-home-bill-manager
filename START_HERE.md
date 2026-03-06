# 👋 START HERE - Supabase Integration Guide

## 🎯 Your Mission: Connect Your App to Supabase

Your Smart Home app is ready to connect to Supabase! Follow these simple steps:

---

## 📍 Step 1: Get Your Supabase Keys (2 minutes)

1. Open https://app.supabase.com in your browser
2. Click on your project (you should see "bills" table)
3. Click the **Settings** icon (⚙️) in the left sidebar
4. Click **API** in the settings menu
5. You'll see two important values:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Keep this tab open!** You'll need these values in the next step.

---

## 📍 Step 2: Create Your .env File (1 minute)

1. Open your project in your code editor
2. Navigate to the `client` folder
3. Create a new file called `.env` (yes, it starts with a dot!)
4. Copy and paste this template:

```env
VITE_SUPABASE_URL=paste_your_url_here
VITE_SUPABASE_ANON_KEY=paste_your_key_here
```

5. Replace the values with your actual Supabase credentials
6. Save the file

**Example of what it should look like:**
```env
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NjQwMDAsImV4cCI6MjAwNTEzOTk5OX0.xxxxxxxxxxxxx
```

---

## 📍 Step 3: Set Up Your Database (2 minutes)

1. Go back to your Supabase dashboard
2. Click **SQL Editor** in the left sidebar
3. Click the **New Query** button
4. Open the file `SUPABASE_SCHEMA.sql` from your project
5. Copy **ALL** the content (Ctrl+A, Ctrl+C)
6. Paste it into the SQL Editor
7. Click the **Run** button (▶️)

**Success looks like:**
```
Success. No rows returned
```

This creates all the tables your app needs!

---

## 📍 Step 4: Start Your App (30 seconds)

Open your terminal and run:

```bash
cd client
npm run dev
```

Your app should open at http://localhost:5173

---

## 📍 Step 5: Test Everything (2 minutes)

1. Click **"Create Account"**
2. Fill in your details:
   - First Name: Your name
   - Last Name: Your last name
   - Email: your@email.com
   - Password: at least 6 characters
3. Check "I agree to Terms"
4. Click **"Create Account"**

You should be redirected to the Dashboard! 🎉

Now test adding a bill:
1. Click **"Bills Manager"** in the sidebar
2. Click **"Add Bill"**
3. Fill in the form:
   - Category: Electricity
   - Provider: BESCOM
   - Amount: 2500
   - Due Date: Pick a date
4. Click **"Add Bill"**

---

## ✅ Verify It's Working

Go to your Supabase dashboard:
1. Click **Table Editor**
2. Click **bills** table
3. You should see your bill there! 🎊

---

## 🎉 Success!

If you can see your bill in Supabase, everything is working perfectly!

Your app now:
- ✅ Stores data in the cloud
- ✅ Has secure user authentication
- ✅ Syncs across devices
- ✅ Protects user data with RLS

---

## 🆘 Something Not Working?

### Can't find .env file after creating it?
- Make sure it's in the `client` folder, not the root
- File name is exactly `.env` (with the dot)
- No extra spaces or characters

### "Failed to load bills" error?
- Check your `.env` file has the correct values
- Make sure you copied the full anon key (it's very long!)
- Restart your dev server (Ctrl+C, then `npm run dev` again)

### Can't register?
- Make sure you ran the SQL schema in Step 3
- Check Supabase dashboard → Authentication → Users
- Try a different email address

### Still stuck?
Check these files for more help:
- `QUICK_START.md` - Quick reference
- `SUPABASE_SETUP.md` - Detailed guide
- `CHECKLIST.md` - Step-by-step checklist

---

## 🚀 What's Next?

Now that your app is connected:
- Add more bills
- Edit your house profile
- Explore the dashboard
- Invite friends to try it!

Enjoy your Smart Home app! 🏠💚
