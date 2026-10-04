@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install the LTS release from https://nodejs.org/
  pause
  exit /b 1
)
echo Block2Script : http://127.0.0.1:5173/
echo Keep this window open while using Block2Script.
node server.mjs
pause
