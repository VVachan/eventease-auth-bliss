# 🚀 Quick Start Guide - EventEase with Supabase

## Your Credentials

```
🔐 Supabase Project URL:
https://dqwdeowhyhdnbsbekdsp.supabase.co

🔑 Anon Key (Publishable Key):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxd2Rlb3doeWhkbmJzYmVrZHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MjMxNzksImV4cCI6MjA4MzA5OTE3OX0.iV4ye-b-mA_Cg6Z612BRd5kBVT4Ir66kOONG-Ua3_zs
```

---

## ✅ What's Already Done

- ✅ Environment variables configured (`.env.local` & `.env.production`)
- ✅ AuthContext created for user state management
- ✅ Protected routes implemented
- ✅ Login & Signup forms ready
- ✅ Logout functionality in navbar
- ✅ Database schema SQL migration created
- ✅ Vercel deployment config ready

---

## 🎯 3-Step Setup

### Step 1: Test Locally (5 minutes)
```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Open http://localhost:5173
# Test: Sign up → login → logout
```

### Step 2: Setup Database (5 minutes)
1. Go to: https://supabase.com/dashboard
2. Select project: `dqwdeowhyhdnbsbekdsp`
3. Click **SQL Editor** → New Query
4. Open file: `supabase/migrations/database_schema.sql`
5. Copy entire content, paste into SQL editor, click **Run**

### Step 3: Deploy to Vercel (5 minutes)
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Setup Supabase and Vercel"
   git push origin main
   ```

2. Go to: https://vercel.com
3. Click **New Project** → Select your repo
4. Add Environment Variables:
   - `VITE_SUPABASE_URL` = `https://dqwdeowhyhdnbsbekdsp.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = (your anon key above)
5. Click **Deploy** ✨

---

## 📁 Files Created/Modified

### Files Already Set Up:
```
✅ .env.local
✅ .env.production  
✅ src/contexts/AuthContext.tsx
✅ src/components/ProtectedRoute.tsx
✅ src/App.tsx (with AuthProvider & ProtectedRoute)
✅ src/components/auth/LoginForm.tsx (with redirect)
✅ src/components/auth/SignupForm.tsx (with redirect)
✅ vercel.json (Vercel config)
✅ supabase/migrations/database_schema.sql (DB schema)
✅ .gitignore (added .env files)
```

---

## 🧪 Test Checklist

- [ ] `bun run dev` starts without errors
- [ ] Can visit http://localhost:5173/auth
- [ ] Can sign up with email/password
- [ ] Redirects to dashboard after signup
- [ ] Can logout from navbar
- [ ] Accessing `/` without login redirects to `/auth`
- [ ] Database tables created in Supabase
- [ ] Vercel deployment successful

---

## 🔑 Key Features Enabled

- ✅ Email authentication
- ✅ Session persistence (auto login on refresh)
- ✅ Row-Level Security (RLS) policies
- ✅ Protected routes (non-authenticated users → /auth)
- ✅ User profiles sync with auth
- ✅ Event management with ownership
- ✅ Venue & vendor management
- ✅ Event registrations
- ✅ Notifications system

---

## 🚨 Important Notes

1. **Never share your Anon Key publicly** - although it's meant to be public, keep in `.env` files
2. **Vercel will auto-deploy** whenever you push to main branch
3. **Database is live** - any changes to `.sql` migration must be applied manually
4. **RLS is active** - users can only access their own data by default

---

## 💬 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Env vars not found" | Make sure `.env.local` exists in root |
| "Can't sign up" | Check Supabase Auth is enabled in project |
| "RLS policy violation" | Make sure you're logged in |
| "Can't deploy to Vercel" | Add env vars in Vercel project settings |

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Your Supabase Project**: https://supabase.com/dashboard (Manage tables, auth, etc.)

---

## 🎉 You're Ready!

Everything is configured. Just follow the 3-step setup above and you'll be live! 🚀
