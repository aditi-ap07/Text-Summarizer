# PowerShell script to fix SumAI Frontend Dependencies

Write-Host "Fixing SumAI Frontend Dependencies..." -ForegroundColor Green

# Remove existing node_modules and package-lock.json
if (Test-Path "node_modules") {
    Write-Host "Removing existing node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules"
}

if (Test-Path "package-lock.json") {
    Write-Host "Removing package-lock.json..." -ForegroundColor Yellow
    Remove-Item "package-lock.json"
}

# Install dependencies fresh
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host "Dependencies fixed! You can now run: npm start" -ForegroundColor Green 