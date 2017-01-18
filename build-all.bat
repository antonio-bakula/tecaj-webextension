:: Tecaj web extension build script for Mozilla Firefox and Google Chrome
::
:: Dependancies:
:: build-browser.bat - script that will make release for one browser
::
@echo off
echo.
echo.Build for ALL browsers
echo.


SET interactive=0

ECHO %CMDCMDLINE% | FINDSTR /L %COMSPEC% >NUL 2>&1
IF %ERRORLEVEL% == 0 SET interactive=1

call build-browser.bat firefox
call build-browser.bat chrome

IF "%interactive%"=="1" PAUSE
EXIT /B 0
