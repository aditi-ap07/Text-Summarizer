# PowerShell script to start SumAI Backend Server

Write-Host "Starting SumAI Backend Server..." -ForegroundColor Green

# Check if Python is installed
try {
    $pythonVersion = python --version
    Write-Host "Python version: $pythonVersion" -ForegroundColor Yellow
} catch {
    Write-Host "Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from https://python.org/" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Start the server
Write-Host "Starting FastAPI server on http://localhost:5000" -ForegroundColor Green
uvicorn summ:app --host 0.0.0.0 --port 5000 --reload 