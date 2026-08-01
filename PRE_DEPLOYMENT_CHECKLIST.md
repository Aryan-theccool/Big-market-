# ✅ Pre-Deployment Checklist - Inkspace

## Before You Deploy

### 1️⃣ Local Verification
- [ ] Run `npm run build` - succeeds without errors
- [ ] Run `npm run dev` - app starts on localhost:3000
- [ ] Test creating boards and adding elements
- [ ] Test real-time sync in two browser windows
- [ ] Check browser console for errors (F12)
- [ ] Review any console warnings

### 2️⃣ Git Setup
- [ ] Git repository initialized and remote configured
- [ ] All code committed: `git status` shows clean
- [ ] Latest code pushed: `git push origin main`
- [ ] GitHub repository is public or has deployment access

### 3️⃣ Environment Setup
- [ ] `.env.example` created and committed
- [ ] No `.env.local` secrets in Git (should be in .gitignore)
- [ ] Node.js version: `node --version` (should be 18+)
- [ ] npm up to date: `npm --version`

### 4️⃣ Vercel Setup
- [ ] Vercel CLI installed: `vercel --version`
- [ ] Logged in to Vercel: `vercel login` (or already logged in)
- [ ] `vercel.json` exists and is valid JSON
- [ ] No "vercel" account blocking (if first time, create one at vercel.com)

### 5️⃣ Render Setup
- [ ] Render account created at https://render.com
- [ ] GitHub account connected to Render dashboard
- [ ] Repository is accessible to Render
- [ ] `render.yaml` exists in root (optional but recommended)

### 6️⃣ Code Quality
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No console.log left in production code (search & clean up)
- [ ] Sensitive data not in code (API keys, tokens, etc.)
- [ ] .gitignore includes: node_modules, .env.local, .next

### 7️⃣ Documentation
- [ ] README.md has clear setup instructions
- [ ] Deployment docs are in place
- [ ] Team knows the deployment URLs
- [ ] Runbook or emergency contact list available

---

## Deployment Readiness Matrix

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend Build | ✅ | Next.js with proper config |
| Backend Server | ✅ | Node.js + Express/static server |
| Database | N/A | Using Yjs for sync |
| Environment Vars | ✅ | .env.example created |
| Git Repo | ✅ | Latest code pushed |
| Vercel Account | ✅ | CLI installed & logged in |
| Render Account | ✅ | GitHub connected |

---

## Quick Pre-Flight Commands

Run these before deploying:

```powershell
# 1. Check Git status
git status

# 2. Verify build
npm run build

# 3. Check TypeScript
npx tsc --noEmit

# 4. Verify CLI tools
vercel --version
node --version
npm --version

# 5. Quick test
npm run dev
# Test manually, then Ctrl+C
```

---

## Common Pre-Deployment Issues

### Issue: "Build fails"
**Solution**: 
```powershell
npm run build
# Fix any errors shown
npm ci  # Clean install
npm run build
```

### Issue: "Module not found errors"
**Solution**:
```powershell
npm install
npm run build
```

### Issue: "TypeScript errors"
**Solution**:
```powershell
npx tsc --noEmit
# Review and fix type errors
```

### Issue: "Can't login to Vercel"
**Solution**:
```powershell
vercel logout
vercel login  # Choose preferred method
```

### Issue: "Render can't access repo"
**Solution**:
1. Go to https://github.com/settings/applications
2. Check if Render is authorized
3. Reauthorize if needed

---

## Final Verification

Before clicking deploy:

```powershell
# Ultimate pre-flight check
Write-Host "Checking prerequisites..."

# Git
$git = git status --porcelain
if ($git) { Write-Host "❌ Uncommitted changes"; exit 1 }
Write-Host "✅ Git clean"

# Build
npm run build | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Build failed"; exit 1 }
Write-Host "✅ Build successful"

# CLI tools
vercel --version | Out-Null
node --version | Out-Null
npm --version | Out-Null
Write-Host "✅ All tools ready"

Write-Host ""
Write-Host "✅✅✅ Ready to deploy! ✅✅✅"
```

---

## Deployment Process (At a Glance)

### Frontend Deployment (Vercel)
```powershell
cd d:\Dprojects\task
vercel --prod
# Select options, confirm
# ✅ Done in 2-3 minutes
```

### Backend Deployment (Render)
```
1. Go to https://dashboard.render.com
2. New Web Service
3. Connect GitHub
4. Select your repository
5. Configure:
   - Name: inkspace-backend
   - Runtime: Node
   - Build: npm install
   - Start: npm start
6. Deploy!
# ✅ Done in 1-2 minutes
```

---

## Post-Deployment Checklist

After deployment succeeds:

- [ ] Frontend URL loads successfully
- [ ] Can create new board
- [ ] Can draw elements
- [ ] Real-time sync works (2 browser windows)
- [ ] No 404 or 500 errors
- [ ] Browser console clean
- [ ] Share link works
- [ ] Dark/light theme toggle works
- [ ] Mobile responsive (if applicable)

---

## Success Criteria

✅ **Deployment is successful when:**
1. Vercel shows "✅ Production" URL
2. Render shows "✅ Live" status
3. Frontend URL is accessible
4. Backend is responding
5. Real-time collaboration works
6. No errors in logs

---

## Rollback Plan

If something goes wrong:

**Vercel**:
```
Dashboard → Deployments → Select previous → Promote to Production
```

**Render**:
```
Dashboard → Select service → Deployments → Click previous → Redeploy
```

---

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Docs: https://docs.github.com

---

## Deployment Coordinator

When ready to deploy, refer to:

1. **QUICK_DEPLOY.md** - Fast track (5 minutes)
2. **DEPLOYMENT_STEPS.md** - Detailed walkthrough
3. **DEPLOYMENT_GUIDE.md** - Complete reference
4. **This file** - Pre-flight checklist

---

**Status**: ✅ Ready to Deploy

Your Inkspace app is ready for the world! 🚀
