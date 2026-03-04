@echo off
setlocal

set "ROOT=c:\Users\dmene\Projetos\innovai\apresentacao_swaif"
set "UIPREVIEW=%ROOT%\ui-preview"

echo Iniciando SWAIF em 4174...
start "SWAIF Dev" cmd /k "npm --prefix "%UIPREVIEW%" run dev:swaif"

echo Iniciando roteador de dominios em 80...
start "Domain Router" cmd /k "npm --prefix "%UIPREVIEW%" run router"

timeout /t 3 /nobreak >nul

echo Abrindo browser...
start "" "http://innovai.swaif.local"
start "" "http://innovai.siic.local"

echo Pronto.
endlocal
