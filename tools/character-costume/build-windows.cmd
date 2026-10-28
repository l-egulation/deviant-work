@echo off
setlocal
cd /d "%~dp0"
if "%~1"=="" (
  echo Drag your purchased ZIP onto this file, or pass its path as argument.
  pause
  exit /b 1
)
py -3 build.py --source-zip "%~1"
if errorlevel 1 (
  echo Build failed. Install Python and run: py -3 -m pip install -r requirements.txt
  pause
  exit /b 1
)
start "" "%~dp0_generated\index.html"
pause
