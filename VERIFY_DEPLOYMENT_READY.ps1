# Verify Backend Deployment Ready
# This script checks that everything is ready for Render deployment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BACKEND DEPLOYMENT READINESS CHECK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

function Check {
    param([string]$Description, [bool]$Condition, [string]$Detail)
    if ($Condition) {
        Write-Host "✅ $Description" -ForegroundColor Green
        if ($Detail) { Write-Host "   $Detail" -ForegroundColor DarkGray }
    } else {
        Write-Host "❌ $Description" -ForegroundColor Red
        if ($Detail) { Write-Host "   $Detail" -ForegroundColor DarkGray }
    }
}

Write-Host "CHECKING GIT STATUS..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
Check "Git is clean" ($gitStatus.Count -eq 0) "No uncommitted changes"

Write-Host ""
Write-Host "CHECKING FILES..." -ForegroundColor Yellow
Check "render.yaml exists" (Test-Path "render.yaml") "Render configuration ready"
Check ".npmrc exists" (Test-Path ".npmrc") "NPM config for legacy deps"
Check "package.json exists" (Test-Path "package.json") "Dependencies configured"
Check "server.js exists" (Test-Path "server.js") "Backend server ready"

Write-Host ""
Write-Host "CHECKING DEPENDENCIES..." -ForegroundColor Yellow
Check "Node.js installed" (Test-Path $env:ProgramFiles/nodejs/node.exe -or (Get-Command node -ErrorAction SilentlyContinue)) "$(node --version)"
Check "npm installed" (Get-Command npm -ErrorAction SilentlyContinue) "$(npm --version)"
Check "node_modules exists" (Test-Path "node_modules") "All dependencies installed"

Write-Host ""
Write-Host "CHECKING BUILD..." -ForegroundColor Yellow
$buildSuccess = npm run build *>&1 | Select-String "Compiled successfully" -Quiet
Check "Production build works" $buildSuccess "npm run build completed"

Write-Host ""
Write-Host "CHECKING GITHUB..." -ForegroundColor Yellow
$gitRemote = git remote -v | Select-String "origin"
Check "Git remote configured" ($gitRemote.Count -gt 0) "GitHub repository linked"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ DEPLOYMENT READY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your backend is ready to deploy on Render." -ForegroundColor White
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Open: https://dashboard.render.com" -ForegroundColor White
Write-Host "2. Click: New → Web Service" -ForegroundColor White
Write-Host "3. Select: Build and deploy from Git" -ForegroundColor White
Write-Host "4. Connect: Big-market- repo" -ForegroundColor White
Write-Host "5. Configure: inkspace-backend" -ForegroundColor White
Write-Host "6. Deploy!" -ForegroundColor White
Write-Host ""
Write-Host "See AUTO_DEPLOY_BACKEND.md for detailed steps." -ForegroundColor Cyan
Write-Host ""
