# 🚀 Vercel + Supabase Deployment Checklist

## Before You Deploy

### Local Testing
- [ ] Run `bun run dev`
- [ ] Test sign up page loads
- [ ] Create test account (use test@example.com)
- [ ] Verify login works
- [ ] Verify logout works
- [ ] Check that accessing `/` redirects to `/auth` when not logged in
- [ ] Verify dashboard loads after login

### Code Preparation
- [ ] Ensure `.env.local` exists with credentials
- [ ] Check `.gitignore` includes `.env*` (don't commit secrets!)
- [ ] Run `bun run build` to test production build
- [ ] Verify `dist/` folder created successfully

---

## Supabase Database Setup

### Create Tables
1. Go to: https://supabase.com/dashboard/project/dqwdeowhyhdnbsbekdsp
2. Click **SQL Editor**
3. Click **New Query**
4. Open and copy: `supabase/migrations/database_schema.sql`
5. Paste the entire SQL into the editor
6. Click **Run**
7. Verify in **Table Editor** that all tables exist:
   - [ ] `auth.users` (created by Supabase)
   - [ ] `public.users`
   - [ ] `public.events`
   - [ ] `public.registrations`
   - [ ] `public.venues`
   - [ ] `public.vendors`
   - [ ] `public.notifications`

### Verify Auth Settings
1. Go to **Authentication** → **Providers**
2. Check **Email** is enabled
3. Go to **Authentication** → **Email Templates**
4. (Optional) Customize confirmation email

### Check RLS Policies
1. For each table, click **RLS** button
2. Verify policies are created (you'll see green checkmarks)

---

## GitHub Preparation

```bash
# Stage all changes
git add .

# Commit
git commit -m "Setup Supabase authentication and Vercel deployment"

# Push to main
git push origin main
```

**Note:** Make sure `.env.local` is in `.gitignore` ✅

---

## Vercel Deployment

### Step 1: Connect Repository
1. Go to: https://vercel.com
2. Click **New Project**
3. Select your GitHub repository
4. Click **Import**

### Step 2: Configure Build
- Framework: **Vite** (should auto-detect)
- Build Command: `bun run build`
- Output Directory: `dist`
- Install Command: `bun install`

### Step 3: Add Environment Variables
Click **Environment Variables** and add:

```
VITE_SUPABASE_URL
https://dqwdeowhyhdnbsbekdsp.supabase.co

VITE_SUPABASE_PUBLISHABLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxd2Rlb3doeWhkbmJzYmVrZHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MjMxNzksImV4cCI6MjA4MzA5OTE3OX0.iV4ye-b-mA_Cg6Z612BRd5kBVT4Ir66kOONG-Ua3_zs
```

### Step 4: Deploy
1. Click **Deploy**
2. Wait for build to complete (usually 2-3 minutes)
3. You'll get a URL like: `https://eventease-xxx.vercel.app`

---

## Post-Deployment Testing

### Test Deployed App
1. Open your Vercel URL
2. Click on `/auth` (if not auto-redirected)
3. Try to sign up with new email
4. Verify redirect to dashboard
5. Click logout
6. Verify redirect to `/auth`

### Verify Database
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Click `public.users`
4. You should see your test user

### Check Logs
If there are issues:
1. Go to Vercel project
2. Click **Deployments** → latest deployment
3. Click **Logs** tab
4. Look for error messages

---

## After Deployment

### Configure Custom Domain (Optional)
1. In Vercel: **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS instructions

### Enable Auto-Deploy
- Vercel auto-deploys on every push to `main`
- You can configure this in **Settings** → **Git**

### Monitor Performance
- Check **Analytics** in Vercel dashboard
- Monitor **Edge Network** metrics

---

## Troubleshooting

### Issue: Build fails with "Bun not found"
**Fix:** Vercel auto-detects bun. If it doesn't:
1. Go to **Settings** → **General**
2. Set Node.js Version: 18.x or higher
3. Vercel will auto-use bun

### Issue: "Environment variables not loaded"
**Fix:** 
1. Clear Vercel cache: **Settings** → **Advanced** → **Purge Cache**
2. Redeploy

### Issue: "Supabase connection error"
**Fix:**
1. Verify URL and key are exactly correct
2. Check Supabase project is active
3. Verify RLS policies don't block access

### Issue: "Can't login on deployed app"
**Fix:**
1. Check Supabase auth providers
2. Verify email confirmation not required
3. Check browser dev tools console for errors

---

## Success Indicators ✅

- [ ] Vercel build successful (green checkmark)
- [ ] Can access live URL
- [ ] Sign up form works
- [ ] Can create account in Supabase
- [ ] Login redirects to dashboard
- [ ] Logout redirects to auth page
- [ ] Auto-redirects non-auth users to `/auth`

---

## Next Steps After Deployment

1. Share your live URL with team
2. Set up custom domain (optional)
3. Configure email notifications (optional)
4. Set up GitHub Actions for CI/CD (optional)
5. Monitor app in Vercel Analytics
6. Add more features and features as needed

---

## Live Deployment Complete! 🎉

Your EventEase app is now:
- ✅ Deployed on Vercel (https://vercel.app)
- ✅ Using Supabase for auth & database
- ✅ Auto-deploying from GitHub
- ✅ Publicly accessible!

**Share your URL and start inviting users!**

---

**Need help?**
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- This repo's documentation
