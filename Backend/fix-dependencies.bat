@echo off
echo Fixing SumAI Backend Dependencies...
echo.

REM Remove existing packages
echo Removing existing packages...
pip uninstall openai httpx -y

REM Install correct versions
echo Installing correct package versions...
pip install openai==1.6.0 httpx==0.25.0

REM Install all requirements
echo Installing all requirements...
pip install -r requirements.txt

echo.
echo Dependencies fixed! You can now run: start-server.bat
pause 