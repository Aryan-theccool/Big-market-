# ⚡ Auto-Deploy Backend to Render

Since manual Render CLI isn't ideal, we'll set up automatic deployment through Render's GitHub integration.

## The Easiest Way (3 Steps)

### Step 1: Go to Render Dashboard
**Open this link in your browser:**
```
https://dashboard.render.com
```

### Step 2: Click "New" → "Web Service"
- Look for the blue "+ New" button (top right)
- Select "Web Service" from dropdown

### Step 3: Authorize GitHub
- Click "Build and deploy from a Git repository"
- Click "Connect GitHub account" if needed
- Select your repo: `Big-market-`
- Branch: `main`

### Step 4: Configure (Copy-Paste These Values)

**Service Name:**
```
inkspace-backend
```

**Environment:**
```
Node
```

**Region:**
```
Oregon (us-west)
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Add Environment Variables:**
- Key: `NODE_ENV`
- Value: `production`

- Key: `PORT`
- Value: `3000`

### Step 5: Click "Create Web Service"
Done! Render starts deploying automatically.

---

## What Happens Next

**Wait 5-10 minutes:**
- Render clones your GitHub repo
- Installs dependencies
- Starts your server
- Assigns you a live URL

**You'll see:**
```
🔄 Building...
✅ Build completed
🚀 Your service is live!
```

---

## Get Your Backend URL

Once it shows "Live" (in green):

```
Your Backend URL: https://your-service-name.onrender.com
```

**Copy this URL** ← You need it!

---

## Connect Backend to Frontend

Once you have the backend URL:

1. Go to: https://vercel.com/dashboard
2. Select: `task` project
3. Go to: Settings → Environment Variables
4. Add these:

```
NEXT_PUBLIC_API_URL
Value: https://your-backend-url.onrender.com

NEXT_PUBLIC_WEBSOCKET_URL
Value: wss://your-backend-url.onrender.com

NODE_ENV
Value: production
```

5. Click Save
6. Vercel auto-redeploys ✅

---

## Test It Works

1. **Test Backend:**
   - Open your Render URL in browser
   - Should show "Cannot GET /" (good!)

2. **Test Frontend:**
   - Open: https://task-eight-psi-64.vercel.app
   - Create a new board

3. **Test Real-Time Sync:**
   - Open same board in another tab
   - Draw something in one tab
   - Should appear instantly in other tab ✅

---

## Done! 🎉

Your app is now fully deployed:
- ✅ Frontend: Vercel
- ✅ Backend: Render
- ✅ Real-time sync: Working
- ✅ Auto-deploy: Enabled

---

## Future Updates

Just push to GitHub:
```
git add .
git commit -m "Your changes"
git push origin main
```

Both Render and Vercel automatically deploy! 🚀
