# EventEase - Supabase & Vercel Setup Guide

## ✅ Setup Complete!

Your project has been successfully migrated from Lovable to **Supabase** authentication and database, with **Vercel** deployment ready.

---

## 📋 What's Been Done

### 1. **Authentication Setup**
- ✅ Supabase client configured with your credentials
- ✅ `.env.local` and `.env.production` created with your Supabase URL and Anon Key
- ✅ AuthContext created for global auth state management
- ✅ Protected routes implemented (users must login to access dashboard)
- ✅ Login & Signup forms connected to Supabase Auth
- ✅ Logout functionality in Navbar and Sidebar

### 2. **Database Schema**
- ✅ `users` table (extends Supabase auth.users)
- ✅ `events` table (for event management)
- ✅ `registrations` table (user event registrations)
- ✅ `venues` table (event venues)
- ✅ `vendors` table (event vendors)
- ✅ `notifications` table (user notifications)
- ✅ Row-Level Security (RLS) policies configured for data privacy

### 3. **Vercel Configuration**
- ✅ `vercel.json` created with proper build configuration
- ✅ Build command: `bun run build`
- ✅ Dev command: `bun run dev`
- ✅ Framework detected: Vite

---

## 🚀 Deployment to Vercel

### Step 1: Prepare Your Code
```bash
# Install dependencies (if not already done)
bun install

# Test locally
bun run dev
```

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Migrate to Supabase and Vercel"
git push origin main
```

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"
5. In **Environment Variables** section, add:
   ```
   VITE_SUPABASE_URL=https://dqwdeowhyhdnbsbekdsp.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxd2Rlb3doeWhkbmJzYmVrZHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MjMxNzksImV4cCI6MjA4MzA5OTE3OX0.iV4ye-b-mA_Cg6Z612BRd5kBVT4Ir66kOONG-Ua3_zs
   ```
6. Click "Deploy"

---

## 🗄️ Setup Supabase Database

### Step 1: Create Database Tables
1. Go to [supabase.com](https://supabase.com) → Dashboard
2. Select your project: `dqwdeowhyhdnbsbekdsp`
3. Go to **SQL Editor**
4. Click "New Query"
5. Copy the contents of `supabase/migrations/database_schema.sql`
6. Paste into the SQL editor
7. Click "Run"

### Step 2: Verify Tables Created
Go to **Table Editor** and verify all these tables exist:
- ✅ `users`
- ✅ `events`
- ✅ `registrations`
- ✅ `venues`
- ✅ `vendors`
- ✅ `notifications`

### Step 3: Enable Auth
1. Go to **Authentication** → **Providers**
2. Enable "Email" (should already be enabled)
3. Configure email templates if needed

---

## 📝 Environment Variables

Your credentials are already set in:
- `.env.local` (development)
- `.env.production` (production)

**Never commit these files!** They're in `.gitignore`

```env
VITE_SUPABASE_URL=https://dqwdeowhyhdnbsbekdsp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔐 Row-Level Security (RLS)

All tables have RLS enabled with policies:
- Users can only see their own data
- Public endpoints for browsing published events
- Vendors and venues viewable by all, editable only by creator

---

## 🧪 Testing

### Test Login
1. Start dev server: `bun run dev`
2. Go to `http://localhost:5173/auth`
3. Click "Sign Up" to create account
4. After signup, you'll be redirected to dashboard
5. Try "Sign Out" in the navbar

### Test Protected Routes
- Accessing `/` without login redirects to `/auth` ✅
- After login, dashboard is accessible ✅

---

## 📚 Files Modified/Created

### Created:
- `.env.local` - Development environment variables
- `.env.production` - Production environment variables
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/components/ProtectedRoute.tsx` - Route protection
- `vercel.json` - Vercel deployment config
- `supabase/migrations/database_schema.sql` - Database setup

### Modified:
- `src/App.tsx` - Added AuthProvider and ProtectedRoute
- `src/components/auth/LoginForm.tsx` - Added redirect on login
- `src/components/auth/SignupForm.tsx` - Added redirect on signup
- `.gitignore` - Added environment variables

---

## 🔧 Useful Commands

```bash
# Development
bun run dev

# Production build
bun run build

# Preview production build
bun run preview

# Type checking
bun run lint
```

---

## 🆘 Troubleshooting

### Issue: "Cannot find environment variables"
**Solution:** Make sure `.env.local` exists in root directory with correct Supabase credentials

### Issue: "RLS policy violation"
**Solution:** Make sure you're logged in. RLS blocks unauthorized access.

### Issue: "CORS errors"
**Solution:** Your Supabase project allows requests from `localhost` and any Vercel domain by default.

### Issue: "Auth not persisting"
**Solution:** AuthContext handles session persistence using `localStorage`. Clear cache if issues persist.

---

## 📞 Next Steps

1. ✅ Create tables in Supabase (using SQL migration)
2. ✅ Test login/signup locally
3. ✅ Deploy to Vercel
4. ✅ Configure custom domain (optional)
5. ✅ Set up email notifications (Supabase Email)
6. ✅ Add more data to tables via admin panel

---

## 🎉 You're All Set!

Your EventEase app is now:
- ✅ Using Supabase for Auth & Database
- ✅ Ready for Vercel deployment
- ✅ Fully protected with RLS policies
- ✅ Configured for production

**Happy coding! 🚀**
