# Deploy Backend on Render

Your frontend is live! Now let's deploy the backend.

## Quick Steps:

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Create New Web Service**:
   - Click **"New +"** button
   - Select **"Web Service"**
   - Choose **"Build and deploy from a Git repository"**

3. **Connect GitHub**:
   - Click **"Connect account"** next to GitHub
   - Authorize Render
   - Select your repository: `Big-market-` or `task`
   - Choose branch: `main`

4. **Configure Service**:
   ```
   Service Name: inkspace-backend
   Environment: Node
   Region: Oregon (us-west)
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free (or Starter for production)
   ```

5. **Set Environment Variables**:
   - Click **"Environment"** tab
   - Add:
     ```
     NODE_ENV = production
     PORT = 3000
     ```

6. **Deploy**:
   - Click **"Create Web Service"**
   - Wait 5-10 minutes for deployment
   - You'll get a URL like: `https://inkspace-backend.onrender.com`

---

## Connect Frontend to Backend

After backend is deployed, update Vercel environment variables:

1. Go to: https://vercel.com/dashboard
2. Select: **task** project
3. Settings → **Environment Variables**
4. Add/Update:
   ```
   NEXT_PUBLIC_API_URL = https://your-render-backend-url.onrender.com
   NEXT_PUBLIC_WEBSOCKET_URL = wss://your-render-backend-url.onrender.com
   NODE_ENV = production
   ```
5. Click **Save**
6. Redeploy frontend for changes to take effect

---

## Test It

1. Open: https://task-luryx7ykl-aryanbhadoria100-1563s-projects.vercel.app
2. Create a new board
3. Open in another browser window
4. Changes should sync in real-time

---

## Status

- ✅ Frontend: LIVE on Vercel
- ⏳ Backend: Deploy now on Render
- 📝 Follow steps above

Your app will be fully deployed in 15 minutes! 🚀
