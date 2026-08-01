# Inkspace Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel CLI already installed (`vercel --version` shows 58.4.4)
- Git repository initialized
- GitHub/GitLab account connected to Vercel (optional, for CI/CD)

### Step 1: Login to Vercel
```powershell
vercel login
```
This will open a browser window to authenticate with Vercel.

### Step 2: Deploy Frontend
From the project root directory:

```powershell
cd d:\Dprojects\task
vercel
```

You'll be prompted with:
- **Project name**: Leave default or enter a custom name
- **Scope**: Select your personal account or organization
- **Path to codebase**: Press Enter (current directory)
- **Want to modify vercel.json**: No (we'll use defaults)
- **Build command**: Should auto-detect `npm run build`
- **Output directory**: Should auto-detect `.next`
- **Development settings**: Use suggested values

### Step 3: Verify Deployment
After deployment completes, you'll get:
- ✅ Production URL (e.g., `https://inkspace-abc123.vercel.app`)
- ✅ Preview URL for testing
- Environment variables can be added in Vercel dashboard

---

## Backend Deployment (Render)

### Prerequisites
- Render account at https://render.com
- No CLI needed - Render uses GitHub integration (recommended) or manual deployment

### Option A: Deploy via GitHub (Recommended)

#### Step 1: Push code to GitHub
```powershell
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Connect to Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Select "Build and deploy from a Git repository"
4. Connect your GitHub account and select your repository
5. Configure:
   - **Name**: `inkspace-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or Starter

#### Step 3: Set Environment Variables
In Render dashboard → Service settings:
- `PORT`: 3000 (or leave blank for default)
- `NODE_ENV`: production
- Any API keys needed

---

### Option B: Manual Deployment (Using render CLI - if installed)

After installing Render CLI:
```powershell
npm install -g @render/cli
render login
render deploy
```

---

## Important Configuration Files

### For Vercel (.vercelignore - if needed)
```
node_modules
.git
.env.local
.next/cache
```

### For Render (render.yaml - optional)
Create `render.yaml` in project root:
```yaml
services:
  - type: web
    name: inkspace-backend
    env: node
    plan: starter
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

---

## Environment Variables Setup

### Vercel Dashboard
1. Project Settings → Environment Variables
2. Add any needed variables for production

### Render Dashboard
1. Service Settings → Environment
2. Add all required variables

---

## Post-Deployment Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend running on Render
- [ ] Environment variables configured
- [ ] Update frontend API endpoints to point to Render backend
- [ ] Test live collaboration
- [ ] Monitor logs for errors
- [ ] Set up monitoring/alerts

---

## Quick Deployment Commands

### Vercel (from project root)
```powershell
vercel                    # Deploy to production
vercel --prod             # Force production deploy
vercel --scope=<team>     # Deploy to specific team
vercel env pull           # Pull environment variables
```

### Render (GitHub integration)
1. Push to GitHub
2. Render auto-deploys on push
3. No CLI commands needed

---

## Troubleshooting

### Vercel Issues
- **Build fails**: Check `npm run build` works locally
- **Port issues**: Vercel automatically handles ports
- **Environment vars**: Ensure they're set in Vercel dashboard

### Render Issues
- **Build timeout**: Increase timeout in service settings
- **Memory issues**: Upgrade plan from Free to Starter
- **Deployment fails**: Check build logs in Render dashboard

---

## Monitoring & Logs

### Vercel
- Dashboard: https://vercel.com/dashboard
- Real-time logs for each deployment
- Automatic rollback capability

### Render
- Dashboard: https://dashboard.render.com
- Logs visible in service detail page
- Manual rollback to previous deployment

