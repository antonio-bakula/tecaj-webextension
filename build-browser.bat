:: Tecaj webextension build script for one browser
::
:: Parameters:
:: %1 - Browser name, mandatory parameter that defines for which browser build is performed. 
::      Valid values: firefox, chrome
::
:: Example: 
:: build-browser.bat firefox
::
:: Dependancies:
:: W:\Code\WebextensionsBuild\tools\7z.exe - 7z archiver
:: w:\Code\WebextensionsBuild\release\ - release folder
::
@echo off
SET browser=%1
SET source=%~dp0
SET target=w:\Code\WebextensionsBuild\release\%browser%\tecaj-ext

echo.
echo.tecaj-webextension build for %browser%
echo.
echo.Source = %source%
echo.Target = %target%
echo.
echo.Deleting the result folder
rd %target% /S /Q
md %target%

echo.Copy - manifest.json
rem It seems that there is no need anymore for separate manifests for firefox and chrome
REM IF "%browser%"=="firefox" (
REM   copy %source%\manifest-firefox.json %target%\manifest.json
REM ) ELSE (
REM   copy %source%\manifest.json %target%\
REM )
copy %source%\manifest.json %target%\

echo.Copy - README.md
copy %source%\README.md %target%\

echo.Copy - content_scripts 
md %target%\content_scripts\
copy %source%\content_scripts\tecaj.js %target%\content_scripts\

echo.Create root assets directory
md %target%\assets

echo.Copy - assets\icons
md %target%\assets\icons
copy %source%\assets\icons\tecaj-32.png %target%\assets\icons\
copy %source%\assets\icons\tecaj-48.png %target%\assets\icons\
copy %source%\assets\icons\tecaj-64.png %target%\assets\icons\
copy %source%\assets\icons\tecaj-128.png %target%\assets\icons\

echo.Copy - assets\css
md %target%\assets\css
copy %source%\assets\css\tecaj.css %target%\assets\css\
copy %source%\assets\css\pure-min.css %target%\assets\css\

echo.Copy - lib
md %target%\lib
copy %source%\lib\modal.js %target%\lib\
copy %source%\lib\hnb-tecaj.js %target%\lib\
copy %source%\lib\jquery-2.2.4.min.js %target%\lib\
copy %source%\lib\util.js %target%\lib\

echo.Copy - popup
md %target%\popup
copy %source%\popup\popup.html %target%\popup\
copy %source%\popup\popup.js %target%\popup\

echo.Copy - options
md %target%\options
copy %source%\options\options.html %target%\options\
copy %source%\options\options.js %target%\options\

echo.
echo.Deleting old build zip
del /f %target%.zip
echo.Creating new build zip
W:\Code\WebextensionsBuild\tools\7z.exe a -r -bso0 -y %target%.zip %target%\*.*
IF %ERRORLEVEL% == 0 (echo.Zip successfully created.)
echo.
echo.Build for %browser% DONE.
echo.
EXIT /B 0