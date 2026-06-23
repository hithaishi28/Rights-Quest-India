@echo off
set "SITE_FILE=%~dp0index.html"
start "" "%SITE_FILE%"
exit /b 0
