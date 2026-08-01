# Inkspace Deployment Script
# This script helps deploy to both Vercel and Render

param(
    [ValidateSet("frontend", "backend", "both")]
    [string]$Target = "both",
    
    [string]$Environment = "production"
)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   INKSPACE DEPLOYMENT SCRIPT" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Color helper function
function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

function Write-Step {
    param([string]$Message)
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "   $Message" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
}

# Check Node.js
Write-Info "Checking Node.js..."
$nodeVersion = node --version
Write-Success "Node.js $nodeVersion is installed"

# Check Git
Write-Info "Checking Git..."
$gitVersion = git --version
Write-Success "$gitVersion"

# Check for uncommitted changes
Write-Info "Checking for uncommitted changes..."
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Error "You have uncommitted changes. Please commit first:"
    Write-Host $gitStatus
    Write-Info "Run: git add . && git commit -m 'message' && git push"
    exit 1
}
Write-Success "All changes committed"

# ─────────────────────────────────────────────────────────────
# Frontend Deployment (Vercel)
# ─────────────────────────────────────────────────────────────

if ($Target -eq "frontend" -or $Target -eq "both") {
    Write-Step "DEPLOYING FRONTEND TO VERCEL"
    
    # Check Vercel CLI
    Write-Info "Checking Vercel CLI..."
    $vercelVersion = vercel --version
    Write-Success "Vercel CLI $vercelVersion installed"
    
    # Build check
    Write-Info "Running production build..."
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed"
        exit 1
    }
    Write-Success "Build successful"
    
    # Deploy to Vercel
    Write-Info "Deploying to Vercel..."
    vercel --prod --confirm
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Frontend deployed successfully!"
        Write-Info "Your app is live at the Vercel URL shown above"
    } else {
        Write-Error "Vercel deployment failed"
        exit 1
    }
}

# ─────────────────────────────────────────────────────────────
# Backend Deployment (Render)
# ─────────────────────────────────────────────────────────────

if ($Target -eq "backend" -or $Target -eq "both") {
    Write-Step "DEPLOYING BACKEND TO RENDER"
    
    # Check Render CLI
    Write-Info "Checking Render CLI..."
    try {
        $renderVersion = render --version
        Write-Success "Render CLI installed"
    } catch {
        Write-Error "Render CLI not installed"
        Write-Info "For Render, please:"
        Write-Info "1. Go to https://dashboard.render.com"
        Write-Info "2. Connect your GitHub repository"
        Write-Info "3. Render will auto-deploy on git push"
        Write-Info ""
        Write-Info "Alternative: Install Render CLI with:"
        Write-Info "npm install -g @render/cli"
        exit 1
    }
    
    Write-Info "Deploying backend to Render..."
    render deploy
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Backend deployed successfully!"
    } else {
        Write-Error "Render deployment failed"
        exit 1
    }
}

# ─────────────────────────────────────────────────────────────
# Summary
# ─────────────────────────────────────────────────────────────

Write-Step "DEPLOYMENT COMPLETE!"
Write-Host ""
Write-Success "Your application is deployed!"
Write-Host ""
Write-Info "Next steps:"
Write-Host "1. Visit your Vercel URL to test the frontend"
Write-Host "2. Check https://dashboard.render.com for backend status"
Write-Host "3. Configure environment variables if needed"
Write-Host "4. Monitor logs for any issues"
Write-Host ""
Write-Info "Documentation: See DEPLOYMENT_STEPS.md for details"
Write-Host ""
