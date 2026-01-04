# EventEase - Event Management Platform

> Migrated from Lovable to **Supabase** + **Vercel** ✨

**Live Demo**: [Coming Soon - Deploy to Vercel](#deployment)

## Overview

EventEase is a modern event management platform built with React, TypeScript, and Vite. It features:

- 🔐 **Secure Authentication** - Supabase Auth with email/password
- 📅 **Event Management** - Create, browse, and register for events
- 🏢 **Venue & Vendor Management** - Manage event spaces and service providers
- 🔔 **Notifications** - Real-time event updates
- 🎨 **Modern UI** - Built with Shadcn/UI + Tailwind CSS
- 🛡️ **Row-Level Security** - PostgreSQL RLS policies for data privacy
- 🚀 **Deployed on Vercel** - Auto-deploy from GitHub

---

## 🚀 Quick Start

### Local Development

```bash
# 1. Clone and install
git clone <your-repo>
cd eventease-auth-bliss
bun install

# 2. Start dev server
bun run dev

# 3. Open browser
# http://localhost:5173/auth
```

### Production Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Shadcn/UI |
| Auth | Supabase Auth (Email) |
| Database | Supabase PostgreSQL |
| Deployment | Vercel |
| Forms | React Hook Form + Zod |
| State | TanStack React Query |
| Icons | Lucide React |

---

## 📋 Setup Instructions

### Step 1: Environment Variables
Environment variables are already configured in `.env.local`:
```env
VITE_SUPABASE_URL=https://dqwdeowhyhdnbsbekdsp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

### Step 2: Database Setup
1. Go to Supabase Dashboard
2. Run SQL from `supabase/migrations/database_schema.sql`
3. Verify tables created

### Step 3: Test Locally
```bash
bun run dev
# Sign up at http://localhost:5173/auth
```

### Step 4: Deploy to Vercel
See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for detailed steps.

---

## 📁 Project Structure

```
src/
├── pages/              # Route pages (Dashboard, Auth, etc.)
├── components/
│   ├── auth/          # Auth forms (Login, Signup)
│   ├── layout/        # Layout (Navbar, Sidebar)
│   ├── ui/            # Shadcn UI components
│   ├── events/        # Event components
│   ├── venues/        # Venue components
│   └── vendors/       # Vendor components
├── contexts/          # React contexts (Auth, Language)
├── hooks/            # Custom hooks
├── integrations/     # Supabase client
├── lib/              # Utilities & translations
└── main.tsx          # Entry point
```

---

## 🔐 Features

### Authentication
- ✅ Email/Password sign up & login
- ✅ Session persistence
- ✅ Logout functionality
- ✅ Protected routes

### Events
- ✅ Create events
- ✅ Browse published events
- ✅ Register for events
- ✅ View event details

### Management
- ✅ Manage venues
- ✅ Manage vendors
- ✅ View registrations
- ✅ Calendar view

### Security
- ✅ Row-Level Security (RLS)
- ✅ User isolation
- ✅ Data encryption
- ✅ Secure session handling

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Import repository
# 4. Add environment variables
# 5. Deploy!
```

**Details:** See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | 3-step setup guide |
| [SUPABASE_SETUP.md](SUPABASE_SETUP.md) | Database configuration |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Pre-deployment verification |
| [SETUP_COMPLETE.md](SETUP_COMPLETE.md) | Complete setup summary |

---

## 🧪 Testing

### Manual Testing
- [ ] Sign up with email
- [ ] Login with credentials
- [ ] Access dashboard
- [ ] Create event
- [ ] Browse events
- [ ] Register for event
- [ ] Logout

### Automated Testing
```bash
# Lint check
bun run lint

# Type check
bun run build
```

---

## 🔧 Available Scripts

```bash
# Development
bun run dev          # Start dev server

# Production
bun run build        # Production build
bun run preview      # Preview production build

# Code Quality
bun run lint         # ESLint check

# Dependency Management
bun install          # Install dependencies
bun update           # Update dependencies
```

---

## 🐛 Troubleshooting

### Issue: "Environment variables not found"
**Solution:** Ensure `.env.local` exists in root directory

### Issue: "Can't login"
**Solution:** Check Supabase Auth is enabled and email provider is active

### Issue: "RLS policy violation"
**Solution:** Make sure you're logged in; RLS blocks unauthorized access

### Issue: "Build fails"
**Solution:** Run `bun install` and `bun run build` locally first

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev

---

## 📝 License

This project is private and confidential.

---

## ✨ Credits

- **Framework**: React + Vite
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React

---

## 🎯 Roadmap

- [ ] Email confirmations
- [ ] Password reset flow
- [ ] Social authentication (Google, GitHub)
- [ ] Image uploads
- [ ] Event search & filtering
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Analytics

---

**Status**: ✅ Ready for Deployment & Development

**Last Updated**: January 4, 2026
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
