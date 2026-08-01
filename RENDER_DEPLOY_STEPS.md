# Deploy Backend to Render - Step by Step

## ✅ Prerequisites Check

Your code is ready for Render deployment:
- ✅ Git repository: Up to date
- ✅ All files committed to GitHub
- ✅ package.json configured
- ✅ render.yaml ready
- ✅ .npmrc for dependency resolution

---

## 🎯 Deploy on Render (5 minutes)

### Step 1: Go to Render Dashboard
Open: https://dashboard.render.com

You'll see a dashboard with your services.

---

### Step 2: Create New Web Service

Click the **"New +"** button (top right corner)

Select: **"Web Service"**

---

### Step 3: Connect GitHub

A dialog will appear asking to connect to GitHub.

**If first time:**
1. Click **"Connect account"**
2. Authorize Render to access your GitHub
3. A browser window will open - complete the OAuth

**If already connected:**
- Just select your repository

---

### Step 4: Select Repository

In the dropdown, find and select:
```
Big-market- 
```
or
```
Big-market (or your repo name)
```

Make sure the branch is set to: **main**

---

### Step 5: Configure Service Settings

Fill in these fields:

```
📝 Service Name: 
   inkspace-backend

🔧 Environment: 
   Node

🌍 Region: 
   Oregon (us-west) [recommended for US]

📦 Build Command: 
   npm install

▶️  Start Command: 
   npm start

💰 Instance Type:
   Free (or Starter Plan for production)
```

---

### Step 6: Add Environment Variables

Click the **"Environment"** tab

Add these variables:

```
Variable Name: NODE_ENV
Value: production

Variable Name: PORT
Value: 3000
```

Click **"Add"** for each one.

---

### Step 7: Review & Deploy

Your config should look like:
```
✅ Service Name: inkspace-backend
✅ Environment: Node
✅ Build: npm install
✅ Start: npm start
✅ Env vars: NODE_ENV, PORT
```

Click **"Create Web Service"** button

---

## ⏳ Deployment in Progress

Render will now:
1. Clone your GitHub repo
2. Install dependencies (`npm install`)
3. Start the server (`npm start`)
4. Assign a unique URL

**This takes 5-10 minutes. You'll see:**
```
🔄 Building...
✅ Built successfully
🚀 Live
```

---

## 🎯 Get Your Backend URL

Once deployment completes, you'll see a URL like:
```
https://inkspace-backend-xxxxx.onrender.com
```

**Copy this URL** - you need it for the next step.

---

## 🔗 Connect Frontend to Backend

Now update your frontend on Vercel:

1. Go to: https://vercel.com/dashboard

2. Click on your **task** project

3. Settings → **Environment Variables**

4. Add/Update these variables:

```
NEXT_PUBLIC_API_URL
Value: https://your-render-backend-url.onrender.com

NEXT_PUBLIC_WEBSOCKET_URL
Value: wss://your-render-backend-url.onrender.com

NODE_ENV
Value: production
```

(Replace `your-render-backend-url` with your actual Render URL)

5. Click **Save**

6. Vercel will automatically redeploy with the new env vars

---

## ✅ Verify Everything Works

### Test 1: Backend is Running
- Open your Render URL in browser
- Should see: "Cannot GET /" or similar
- This means backend is running! ✅

### Test 2: Frontend Loads
- Open your Vercel URL: https://task-eight-psi-64.vercel.app
- Should load normally
- Check browser console for errors (F12)

### Test 3: Real-Time Sync Works
1. Create a new board on your app
2. Open the same board in another browser window
3. Draw or add shapes in one window
4. Changes should appear instantly in the other window
5. ✅ If this works, you're done!

---

## 🚀 Deployment Complete!

When all tests pass:
- ✅ Frontend: LIVE on Vercel
- ✅ Backend: LIVE on Render
- ✅ Real-time sync: Working
- ✅ Auto-deploy: Enabled

**Your app is production-ready!** 🎉

---

## 📊 Your Deployment URLs

```
Frontend:  https://task-eight-psi-64.vercel.app
Backend:   https://your-url.onrender.com
GitHub:    https://github.com/Aryan-theccool/Big-market-
```

---

## 🔄 Future Updates

Just push to GitHub and both platforms auto-deploy:

```powershell
git add .
git commit -m "New feature"
git push origin main

# ✅ Automatically deployed to Vercel & Render!
```

---

## 💡 Important Notes

### Free vs Paid on Render

**Free Plan:**
- Spins down after 15 minutes of inactivity
- App wakes up when accessed (adds 30 sec delay)
- Good for testing, not production

**Starter Plan ($7/month):**
- Always running
- Fast response times
- Recommended for production

### If Backend Spins Down
- First request after idle: ~30 second delay
- Subsequent requests: normal speed
- Upgrade to Starter for always-on

---

## 🆘 Troubleshooting

### Build failed on Render?
1. Go to Render dashboard
2. Select your service
3. Click **"Logs"** tab
4. Look for error messages
5. Common issues:
   - Missing dependencies: Run `npm install` locally
   - Wrong start command: Check package.json "start" script
   - Port already in use: Render handles this automatically

### Backend not responding?
1. Check Render service status (should show "Live" in green)
2. Wait 5-10 minutes if just deployed
3. Check Render logs for errors
4. Verify NODE_ENV and PORT env vars are set

### Real-time sync not working?
1. Make sure NEXT_PUBLIC_WEBSOCKET_URL is correct
2. Check browser console (F12) for WebSocket errors
3. Verify backend URL in Vercel env vars
4. Redeploy Vercel after env var changes

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**You're almost there! 🚀**

Follow these steps and your app will be fully deployed in 15 minutes.
