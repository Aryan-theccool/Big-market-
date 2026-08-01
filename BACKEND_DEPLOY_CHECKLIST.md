# 🚀 Backend Deployment Checklist - Render

## Do These 5 Things (5 minutes)

### ☐ 1. Open Render Dashboard
```
https://dashboard.render.com
```

### ☐ 2. Click "+ New" → "Web Service"
Select: "Build and deploy from a Git repository"

### ☐ 3. Connect GitHub
- If first time, click "Connect account"
- Authorize Render
- Select repository: `Big-market-`
- Branch: `main`

### ☐ 4. Configure Service
```
Service Name:   inkspace-backend
Environment:    Node
Region:         Oregon (us-west)
Build Command:  npm install
Start Command:  npm start
Plan:           Free (or Starter)
```

### ☐ 5. Add Environment Variables
```
NODE_ENV = production
PORT = 3000
```

### ☐ 6. Click "Create Web Service"
⏳ Wait 5-10 minutes for deployment

---

## Get Your Backend URL

Once it shows "Live" (green):

```
Copy this URL: https://your-backend.onrender.com
```

---

## Connect to Frontend (2 minutes)

Go to: https://vercel.com/dashboard

Select "task" project → Settings → Environment Variables

Add these (replace with your Render URL):
```
NEXT_PUBLIC_API_URL = https://your-backend.onrender.com
NEXT_PUBLIC_WEBSOCKET_URL = wss://your-backend.onrender.com
NODE_ENV = production
```

Save → Vercel auto-redeploys ✅

---

## Test It Works (1 minute)

✓ Go to your Vercel URL
✓ Create a board
✓ Open same board in another tab
✓ Draw in one → appears in other
✓ ✅ Done!

---

## Your URLs

```
Frontend:  https://task-eight-psi-64.vercel.app
Backend:   https://your-url.onrender.com
```

---

## Need Help?

- **Visual Guide**: See RENDER_VISUAL_GUIDE.txt
- **Detailed Steps**: See RENDER_DEPLOY_STEPS.md
- **Render Docs**: https://render.com/docs

---

**Status**: ✅ Ready to deploy backend now!

Follow the 5 steps above and you're done! 🎉
