# Supabase Setup Instructions

Follow these steps to connect your Smart Home application to Supabase:

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Click on your project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 2: Create Environment File

1. Navigate to the `client` folder
2. Create a new file named `.env` (copy from `.env.example`)
3. Add your credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire content from `SUPABASE_SCHEMA.sql` file
4. Paste it into the SQL Editor
5. Click **Run** to execute the schema

This will create:
- `profiles` table (user profiles)
- `households` table (household information)
- `bills` table (bill records)
- `insights` table (smart insights)
- Row Level Security (RLS) policies
- Automatic triggers for timestamps

## Step 4: Test the Connection

1. Start your development server:
```bash
cd client
npm run dev
```

2. Register a new account
3. Try adding a bill
4. Check your Supabase dashboard → **Table Editor** → **bills** to see the data

## Troubleshooting

### "Failed to load bills" error
- Check that your `.env` file is in the `client` folder
- Verify your Supabase URL and anon key are correct
- Make sure you ran the SQL schema

### Authentication not working
- Ensure the SQL schema was executed successfully
- Check that the `profiles` table exists
- Verify the trigger `on_auth_user_created` is active

### Bills not saving
- Check browser console for errors
- Verify RLS policies are enabled
- Make sure you're logged in

## Next Steps

Once connected, you can:
- Add bills and they'll be saved to Supabase
- View your dashboard with real-time data
- Register multiple users (each has their own data)
- Access your data from any device

## Important Notes

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- The anon key is safe to use in the frontend (RLS protects your data)
- Each user can only see their own bills (enforced by RLS policies)
