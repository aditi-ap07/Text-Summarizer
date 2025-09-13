@echo off
echo Starting SumAI Application...
echo.

echo Starting Backend Server...
start "SumAI Backend" cmd /k "cd Backend && start-server.bat"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "SumAI Frontend" cmd /k "cd Frontend\sumai && npm start"

echo.
echo SumAI is starting up!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul 