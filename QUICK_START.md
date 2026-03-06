# 🚀 Quick Start Guide

## Get Your App Running in 3 Steps!

### Step 1️⃣: Get Supabase Credentials (2 minutes)

1. Go to https://app.supabase.com
2. Open your project
3. Click **Settings** (⚙️) → **API**
4. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 2️⃣: Create .env File (1 minute)

In your `client` folder, create a file named `.env`:

```env
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3️⃣: Run Database Schema (2 minutes)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open the file `SUPABASE_SCHEMA.sql` from your project
4. Copy ALL the content
5. Paste into SQL Editor
6. Click **Run** (▶️)

You should see: "Success. No rows returned"

---

## 🎉 That's It! Now Run Your App

```bash
cd client
npm run dev
```

Open http://localhost:5173 and:
1. Click "Create Account"
2. Register with your email
3. Start adding bills!

---

## ✅ How to Verify It's Working

1. **Register** a new account
2. **Add a bill** in Bills Manager
3. Go to your Supabase dashboard → **Table Editor** → **bills**
4. You should see your bill there! 🎊

---

## 🆘 Having Issues?

### "Failed to load bills"
- Check your `.env` file is in the `client` folder (not root)
- Make sure you copied the URL and key correctly
- Restart your dev server after creating `.env`

### "Authentication error"
- Make sure you ran the SQL schema
- Check Supabase dashboard → **Authentication** → **Users**
- Try registering a new account

### Still stuck?
Check `SUPABASE_SETUP.md` for detailed troubleshooting!

---

## 📊 What You Get

✅ Secure user authentication
✅ Personal bill management
✅ Real-time data sync
✅ Cloud database (access from anywhere)
✅ Multi-user support (each user sees only their data)

Enjoy your Smart Home app! 🏠💚
