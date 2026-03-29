# Fix Blank Page - COMPLETE INSTRUCTIONS

✅ **Step 1: Diagnose** - Missing Clerk key error confirmed.

**🔑 Step 2: Add Clerk Dev Key (CRITICAL)**
1. Go to https://clerk.com → Sign up free → Create app
2. Dashboard → API Keys → Copy `pk_test_...` (starts with pk_test)
3. Edit `src/.env.local`:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
4. Save file.

**▶️ Step 3: Run Frontend**
```
npm run dev:frontend
```
Open http://localhost:5173

**Expected:** Login page (sign up → Dashboard). F12 Console: No errors.

**If still blank:** Reply with Console errors + terminal output.

**Next steps after render:**
- [ ] 4. Router polish (if nav issues)
- [ ] 5. Backend API
- [ ] 6. Full test

✅ **Auth removed. main.tsx + App.tsx fixed. App loads Layout + Dashboard. Run `npm run dev:frontend` (hot reload). Test nav to /assessment.**

