# WorldShield — Quick Start Scripts
# Run from the E:\WorldShield root directory

Write-Host "🛡️  WorldShield — Starting all services..." -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "▶ Starting Backend (FastAPI on :8000)..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; .\.venv\Scripts\activate; uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload" -PassThru
Start-Sleep 2

# Start Frontend
Write-Host "▶ Starting Frontend (Vite on :5174)..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -PassThru
Start-Sleep 3

Write-Host ""
Write-Host "✅ Services running:" -ForegroundColor Green
Write-Host "   Frontend → http://localhost:5174" -ForegroundColor White
Write-Host "   Backend  → http://127.0.0.1:8000" -ForegroundColor White
Write-Host "   API Docs → http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to stop all services..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Stop-Process -Id $backend.Id -ErrorAction SilentlyContinue
Stop-Process -Id $frontend.Id -ErrorAction SilentlyContinue
Write-Host "Services stopped." -ForegroundColor Red
