# 🚀 Quick Deployment Guide - Inkspace

## TL;DR - Deploy in 5 Minutes

### Frontend (Vercel)
```powershell
vercel --prod
```

### Backend (Render)
1. Go to https://dashboard.render.com
2. Click "New Web Service"
3. Connect GitHub → Select your repo
4. Deploy!

---

## What's What?

- **Frontend** (Vercel): Your Next.js React app - the UI users see
- **Backend** (Render): Node.js server - handles real-time collaboration & data

---

## 📦 Files Created for Deployment

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel build configuration |
| `render.yaml` | Render deployment configuration |
| `.env.example` | Environment variables template |
| `DEPLOYMENT_STEPS.md` | Detailed step-by-step guide |
| `DEPLOYMENT_GUIDE.md` | Complete reference guide |
| `deploy.ps1` | PowerShell deployment helper script |

---

## ⚡ Quick Start

### 1️⃣ Commit Code
```powershell
git status
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2️⃣ Deploy Frontend
```powershell
vercel --prod
```
**Result**: Your app lives at `https://your-app.vercel.app`

### 3️⃣ Deploy Backend (Choose One)

#### Option A: GitHub + Render Dashboard (Easiest)
1. Go to https://dashboard.render.com
2. New Web Service → Connect GitHub
3. Select repo → Deploy
4. Done! Auto-deploys on every push

#### Option B: Render CLI (If installed)
```powershell
render deploy
```

---

## 🔗 Key URLs After Deployment

```
Frontend:  https://your-app.vercel.app
Backend:   https://your-app-backend.onrender.com
GitHub:    https://github.com/your-username/your-repo
Vercel:    https://vercel.com/dashboard
Render:    https://dashboard.render.com
```

---

## 📝 Environment Variables

After deployment, update these in each platform's dashboard:

**Vercel** → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-app-backend.onrender.com
NEXT_PUBLIC_WEBSOCKET_URL=wss://your-app-backend.onrender.com
NODE_ENV=production
```

**Render** → Service Settings → Environment:
```
NODE_ENV=production
PORT=3000
```

---

## ✅ Verification

- [ ] Frontend loads at Vercel URL
- [ ] Can create new boards
- [ ] Can draw/add shapes
- [ ] Real-time sync works (test in 2 tabs)
- [ ] No errors in browser console (F12)
- [ ] No errors in Render logs

---

## 🔄 Update After Changes

Both Vercel and Render auto-deploy on git push:

```powershell
# Make changes
git add .
git commit -m "Feature: New shapes"
git push origin main

# ✅ Automatically deploys!
# Monitor at:
# - Vercel: https://vercel.com/dashboard
# - Render: https://dashboard.render.com
```

---

## 💡 Pro Tips

1. **Free Tier**: Vercel and Render both have free tiers
   - Vercel: Always fast, unlimited deployments
   - Render: Free tier spins down after 15 min - upgrade to Starter ($7/mo) for always-on

2. **Monitoring**: 
   - Check logs regularly: https://vercel.com → Deployments tab
   - Render: https://dashboard.render.com → Service → Logs

3. **Custom Domain**: 
   - Vercel: Settings → Domains
   - Render: Service settings → Custom Domain

4. **Rollback**:
   - Vercel: Deployments → Click old version → Promote
   - Render: Deployments → Redeploy old version

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| Build fails | Run `npm run build` locally to test |
| Env vars not working | Redeploy after adding env vars |
| WebSocket errors | Ensure `NEXT_PUBLIC_WEBSOCKET_URL` is correct |
| Render spins down | Upgrade to Starter plan ($7/mo) |
| 404 on pages | Check routing in `next.config.js` |

---

## 📚 Full Documentation

- **Step-by-step**: Read `DEPLOYMENT_STEPS.md`
- **Reference**: Read `DEPLOYMENT_GUIDE.md`
- **Next.js docs**: https://nextjs.org/docs/deployment
- **Vercel docs**: https://vercel.com/docs
- **Render docs**: https://render.com/docs

---

## 🎯 You're Ready!

Your deployment files are set up. Now:

1. **Push code** with `git push`
2. **Deploy frontend** with `vercel --prod`
3. **Deploy backend** via Render dashboard
4. **Test and monitor**

That's it! 🎉

Questions? Check the detailed guides or reach out!
