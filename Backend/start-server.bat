@echo off
echo Starting SumAI Backend Server...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH
    echo Please install Python from https://python.org/
    pause
    exit /b 1
)

REM Check if .env file exists (optional for Hugging Face mode)
if not exist ".env" (
    echo Creating .env file (optional for Hugging Face mode)...
    echo # Optional environment variables for Hugging Face mode > .env
    echo # No API key required - using local transformer models
)

REM Install dependencies if requirements.txt exists
if exist "requirements.txt" (
    echo Installing Python dependencies...
    pip install -r requirements.txt
)

REM Start the server
echo Starting FastAPI server on http://localhost:5000
uvicorn summ:app --host 0.0.0.0 --port 5000 --reload

pause 