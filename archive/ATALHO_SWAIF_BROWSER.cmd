@echo off
setlocal

set "ROOT=c:\Users\dmene\Projetos\innovai\apresentacao_swaif"
set "UIPREVIEW=%ROOT%\ui-preview"

echo Encerrando processos antigos do SWAIF/router...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and ($_.CommandLine -match 'domain-router\\.mjs' -or $_.CommandLine -match 'vite\\.js.*--port 4174') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }" >nul 2>&1

echo Limpando cache de dependencias do Vite...
if exist "%UIPREVIEW%\node_modules\.vite" rmdir /s /q "%UIPREVIEW%\node_modules\.vite"

echo Iniciando SWAIF em 4174...
start "SWAIF Dev" cmd /k "npm --prefix "%UIPREVIEW%" run dev:swaif"

echo Iniciando roteador de dominios em 80...
start "SWAIF Router" cmd /k "npm --prefix "%UIPREVIEW%" run router"

timeout /t 4 /nobreak >nul

echo Abrindo SWAIF no browser...
start "" "http://innovai.swaif.local"

echo Pronto.
endlocal
