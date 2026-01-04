#!/bin/bash

# EventEase Quick Setup Script
# Run this after cloning from GitHub on a new machine

echo "🚀 EventEase - Supabase Setup Script"
echo "===================================="
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
bun install

# Step 2: Create environment files
echo "📝 Creating environment files..."
cat > .env.local << 'EOF'
VITE_SUPABASE_URL=https://dqwdeowhyhdnbsbekdsp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxd2Rlb3doeWhkbmJzYmVrZHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MjMxNzksImV4cCI6MjA4MzA5OTE3OX0.iV4ye-b-mA_Cg6Z612BRd5kBVT4Ir66kOONG-Ua3_zs
EOF

echo "✅ .env.local created"
echo ""

# Step 3: Display next steps
echo "📋 Next Steps:"
echo "============"
echo ""
echo "1. Run the development server:"
echo "   bun run dev"
echo ""
echo "2. Set up the database:"
echo "   - Go to: https://supabase.com/dashboard"
echo "   - Project: dqwdeowhyhdnbsbekdsp"
echo "   - Copy SQL from: supabase/migrations/database_schema.sql"
echo "   - Paste into SQL Editor and run"
echo ""
echo "3. Test the app:"
echo "   - Open: http://localhost:5173/auth"
echo "   - Create an account"
echo "   - Test login/logout"
echo ""
echo "4. Deploy to Vercel:"
echo "   - Push to GitHub"
echo "   - Go to: https://vercel.com"
echo "   - Create new project from your repo"
echo "   - Add env vars from .env.local"
echo "   - Deploy!"
echo ""
echo "✨ Setup complete!"
