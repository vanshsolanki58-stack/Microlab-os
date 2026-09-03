@echo off
echo ========================================================
echo   MicroLab OS - Auto-Sync to GitHub and Live Vercel Site
echo ========================================================
echo.
echo [1/3] Staging all changed files...
git add .
echo.
echo [2/3] Committing changes...
git commit -m "Auto-sync update to live site: %date% %time%"
echo.
echo [3/3] Pushing to GitHub (Triggers Vercel Live Auto-Deployment)...
git push origin main
echo.
echo ========================================================
echo   SUCCESS! Pushed to GitHub.
echo   Vercel is now building your live website:
echo   https://microlab-os.vercel.app/
echo ========================================================
echo.
pause
