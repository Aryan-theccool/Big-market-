# Inkspace: Complete Deployment Steps

## 📋 Prerequisites Checklist
- [ ] GitHub account with repository created
- [ ] Code committed and pushed to GitHub
- [ ] Vercel CLI installed (✅ Already have v58.4.4)
- [ ] Vercel account (free tier is fine)
- [ ] Render account (free tier is fine)
- [ ] Production build tested locally (`npm run build` succeeds)

---

## 🚀 Step 1: Prepare Code for Deployment

### 1.1 Create .env.local for local development
```powershell
cd d:\Dprojects\task
copy .env.example .env.local
```

Edit `.env.local` with local values (optional for development):
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3000
```

### 1.2 Verify build works
```powershell
npm run build
```
✅ Should complete without errors

### 1.3 Commit and push to GitHub
```powershell
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

---

## 🌐 Step 2: Deploy Frontend on Vercel

### 2.1 Login to Vercel CLI
```powershell
vercel login
```
- Choose your login method (GitHub, GitLab, or email)
- Complete browser authentication

### 2.2 Deploy to Vercel
```powershell
vercel --prod
```

When prompted:
```
? Set up and deploy "d:\Dprojects\task"? [Y/n] → Y
? Which scope? → Select your account
? Link to existing project? → N (first time)
? What's your project's name? → inkspace
? In which directory is your code? → .
? Want to modify vercel.json? → N
? Vercel will use npm to build and deploy
? Build command: npm run build ✓
? Output directory: .next ✓
? Development settings suggested
```

### 2.3 Deployment Complete! 🎉
You'll get:
```
✅ Production: https://inkspace-abc123.vercel.app
✅ Inspect: https://vercel.com/your-username/inkspace
```

**Copy the production URL** - you'll need it for the backend configuration.

---

## 🔧 Step 3: Deploy Backend on Render

### Option A: Via GitHub (RECOMMENDED - Easiest)

#### 3.1 Go to Render Dashboard
1. Open https://dashboard.render.com
2. Click **"New +"** button
3. Select **"Web Service"**
4. Choose **"Build and deploy from a Git repository"**

#### 3.2 Connect GitHub
1. Click **"Connect account"** next to GitHub
2. Authorize Render to access your repos
3. Select your `inkspace` repository
4. Choose `main` branch

#### 3.3 Configure Service
Fill in the following:
```
Service Name: inkspace-backend
Environment: Node
Region: Oregon (us-west)
Build Command: npm install
Start Command: npm start
Instance Type: Free (or Starter for better performance)
```

#### 3.4 Set Environment Variables
Click **"Environment"** and add:
```
NODE_ENV = production
PORT = 3000
```

#### 3.5 Click Create Web Service
- Render will automatically deploy on every push to main
- Monitor deployment in real-time
- Get your backend URL: `https://inkspace-backend.onrender.com`

**Note**: Free tier on Render spins down after 15 min of inactivity. Upgrade to Starter ($7/mo) for always-on.

---

### Option B: Via Render CLI (If Installed)

```powershell
npm install -g @render/cli
render login
render deploy
```

---

## 🔗 Step 4: Update Environment Variables

### 4.1 On Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your `inkspace` project
3. Settings → **Environment Variables**
4. Add the following:

```
NEXT_PUBLIC_APP_URL = https://inkspace-abc123.vercel.app
NEXT_PUBLIC_API_URL = https://inkspace-backend.onrender.com
NEXT_PUBLIC_WEBSOCKET_URL = wss://inkspace-backend.onrender.com
NODE_ENV = production
```

**Save and redeploy** for changes to take effect.

### 4.2 On Render Dashboard
1. Go to https://dashboard.render.com
2. Select `inkspace-backend` service
3. Settings → **Environment**
4. Verify variables are set (should auto-deploy)

---

## ✅ Step 5: Verification & Testing

### 5.1 Test Frontend
1. Visit: `https://inkspace-abc123.vercel.app`
2. Create a new board
3. Check console for any errors (F12 → Console)

### 5.2 Test Live Collaboration
1. Open the same board in two different browsers
2. Try drawing or creating shapes
3. Verify changes sync in real-time

### 5.3 Monitor Logs
**Vercel Logs:**
- Dashboard → Deployments → Click deployment → Logs
- Real-time function logs

**Render Logs:**
- Dashboard → Select service → Logs tab
- See build and runtime logs

---

## 📊 Monitoring & Maintenance

### Vercel
- **Auto HTTPS**: ✅ Free
- **CDN**: ✅ Included
- **Analytics**: Available on dashboard
- **Domains**: Connect custom domain in Settings

### Render
- **Monitoring**: Basic metrics available
- **Alerts**: Set up in account settings
- **Upgrades**: Anytime from service settings

---

## 🔄 Continuous Deployment (CI/CD)

Both Vercel and Render support auto-deploy on git push:

### Enable Auto-Deploy
1. **Vercel**: Automatic (connected to GitHub)
2. **Render**: Automatic if using GitHub integration

Just commit and push:
```powershell
git add .
git commit -m "Feature: Add new shapes"
git push origin main
# ✅ Deploys automatically!
```

---

## 🚨 Troubleshooting

| Issue | Vercel | Render |
|-------|--------|--------|
| **Build fails** | Check build logs in Deployments | Check Logs tab |
| **Env vars not working** | Clear cache, redeploy | Restart service |
| **App won't start** | Check start script in package.json | Check logs for PORT binding |
| **WebSocket timeout** | Check NEXT_PUBLIC_WEBSOCKET_URL | Backend URL must be https:// |

---

## 📝 Rollback (If Needed)

### Vercel Rollback
1. Dashboard → Deployments
2. Select previous deployment
3. Click the three dots → Promote to Production

### Render Rollback
1. Dashboard → Select service
2. Deployments tab
3. Click three dots on previous deployment → Redeploy

---

## 🎯 Final Checklist
- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] Environment variables configured on both
- [ ] Frontend loads successfully
- [ ] Can create and edit boards
- [ ] Real-time sync works
- [ ] Logs show no errors
- [ ] Custom domain (optional) configured

---

## 🆘 Need Help?

**Vercel Issues**: https://vercel.com/help
**Render Issues**: https://render.com/docs
**Next.js Docs**: https://nextjs.org/docs

You're all set! 🚀 Your Inkspace is live!
