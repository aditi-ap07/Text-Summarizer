@echo off
echo Fixing SumAI Frontend Dependencies...

REM Remove existing node_modules and package-lock.json
if exist "node_modules" (
    echo Removing existing node_modules...
    rmdir /s /q node_modules
)

if exist "package-lock.json" (
    echo Removing package-lock.json...
    del package-lock.json
)

REM Install dependencies fresh
echo Installing dependencies...
npm install

echo Dependencies fixed! You can now run: npm start
pause 